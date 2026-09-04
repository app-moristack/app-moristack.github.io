import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { describedBy, fieldId } from '@/lib/formFields'
import { siteConfig } from '@/data/site.config'
import { contactDefaults, contactSchema, type ContactFormValues } from '@/lib/contactSchema'
import { fingerprint, submitContact, type SubmitOutcome } from '@/lib/submitContact'
import { ContactFields } from './ContactFields'
import { FormStatus } from './FormStatus'

export function ContactForm() {
  const [outcome, setOutcome] = useState<SubmitOutcome | null>(null)
  const startedAt = useRef(0)
  const lastSubmitted = useRef<string | null>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults,
    mode: 'onBlur',
  })

  /** Entered values are only cleared once the provider has accepted the enquiry. */
  const onSubmit = async (values: ContactFormValues) => {
    const result = await submitContact(values, {
      startedAt: startedAt.current,
      lastSubmitted: lastSubmitted.current,
    })

    setOutcome(result)

    if (result.kind === 'success') {
      lastSubmitted.current = fingerprint(values)
      reset(contactDefaults)
      startedAt.current = Date.now()
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
      aria-labelledby="contact-form-heading"
      className="ms-panel relative p-6 sm:p-8"
    >
      <h2 id="contact-form-heading" className="sr-only">
        Request a quote
      </h2>

      <FormStatus outcome={outcome} />

      <ContactFields register={register} errors={errors} />

      <div className="absolute top-0 -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={fieldId('company_website')}>Leave this field empty</label>
        <input
          id={fieldId('company_website')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company_website')}
        />
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id={fieldId('consent')}
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 rounded border-cyan-400/30 bg-navy-900 accent-turquoise-500"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={describedBy(fieldId('consent'), errors.consent?.message)}
          {...register('consent')}
        />
        <div>
          <label htmlFor={fieldId('consent')} className="text-sm leading-relaxed text-ink-300">
            I agree that {siteConfig.businessName} may store the details in this form and use them
            to reply to my enquiry.
          </label>
          {errors.consent ? (
            <p
              id={`${fieldId('consent')}-error`}
              className="mt-1 text-xs font-medium text-coral-400"
            >
              {errors.consent.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 size={17} aria-hidden="true" className="animate-spin" />
              Sending your enquiry
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              Send my enquiry
            </>
          )}
        </Button>
        <p className="text-sm text-ink-500">{siteConfig.responseTime}</p>
      </div>
    </form>
  )
}
