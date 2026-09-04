import { describe, expect, it } from 'vitest'
import { contactDefaults, type ContactFormValues } from './contactSchema'
import {
  WEB3FORMS_ENDPOINT,
  buildPayload,
  buildRequest,
  detectProvider,
  isDelivered,
  providerDisplayName,
  providerMessage,
  toFormData,
} from './formProvider'

const values: ContactFormValues = {
  ...contactDefaults,
  fullName: 'Ada Poonoosamy',
  email: 'ada@example.com',
  phone: '+230 5123 4567',
  message: 'We need a website with a digital menu for two outlets in the south.',
  consent: true,
  company_website: 'http://spam.example',
}

describe('detectProvider', () => {
  it.each([
    [WEB3FORMS_ENDPOINT, 'web3forms'],
    ['https://api.web3forms.com/submit', 'web3forms'],
    ['https://formspree.io/f/abcd', 'formspree'],
    ['https://formsubmit.co/ajax/a@b.com', 'generic'],
    ['https://example.com/hook', 'generic'],
  ])('maps %s to %s', (endpoint, expected) => {
    expect(detectProvider(endpoint)).toBe(expected)
  })
})

describe('buildPayload', () => {
  it('never sends the honeypot to any provider', () => {
    for (const provider of ['web3forms', 'formspree', 'generic'] as const) {
      const payload = buildPayload(values, provider, 'key-123')
      expect(payload).not.toHaveProperty('company_website')
    }
  })

  it('includes the access key and reply-to for Web3Forms', () => {
    const payload = buildPayload(values, 'web3forms', 'key-123')
    expect(payload).toMatchObject({
      access_key: 'key-123',
      replyto: 'ada@example.com',
      from_name: 'Ada Poonoosamy',
    })
    expect(payload.subject).toEqual(expect.stringContaining('Ada Poonoosamy'))
  })

  it('uses the underscore subject convention for other providers', () => {
    const payload = buildPayload(values, 'formspree', null)
    expect(payload).not.toHaveProperty('access_key')
    expect(payload._subject).toEqual(expect.stringContaining('Ada Poonoosamy'))
  })

  it('carries every answer the visitor gave', () => {
    const payload = buildPayload(values, 'web3forms', 'k')
    expect(payload).toMatchObject({
      email: values.email,
      phone: values.phone,
      message: values.message,
      projectType: values.projectType,
      consent: true,
    })
  })
})

describe('buildRequest', () => {
  /**
   * Web3Forms does not answer a CORS preflight. Setting Content-Type makes the
   * request non-simple, so the browser blocks it before it is ever sent.
   */
  it('sends Web3Forms a simple request with no Content-Type header', () => {
    const { body, headers } = buildRequest({ access_key: 'k', email: 'a@b.com' }, 'web3forms')
    expect(body).toBeInstanceOf(FormData)
    expect(headers).not.toHaveProperty('Content-Type')
    expect(headers.Accept).toBe('application/json')
  })

  it('carries every field through FormData conversion', () => {
    const { body } = buildRequest(
      { access_key: 'k', email: 'a@b.com', consent: true, launchDate: '' },
      'web3forms',
    )
    const form = body as FormData
    expect(form.get('access_key')).toBe('k')
    expect(form.get('email')).toBe('a@b.com')
    expect(form.get('consent')).toBe('true')
  })

  it('drops null and undefined rather than sending the literal strings', () => {
    const form = toFormData({ a: 'keep', b: null, c: undefined })
    expect(form.get('a')).toBe('keep')
    expect(form.has('b')).toBe(false)
    expect(form.has('c')).toBe(false)
  })

  it('sends other providers JSON', () => {
    const { body, headers } = buildRequest({ email: 'a@b.com' }, 'formspree')
    expect(typeof body).toBe('string')
    expect(JSON.parse(body as string).email).toBe('a@b.com')
    expect(headers['Content-Type']).toBe('application/json')
  })
})

describe('isDelivered', () => {
  it('treats a 200 with success:false as a failure, not a delivery', () => {
    expect(isDelivered(200, { success: false, message: 'Invalid access key' })).toBe(false)
  })

  it('accepts a 200 with success:true', () => {
    expect(isDelivered(200, { success: true })).toBe(true)
  })

  it('accepts FormSubmit reporting success as a string', () => {
    expect(isDelivered(200, { success: 'true' })).toBe(true)
  })

  it('falls back to the status code when there is no success field', () => {
    expect(isDelivered(200, null)).toBe(true)
    expect(isDelivered(204, {})).toBe(true)
    expect(isDelivered(500, null)).toBe(false)
    expect(isDelivered(422, { errors: [] })).toBe(false)
  })
})

describe('providerMessage', () => {
  it('surfaces a provider error message when present', () => {
    expect(providerMessage({ message: 'Invalid access key' })).toBe('Invalid access key')
  })

  it('ignores an absent or blank message', () => {
    expect(providerMessage({})).toBeNull()
    expect(providerMessage({ message: '   ' })).toBeNull()
    expect(providerMessage(null)).toBeNull()
  })
})

describe('providerDisplayName', () => {
  it('names the third party the privacy policy must disclose', () => {
    expect(providerDisplayName(WEB3FORMS_ENDPOINT)).toBe('Web3Forms')
    expect(providerDisplayName('https://formspree.io/f/x')).toBe('Formspree')
    expect(providerDisplayName('https://example.com/x')).toBe('an external form provider')
    expect(providerDisplayName(null)).toBe('an external form provider')
  })
})
