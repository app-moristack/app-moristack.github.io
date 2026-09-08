import type { Transition, Variants } from 'motion/react'

/** Shared easing curve; mirrors --ease-out-soft in theme.css. */
export const easeOutSoft = [0.22, 1, 0.36, 1] as const

export const duration = {
  fast: 0.22,
  base: 0.42,
  slow: 0.7,
} as const

export const spring = {
  soft: { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 },
  snappy: { type: 'spring', stiffness: 420, damping: 32, mass: 0.6 },
  drift: { type: 'spring', stiffness: 110, damping: 22, mass: 1.1 },
} satisfies Record<string, Transition>

export const viewportOnce = { once: true, margin: '-12% 0px -8% 0px' } as const

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

const offsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 22 },
  down: { x: 0, y: -22 },
  left: { x: 26, y: 0 },
  right: { x: -26, y: 0 },
  none: { x: 0, y: 0 },
}

export function fadeIn(direction: RevealDirection = 'up', distance = 1): Variants {
  const offset = offsets[direction]
  return {
    hidden: {
      opacity: 0,
      x: offset.x * distance,
      y: offset.y * distance,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: duration.slow, ease: easeOutSoft },
    },
  }
}

export function staggerContainer(stagger = 0.07, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}

/** Line-level mask reveal: the child slides out from under its own clip. */
export const maskLine: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: duration.slow, ease: easeOutSoft },
  },
}

/** Applied instead of any variant when the visitor asks for reduced motion. */
export const staticVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}
