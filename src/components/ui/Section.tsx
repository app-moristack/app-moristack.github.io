import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

export function Container({
  children,
  className,
}: {
  readonly children: ReactNode
  readonly className?: string
}) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>
}

export function Section({
  children,
  className,
  id,
  labelledBy,
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly id?: string
  readonly labelledBy?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-16 sm:py-24', className)}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children }: { readonly children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.2em] text-turquoise-400 uppercase">
      <span aria-hidden="true" className="h-px w-7 bg-turquoise-500/60" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = 'center',
}: {
  readonly eyebrow?: string
  readonly title: ReactNode
  readonly intro?: ReactNode
  readonly id?: string
  readonly align?: 'center' | 'left'
}) {
  return (
    <Reveal
      className={cn(
        'mb-14 max-w-2xl',
        align === 'center' && 'mx-auto flex flex-col items-center text-center',
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className={cn('text-section font-extrabold text-balance', eyebrow && 'mt-5')}>
        {title}
      </h2>
      {intro ? <p className="mt-5 text-lead text-ink-400">{intro}</p> : null}
    </Reveal>
  )
}
