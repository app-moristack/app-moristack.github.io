import { useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

/**
 * Writes the pointer position onto CSS custom properties instead of React
 * state, so tracking a cursor across a grid of cards never triggers a render.
 */
export function Spotlight({
  children,
  className,
  as: Component = 'div',
}: {
  readonly children: ReactNode
  readonly className?: string
  readonly as?: 'div' | 'article' | 'li'
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current
    if (!node) return
    const bounds = node.getBoundingClientRect()
    node.style.setProperty('--ms-spot-x', `${event.clientX - bounds.left}px`)
    node.style.setProperty('--ms-spot-y', `${event.clientY - bounds.top}px`)
    node.style.setProperty('--ms-spot-opacity', '1')
  }

  const onPointerLeave = () => {
    ref.current?.style.setProperty('--ms-spot-opacity', '0')
  }

  return (
    <Component
      ref={ref as never}
      className={cn('ms-spotlight', className)}
      onPointerMove={reduced ? undefined : onPointerMove}
      onPointerLeave={reduced ? undefined : onPointerLeave}
    >
      {children}
    </Component>
  )
}
