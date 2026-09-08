import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { fadeIn, viewportOnce, type RevealDirection } from '@/lib/motion'

type RevealProps = {
  readonly children: ReactNode
  readonly delay?: number
  readonly direction?: RevealDirection
  readonly distance?: number
  readonly className?: string
  readonly as?: 'div' | 'li' | 'section' | 'article'
  readonly 'aria-hidden'?: boolean | 'true' | 'false'
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 1,
  className,
  as = 'div',
  ...rest
}: RevealProps) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Static = as
    return (
      <Static className={className} {...rest}>
        {children}
      </Static>
    )
  }

  return (
    <Component
      className={className}
      variants={fadeIn(direction, distance)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Component>
  )
}
