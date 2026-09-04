export const fieldControlClass =
  'w-full min-h-11 rounded-xl border border-cyan-400/18 bg-navy-900/70 px-3.5 py-2.5 text-sm text-ink-100 ' +
  'placeholder:text-ink-500 transition-colors focus:border-turquoise-500/60 ' +
  'aria-[invalid=true]:border-coral-500/70'

export const fieldId = (name: string) => `contact-${name}`

/** Links a control to its hint and error text for assistive technology. */
export function describedBy(id: string, error?: string, hint?: string) {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean)
  return ids.length > 0 ? ids.join(' ') : undefined
}
