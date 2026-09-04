import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Field } from '@/components/ui/Field'
import { describedBy, fieldControlClass, fieldId } from '@/lib/formFields'
import {
  budgetRanges,
  contactMethods,
  projectTypes,
  type ContactFormValues,
} from '@/lib/contactSchema'

type Props = {
  readonly register: UseFormRegister<ContactFormValues>
  readonly errors: FieldErrors<ContactFormValues>
}

export function ContactFields({ register, errors }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id={fieldId('fullName')} label="Full name" required error={errors.fullName?.message}>
        <input
          id={fieldId('fullName')}
          type="text"
          autoComplete="name"
          className={fieldControlClass}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={describedBy(fieldId('fullName'), errors.fullName?.message)}
          {...register('fullName')}
        />
      </Field>

      <Field
        id={fieldId('businessName')}
        label="Business or organisation"
        error={errors.businessName?.message}
      >
        <input
          id={fieldId('businessName')}
          type="text"
          autoComplete="organization"
          className={fieldControlClass}
          aria-invalid={Boolean(errors.businessName)}
          aria-describedby={describedBy(fieldId('businessName'), errors.businessName?.message)}
          {...register('businessName')}
        />
      </Field>

      <Field id={fieldId('email')} label="Email" required error={errors.email?.message}>
        <input
          id={fieldId('email')}
          type="email"
          inputMode="email"
          autoComplete="email"
          className={fieldControlClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy(fieldId('email'), errors.email?.message)}
          {...register('email')}
        />
      </Field>

      <Field id={fieldId('phone')} label="Phone number" required error={errors.phone?.message}>
        <input
          id={fieldId('phone')}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={fieldControlClass}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy(fieldId('phone'), errors.phone?.message)}
          {...register('phone')}
        />
      </Field>

      <Field
        id={fieldId('preferredContact')}
        label="Preferred contact method"
        required
        error={errors.preferredContact?.message}
      >
        <select
          id={fieldId('preferredContact')}
          className={fieldControlClass}
          aria-invalid={Boolean(errors.preferredContact)}
          aria-describedby={describedBy(
            fieldId('preferredContact'),
            errors.preferredContact?.message,
          )}
          {...register('preferredContact')}
        >
          {contactMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fieldId('projectType')}
        label="Project type"
        required
        error={errors.projectType?.message}
      >
        <select
          id={fieldId('projectType')}
          className={fieldControlClass}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={describedBy(fieldId('projectType'), errors.projectType?.message)}
          {...register('projectType')}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fieldId('budget')}
        label="Estimated budget"
        required
        hint="A range is enough. It helps us propose something realistic."
        error={errors.budget?.message}
      >
        <select
          id={fieldId('budget')}
          className={fieldControlClass}
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={describedBy(fieldId('budget'), errors.budget?.message, 'hint')}
          {...register('budget')}
        >
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fieldId('launchDate')}
        label="Desired launch date"
        error={errors.launchDate?.message}
      >
        <input
          id={fieldId('launchDate')}
          type="date"
          className={fieldControlClass}
          aria-invalid={Boolean(errors.launchDate)}
          aria-describedby={describedBy(fieldId('launchDate'), errors.launchDate?.message)}
          {...register('launchDate')}
        />
      </Field>

      <Field
        id={fieldId('existingWebsite')}
        label="Existing website"
        hint="If you already have one, we would like to look at it."
        error={errors.existingWebsite?.message}
        className="sm:col-span-2"
      >
        <input
          id={fieldId('existingWebsite')}
          type="url"
          inputMode="url"
          placeholder="https://"
          className={fieldControlClass}
          aria-invalid={Boolean(errors.existingWebsite)}
          aria-describedby={describedBy(
            fieldId('existingWebsite'),
            errors.existingWebsite?.message,
            'hint',
          )}
          {...register('existingWebsite')}
        />
      </Field>

      <Field
        id={fieldId('message')}
        label="Project description"
        required
        hint="What are you trying to build or fix, and what would success look like?"
        error={errors.message?.message}
        className="sm:col-span-2"
      >
        <textarea
          id={fieldId('message')}
          rows={6}
          className={`${fieldControlClass} resize-y`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy(fieldId('message'), errors.message?.message, 'hint')}
          {...register('message')}
        />
      </Field>
    </div>
  )
}
