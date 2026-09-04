import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type * as SiteConfigModule from '@/data/site.config'
import { contactDefaults, contactSchema, type ContactFormValues } from './contactSchema'
import { MIN_FILL_SECONDS, fingerprint, submitContact } from './submitContact'

const valid: ContactFormValues = {
  ...contactDefaults,
  fullName: 'Ada Poonoosamy',
  businessName: 'Blue Bay Bistro',
  email: 'ada@example.com',
  phone: '+230 5123 4567',
  message: 'We need a website with a digital menu for two outlets in the south.',
  consent: true,
}

/** A start time far enough in the past to clear the timing check. */
const patient = () => Date.now() - (MIN_FILL_SECONDS + 1) * 1000

describe('contact validation', () => {
  it('accepts a fully completed enquiry', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it.each([
    ['fullName', { fullName: 'A' }],
    ['email', { email: 'not-an-email' }],
    ['phone', { phone: 'call me' }],
    ['message', { message: 'too short' }],
    ['consent', { consent: false }],
    ['existingWebsite', { existingWebsite: 'httpx:/broken' }],
  ])('rejects an invalid %s', (field, override) => {
    const result = contactSchema.safeParse({ ...valid, ...override })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path[0] === field)).toBe(true)
    }
  })

  it('allows an empty optional website but validates a supplied one', () => {
    expect(contactSchema.safeParse({ ...valid, existingWebsite: '' }).success).toBe(true)
    expect(
      contactSchema.safeParse({ ...valid, existingWebsite: 'https://example.com' }).success,
    ).toBe(true)
  })
})

describe('submitContact', () => {
  beforeEach(() => vi.unstubAllEnvs())
  afterEach(() => vi.resetModules())

  /**
   * A key ships as a committed default, so an unconfigured form is reachable
   * only by blanking the config. The fallback must still never claim success.
   */
  it('reports a missing endpoint instead of pretending to send', async () => {
    vi.resetModules()
    vi.doMock('@/data/site.config', async () => {
      const actual = await vi.importActual<typeof SiteConfigModule>('@/data/site.config')
      return {
        ...actual,
        siteConfig: { ...actual.siteConfig, contactFormEndpoint: null, contactFormAccessKey: null },
      }
    })
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    const { submitContact: submit } = await import('./submitContact')
    const result = await submit(valid, { startedAt: patient(), lastSubmitted: null })

    expect(result.kind).toBe('no-endpoint')
    expect(fetchSpy).not.toHaveBeenCalled()
    vi.doUnmock('@/data/site.config')
  })

  it('rejects a filled honeypot without contacting the provider', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    const result = await submitContact(
      { ...valid, company_website: 'https://spam.example' },
      { startedAt: patient(), lastSubmitted: null },
    )

    expect(result.kind).toBe('rejected-bot')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('rejects a submission completed faster than a human could type it', async () => {
    const result = await submitContact(valid, { startedAt: Date.now(), lastSubmitted: null })
    expect(result.kind).toBe('too-fast')
  })

  it('blocks an identical resubmission', async () => {
    const result = await submitContact(valid, {
      startedAt: patient(),
      lastSubmitted: fingerprint(valid),
    })
    expect(result.kind).toBe('duplicate')
  })

  it('treats a different enquiry from the same person as new', async () => {
    const changed = { ...valid, message: 'A different project entirely, this time a booking tool.' }
    expect(fingerprint(changed)).not.toBe(fingerprint(valid))
  })
})

describe('submitContact with a configured endpoint', () => {
  const ENDPOINT = 'https://formspree.io/f/test123'

  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', ENDPOINT)
  })

  it('posts the enquiry and reports success', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 200 })
    vi.stubGlobal('fetch', fetchSpy)

    const { submitContact: submit } = await import('./submitContact')
    const result = await submit(valid, { startedAt: patient(), lastSubmitted: null })

    expect(result.kind).toBe('success')
    expect(fetchSpy).toHaveBeenCalledWith(ENDPOINT, expect.objectContaining({ method: 'POST' }))

    const body = JSON.parse(fetchSpy.mock.calls[0][1].body)
    expect(body.email).toBe(valid.email)
    expect(body).not.toHaveProperty('company_website')
  })

  it('surfaces a provider error rather than a false success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))

    const { submitContact: submit } = await import('./submitContact')
    const result = await submit(valid, { startedAt: patient(), lastSubmitted: null })

    expect(result.kind).toBe('error')
    if (result.kind === 'error') expect(result.message).toContain('500')
  })

  it('surfaces a network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    const { submitContact: submit } = await import('./submitContact')
    const result = await submit(valid, { startedAt: patient(), lastSubmitted: null })

    expect(result.kind).toBe('error')
    if (result.kind === 'error') expect(result.message).toMatch(/could not reach/i)
  })
})

describe('submitContact via Web3Forms', () => {
  const ACCESS_KEY = 'test-access-key'

  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('VITE_CONTACT_FORM_ACCESS_KEY', ACCESS_KEY)
  })

  it('defaults to the Web3Forms endpoint when only a key is configured', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => ({ success: true }),
    })
    vi.stubGlobal('fetch', fetchSpy)

    const { submitContact: submit } = await import('./submitContact')
    const result = await submit(valid, { startedAt: patient(), lastSubmitted: null })

    expect(result.kind).toBe('success')
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({ method: 'POST' }),
    )

    const request = fetchSpy.mock.calls[0][1]
    const form = request.body as FormData
    expect(form).toBeInstanceOf(FormData)
    expect(form.get('access_key')).toBe(ACCESS_KEY)
    expect(form.get('replyto')).toBe(valid.email)
    expect(form.has('company_website')).toBe(false)
    // A Content-Type header would trigger a CORS preflight Web3Forms rejects.
    expect(request.headers).not.toHaveProperty('Content-Type')
  })

  it('reports a failure when Web3Forms answers 200 with success:false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => ({ success: false, message: 'Invalid access key' }),
      }),
    )

    const { submitContact: submit } = await import('./submitContact')
    const result = await submit(valid, { startedAt: patient(), lastSubmitted: null })

    expect(result.kind).toBe('error')
    if (result.kind === 'error') expect(result.message).toContain('Invalid access key')
  })

  it('does not post at all when the Web3Forms key is missing', async () => {
    vi.resetModules()
    vi.doMock('@/data/site.config', async () => {
      const actual = await vi.importActual<typeof SiteConfigModule>('@/data/site.config')
      return {
        ...actual,
        siteConfig: {
          ...actual.siteConfig,
          contactFormEndpoint: 'https://api.web3forms.com/submit',
          contactFormAccessKey: null,
        },
      }
    })
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    const { submitContact: submit } = await import('./submitContact')
    const result = await submit(valid, { startedAt: patient(), lastSubmitted: null })

    expect(result.kind).toBe('no-endpoint')
    expect(fetchSpy).not.toHaveBeenCalled()
    vi.doUnmock('@/data/site.config')
  })
})
