import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

type RevealProps = {
  readonly children: ReactNode
  readonly delay?: number
  readonly y?: number
  readonly className?: string
  readonly as?: 'div' | 'li' | 'section' | 'article'
}

export function Reveal({ children, delay = 0, y = 18, className, as = 'div' }: RevealProps) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}
