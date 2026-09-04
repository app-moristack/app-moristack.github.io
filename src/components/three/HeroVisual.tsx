import { Suspense, lazy, useEffect, useState } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

const HeroScene = lazy(() => import('./HeroScene'))

/** Slides the scene clear of the headline. The scene only runs at lg and above. */
const SCENE_OFFSET_X = 3.1

/** Pure CSS stand-in: shown until the scene loads, and permanently when it cannot run. */
function StaticFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,229,174,0.18),transparent_62%)] blur-2xl lg:left-[72%]" />
      <div className="absolute top-[34%] left-[58%] size-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,69,0.12),transparent_65%)] blur-2xl lg:left-[84%]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(16,64,92,0.3),transparent)] [clip-path:polygon(0_100%,18%_58%,34%_34%,52%_28%,70%_44%,86%_62%,100%_100%)]" />
    </div>
  )
}

function supportsWebGl() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Decorative hero visual. Never blocks first paint: the CSS fallback renders
 * immediately, and the 3D scene is only mounted on capable devices after idle.
 */
export function HeroVisual() {
  const reducedMotion = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const smallScreen = window.matchMedia('(max-width: 1023px)').matches
    const lowCoreCount = (navigator.hardwareConcurrency ?? 8) <= 4
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true

    if (smallScreen || lowCoreCount || saveData || !supportsWebGl()) return

    const schedule =
      window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 600))
    const handle = schedule(() => setEnabled(true))

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle as number)
      else window.clearTimeout(handle as number)
    }
  }, [])

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0">
      <StaticFallback />
      {enabled ? (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <HeroScene animate={tabVisible && !reducedMotion} offsetX={SCENE_OFFSET_X} />
          </Suspense>
        </ErrorBoundary>
      ) : null}
    </div>
  )
}
