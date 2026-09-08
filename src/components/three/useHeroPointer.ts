import { useEffect, useRef } from 'react'

/**
 * Window-level pointer tracking. The hero canvas is pointer-events:none, so
 * R3F's own pointer never updates — this reads the window instead. Coarse
 * pointers are ignored entirely, which is what disables parallax on touch.
 */
export function useHeroPointer(enabled: boolean) {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  return pointer
}

/** Fraction of the first viewport scrolled past, read without re-rendering. */
export function heroScrollProgress() {
  if (typeof window === 'undefined') return 0
  const span = window.innerHeight * 0.85
  return Math.min(1, Math.max(0, window.scrollY / span))
}
