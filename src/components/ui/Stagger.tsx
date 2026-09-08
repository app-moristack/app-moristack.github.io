import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { fadeIn, staggerContainer, viewportOnce, type RevealDirection } from '@/lib/motion'

type Tag = 'div' | 'ul' | 'ol' | 'li' | 'dl' | 'p' | 'section'

/**
 * Orchestrates its children from one scroll trigger, so a grid arrives as a
 * single wave instead of each tile firing its own independent observer.
 */
export function Stagger({
  children,
  className,
  as = 'div',
  stagger = 0.07,
  delayChildren = 0,
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly as?: Tag
  readonly stagger?: number
  readonly delayChildren?: number
}) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
  direction = 'up',
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly as?: Tag
  readonly direction?: RevealDirection
}) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component className={className} variants={fadeIn(direction)}>
      {children}
    </Component>
  )
}
