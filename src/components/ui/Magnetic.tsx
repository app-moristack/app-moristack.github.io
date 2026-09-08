import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { spring } from '@/lib/motion'

/**
 * Pulls its child a few pixels toward the pointer. Pointer-type is checked per
 * event rather than once, so a hybrid laptop that is being touched gets nothing.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly strength?: number
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, spring.soft)
  const y = useSpring(rawY, spring.soft)

  if (reduced) {
    return (
      <span style={{ display: 'inline-flex' }} className={className}>
        {children}
      </span>
    )
  }

  const onPointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== 'mouse' || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    rawX.set((event.clientX - (bounds.left + bounds.width / 2)) * strength)
    rawY.set((event.clientY - (bounds.top + bounds.height / 2)) * strength)
  }

  const reset = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-flex' }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.span>
  )
}
