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
    <span className="inline-flex items-center gap-2 rounded-full border border-turquoise-500/25 bg-turquoise-500/8 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-turquoise-400 uppercase">
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
    <Reveal className={cn('mb-12 max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          'text-3xl font-extrabold text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]',
          eyebrow && 'mt-4',
        )}
      >
        {title}
      </h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-ink-300">{intro}</p> : null}
    </Reveal>
  )
}
