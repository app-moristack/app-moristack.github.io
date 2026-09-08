import { motion, useScroll, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

export function ScrollProgress() {
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })

  if (reduced) return null

  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-turquoise-500 via-cyan-400 to-coral-500"
    />
  )
}
