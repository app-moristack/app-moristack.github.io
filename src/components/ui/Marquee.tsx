import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

/**
 * The track is rendered twice and travels exactly -50%, which is what makes the
 * wrap seamless; the copy is hidden from assistive tech to avoid a duplicate read.
 */
export function Marquee({
  children,
  speed = 34,
  reverse = false,
  className,
}: {
  readonly children: ReactNode
  readonly speed?: number
  readonly reverse?: boolean
  readonly className?: string
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div className={cn('flex gap-4 overflow-x-auto', className)}>
        <div className="flex shrink-0 items-center gap-4">{children}</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden',
        '[mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]',
        className,
      )}
    >
      <motion.div
        className="flex w-max shrink-0 items-center gap-4 pr-4 group-hover:[animation-play-state:paused]"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center gap-4 pr-4">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-4 pr-4">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
