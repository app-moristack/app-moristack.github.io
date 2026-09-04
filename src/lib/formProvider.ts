import type { ContactFormValues } from './contactSchema'

export type FormProvider = 'web3forms' | 'formspree' | 'generic'

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export function detectProvider(endpoint: string): FormProvider {
  if (endpoint.includes('web3forms.com')) return 'web3forms'
  if (endpoint.includes('formspree.io')) return 'formspree'
  return 'generic'
}

/**
 * Builds the request body for the configured provider. The honeypot is stripped
 * so it never leaves the browser, and the subject line is set per provider
 * because each one reads a differently named field.
 */
export function buildPayload(
  values: ContactFormValues,
  provider: FormProvider,
  accessKey: string | null,
): Record<string, unknown> {
  const { company_website: _honeypot, ...fields } = values
  const subject = `New enquiry from ${values.fullName} (${values.projectType})`

  if (provider === 'web3forms') {
    return {
      access_key: accessKey ?? '',
      subject,
      from_name: values.fullName,
      replyto: values.email,
      ...fields,
    }
  }

  return { ...fields, _subject: subject }
}

/**
 * Web3Forms answers HTTP 200 with `success: false` when it rejects a
 * submission, so a 2xx status alone is not proof of delivery. FormSubmit
 * reports success as the string "true". Anything without a success field is
 * judged on the status code alone.
 */
export function isDelivered(status: number, body: unknown): boolean {
  if (status < 200 || status >= 300) return false
  if (body && typeof body === 'object' && 'success' in body) {
    const flag = (body as { success: unknown }).success
    return flag === true || flag === 'true'
  }
  return true
}

/**
 * Web3Forms does not answer a CORS preflight, so its request must stay a
 * "simple" one: FormData, and no explicit Content-Type header. Setting
 * Content-Type: application/json triggers a preflight and the browser blocks
 * the submission before it is ever sent.
 */
export function toFormData(payload: Record<string, unknown>): FormData {
  const form = new FormData()
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null) continue
    form.append(key, typeof value === 'boolean' ? String(value) : String(value))
  }
  return form
}

export type RequestShape = {
  readonly body: FormData | string
  readonly headers: Record<string, string>
}

export function buildRequest(
  payload: Record<string, unknown>,
  provider: FormProvider,
): RequestShape {
  if (provider === 'web3forms') {
    return { body: toFormData(payload), headers: { Accept: 'application/json' } }
  }
  return {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  }
}

/** Names the third party the privacy policy has to disclose. */
export function providerDisplayName(endpoint: string | null): string {
  if (!endpoint) return 'an external form provider'
  switch (detectProvider(endpoint)) {
    case 'web3forms':
      return 'Web3Forms'
    case 'formspree':
      return 'Formspree'
    default:
      return 'an external form provider'
  }
}

export function providerMessage(body: unknown): string | null {
  if (body && typeof body === 'object' && 'message' in body) {
    const message = (body as { message: unknown }).message
    if (typeof message === 'string' && message.trim() !== '') return message
  }
  return null
}
