import { Suspense, lazy, useEffect, useState } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

const HeroScene = lazy(() => import('./HeroScene'))

type Composition = { readonly offsetX: number; readonly scale: number }

/** Slides the massif clear of the headline and sizes it for the viewport. */
/** The camera is fixed, so a wider frustum needs a bigger model to keep presence. */
const WIDE: Composition = { offsetX: 3.1, scale: 0.8 }
const DESKTOP: Composition = { offsetX: 2.3, scale: 0.74 }
const TABLET: Composition = { offsetX: 1.4, scale: 0.5 }

/** Pure CSS stand-in: shown until the scene loads, and permanently when it cannot run. */
function StaticFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,229,174,0.18),transparent_62%)] blur-2xl lg:left-[72%]" />
      <div className="absolute top-[34%] left-[58%] size-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,69,0.12),transparent_65%)] blur-2xl lg:left-[84%]" />
      {/* The flat-topped massif, so the silhouette still reads as Le Morne without WebGL. */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_top,rgba(16,64,92,0.6),rgba(34,229,174,0.12))] [clip-path:polygon(0_100%,8%_94%,21%_60%,32%_38%,44%_31%,63%_30%,75%_39%,84%_60%,92%_84%,100%_100%)]" />
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
  const [composition, setComposition] = useState<Composition | null>(null)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const phone = window.matchMedia('(max-width: 767px)').matches
    const lowCoreCount = (navigator.hardwareConcurrency ?? 8) <= 4
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true

    if (phone || lowCoreCount || saveData || !supportsWebGl()) return

    const wide = window.matchMedia('(min-width: 1600px)').matches
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    const layout = wide ? WIDE : desktop ? DESKTOP : TABLET
    const schedule =
      window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 600))
    const handle = schedule(() => setComposition(layout))

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
      {composition ? (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <HeroScene
              animate={tabVisible && !reducedMotion}
              offsetX={composition.offsetX}
              scale={composition.scale}
            />
          </Suspense>
        </ErrorBoundary>
      ) : null}
    </div>
  )
}
