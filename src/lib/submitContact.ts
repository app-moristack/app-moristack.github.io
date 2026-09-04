import type { ContactFormValues } from './contactSchema'
import { siteConfig } from '@/data/site.config'

export type SubmitOutcome =
  | { readonly kind: 'success' }
  | { readonly kind: 'no-endpoint' }
  | { readonly kind: 'duplicate' }
  | { readonly kind: 'too-fast' }
  | { readonly kind: 'rejected-bot' }
  | { readonly kind: 'error'; readonly message: string }

/** A genuine visitor needs longer than this to fill the form in. */
export const MIN_FILL_SECONDS = 4

export function fingerprint(values: ContactFormValues) {
  return [values.email, values.projectType, values.message].join('|').toLowerCase()
}

export async function submitContact(
  values: ContactFormValues,
  context: { readonly startedAt: number; readonly lastSubmitted: string | null },
): Promise<SubmitOutcome> {
  if (values.company_website) return { kind: 'rejected-bot' }

  if (Date.now() - context.startedAt < MIN_FILL_SECONDS * 1000) {
    return { kind: 'too-fast' }
  }

  if (context.lastSubmitted === fingerprint(values)) {
    return { kind: 'duplicate' }
  }

  const endpoint = siteConfig.contactFormEndpoint
  if (!endpoint) return { kind: 'no-endpoint' }

  const { company_website: _honeypot, ...payload } = values

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...payload,
        _subject: `New enquiry from ${values.fullName} (${values.projectType})`,
      }),
    })

    if (response.ok) return { kind: 'success' }

    if (response.status === 429) {
      return {
        kind: 'error',
        message: 'Too many submissions from this device. Please try again in a few minutes.',
      }
    }

    return {
      kind: 'error',
      message: `The form service returned an error (${response.status}). Your details have been kept below.`,
    }
  } catch {
    return {
      kind: 'error',
      message: 'We could not reach the form service. Check your connection and try again.',
    }
  }
}
