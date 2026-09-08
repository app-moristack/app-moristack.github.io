import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'
import { maskLine, staggerContainer, viewportOnce } from '@/lib/motion'

/**
 * Wraps a headline whose children are <RevealLine> elements, one per visual
 * line, so the lines rise out from under their own clip in sequence.
 */
export function RevealLines({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0,
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly stagger?: number
  readonly delayChildren?: number
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) return <span className={className}>{children}</span>

  return (
    <motion.span
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.span>
  )
}

/**
 * display:block is set inline as well as by class: a line's accessible name is
 * only separated from the next by a space when the name computation can see
 * that the lines are block-level, which a utility class alone does not carry.
 */
export function RevealLine({
  children,
  className,
}: {
  readonly children: ReactNode
  readonly className?: string
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <span style={{ display: 'block' }} className={className}>
        {children}
      </span>
    )
  }

  return (
    <span
      style={{ display: 'block' }}
      className="-mb-[0.14em] overflow-hidden pb-[0.14em] [clip-path:inset(0_-100%_0_-100%)]"
    >
      <motion.span style={{ display: 'block' }} className={cn(className)} variants={maskLine}>
        {children}
      </motion.span>
    </span>
  )
}
