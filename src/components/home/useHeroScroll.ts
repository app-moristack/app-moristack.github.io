import { useRef } from 'react'
import { useScroll, useTransform } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Scroll-linked depth for the fold: the grid backdrop trails the content and
 * the copy drifts up and fades as the hero leaves. Returns inert values when
 * reduced motion is requested, so the caller needs no branch.
 */
export function useHeroScroll() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const backdropY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.25])

  return { ref, backdropY, contentY, contentOpacity }
}
