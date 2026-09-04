import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Field({
  id,
  label,
  error,
  hint,
  required = false,
  children,
  className,
}: {
  readonly id: string
  readonly label: string
  readonly error?: string
  readonly hint?: string
  readonly required?: boolean
  readonly children: ReactNode
  readonly className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-ink-200 text-sm font-medium">
        {label}
        {required ? (
          <span className="ml-1 text-coral-400" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-500">(optional)</span>
        )}
      </label>

      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-ink-500">
          {hint}
        </p>
      ) : null}

      {children}

      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-coral-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}
