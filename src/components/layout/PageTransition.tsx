import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLocation } from 'react-router'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { duration, easeOutSoft } from '@/lib/motion'

export function PageTransition({ children }: { readonly children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const { pathname } = useLocation()

  if (reduced) return <>{children}</>

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: duration.base, ease: easeOutSoft }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
