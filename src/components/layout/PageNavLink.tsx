import { Link } from 'react-router'
import type { ComponentProps } from 'react'
import { usePageIdentity } from '@/hooks/usePageIdentity'

type Props = Omit<ComponentProps<typeof Link>, 'className' | 'to'> & {
  to: string
  className?: string | ((state: { isActive: boolean }) => string)
}

export function PageNavLink({ to, className, ...props }: Props) {
  const { activePath } = usePageIdentity()
  const isActive = activePath === to.split('#')[0]
  return (
    <Link
      {...props}
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={typeof className === 'function' ? className({ isActive }) : className}
    />
  )
}
