import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold whitespace-nowrap ' +
  'transition-[transform,box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-turquoise-500 to-cyan-500 text-navy-950 shadow-[0_14px_36px_-16px_rgba(34,229,174,0.75)] ' +
    'hover:from-turquoise-400 hover:to-cyan-400 hover:shadow-[0_18px_44px_-16px_rgba(34,229,174,0.9)]',
  secondary:
    'border border-cyan-400/25 bg-navy-800/60 text-ink-100 backdrop-blur-sm hover:border-turquoise-500/50 hover:bg-navy-700/60',
  ghost: 'text-ink-300 hover:text-turquoise-400',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-7 text-[0.9375rem]',
}

type CommonProps = {
  readonly variant?: Variant
  readonly size?: Size
  readonly children: ReactNode
  readonly className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  to,
  ...rest
}: CommonProps & { readonly to: string } & Omit<ComponentProps<typeof Link>, 'to' | 'className'>) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  )
}

export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<'a'>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  )
}
