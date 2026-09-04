import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { siteConfig } from '@/data/site.config'
import { MIN_FILL_SECONDS, type SubmitOutcome } from '@/lib/submitContact'

const EmailFallback = () => (
  <>
    {' '}
    You can also email us directly at{' '}
    <a href={`mailto:${siteConfig.email}`} className="font-semibold underline">
      {siteConfig.email}
    </a>
    .
  </>
)

/**
 * Announces the result of a submission. Rendered as an alert so screen readers
 * are told what happened without the user having to hunt for the message.
 */
export function FormStatus({ outcome }: { readonly outcome: SubmitOutcome | null }) {
  if (!outcome || outcome.kind === 'rejected-bot') {
    return (
      <div role="status" aria-live="polite" className="sr-only">
        {outcome?.kind === 'rejected-bot' ? 'Your enquiry could not be sent.' : ''}
      </div>
    )
  }

  const isSuccess = outcome.kind === 'success'

  const content = () => {
    switch (outcome.kind) {
      case 'success':
        return (
          <>
            <strong className="font-semibold">Thank you — your enquiry has been sent.</strong>{' '}
            {siteConfig.responseTime}
          </>
        )
      case 'no-endpoint':
        return (
          <>
            <strong className="font-semibold">This form is not connected yet.</strong> Nothing was
            sent, so please do not wait for a reply.
            <EmailFallback />
          </>
        )
      case 'duplicate':
        return (
          <>
            <strong className="font-semibold">We already have this enquiry.</strong> You sent the
            same details a moment ago, so we have not sent a duplicate.
          </>
        )
      case 'too-fast':
        return (
          <>
            <strong className="font-semibold">That was submitted very quickly.</strong> Please take
            at least {MIN_FILL_SECONDS} seconds over the form, then send it again.
          </>
        )
      case 'error':
        return (
          <>
            <strong className="font-semibold">Your enquiry could not be sent.</strong>{' '}
            {outcome.message}
            <EmailFallback />
          </>
        )
    }
  }

  const tone = isSuccess
    ? 'border-turquoise-500/35 bg-turquoise-500/8 text-ink-100'
    : outcome.kind === 'duplicate'
      ? 'border-cyan-400/30 bg-cyan-500/8 text-ink-100'
      : 'border-coral-500/35 bg-coral-500/8 text-ink-100'

  const Icon = isSuccess ? CheckCircle2 : outcome.kind === 'duplicate' ? Info : AlertTriangle
  const iconTone = isSuccess
    ? 'text-turquoise-400'
    : outcome.kind === 'duplicate'
      ? 'text-cyan-400'
      : 'text-coral-400'

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      aria-live={isSuccess ? 'polite' : 'assertive'}
      className={`mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed ${tone}`}
    >
      <Icon size={18} aria-hidden="true" className={`mt-0.5 shrink-0 ${iconTone}`} />
      <p>{content()}</p>
    </div>
  )
}
