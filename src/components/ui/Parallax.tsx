import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Shifts its child against the scroll over the span in which the element is on
 * screen. `distance` is in pixels of total travel, not a ratio.
 */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly distance?: number
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
