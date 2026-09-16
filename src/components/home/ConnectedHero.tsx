import { useEffect, useRef, useState } from 'react'
import { ArrowDown, SkipForward, RotateCcw } from 'lucide-react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { coastline, communities, connections } from '@/components/three/journey'
import type { JourneyController } from '@/components/three/createConnectedScene'
import '@/styles/connected-hero.css'

const VISIT_KEY = 'moristack-earth-intro-v1'
let playedInMemory = false
function hasPlayed() {
  try {
    return playedInMemory || sessionStorage.getItem(VISIT_KEY) === 'played'
  } catch {
    return playedInMemory
  }
}
function rememberVisit() {
  playedInMemory = true
  try {
    sessionStorage.setItem(VISIT_KEY, 'played')
  } catch {
    /* Private browsing still works. */
  }
}

function IslandFallback() {
  const point = ([x, y]: number[]) => `${200 + x * 86},${185 - y * 65}`
  return (
    <svg className="connected-fallback" viewBox="0 0 400 380" aria-hidden="true">
      <defs>
        <linearGradient id="connected-land" x2="0.7" y2="1">
          <stop stopColor="#32766e" />
          <stop offset="1" stopColor="#0a2d43" />
        </linearGradient>
        <radialGradient id="connected-sea">
          <stop stopColor="#126485" stopOpacity=".6" />
          <stop offset="1" stopColor="#03111d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="210" rx="195" ry="160" fill="url(#connected-sea)" />
      <g transform="translate(0 35) scale(1 .85)">
        <polygon
          points={coastline.map(point).join(' ')}
          fill="url(#connected-land)"
          stroke="#65d9dc"
          strokeWidth="1.3"
        />
        {connections.map(([a, b], i) => (
          <path
            key={i}
            d={`M${point(communities[a])} Q200,130 ${point(communities[b])}`}
            fill="none"
            stroke="#5edbff"
            strokeOpacity=".65"
          />
        ))}
        {communities.map((p, i) => (
          <g key={i} transform={`translate(${point(p)})`}>
            <circle r="10" fill="#072d41" stroke="#73e6ff" />
            <circle cy="-2.8" r="2.4" fill="#d5faff" />
            <path d="M-4 5 C-4 0 4 0 4 5" fill="none" stroke="#d5faff" strokeWidth="1.5" />
          </g>
        ))}
      </g>
    </svg>
  )
}

export function ConnectedHero() {
  const reduced = usePrefersReducedMotion()
  const host = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const controller = useRef<JourneyController | null>(null)
  const skipRequested = useRef(hasPlayed())
  const [ready, setReady] = useState(false)
  const [complete, setComplete] = useState(hasPlayed)
  const [failed, setFailed] = useState(false)
  const [caption, setCaption] = useState('A world of possibilities')

  useEffect(() => {
    const element = section.current
    const container = host.current
    if (!element || !container || reduced) return
    let cancelled = false
    let visible = false
    let loading = false
    let scene: JourneyController | undefined
    const update = () => scene?.setActive(visible && !document.hidden)
    const load = async () => {
      if (loading) return
      loading = true
      try {
        const { createConnectedScene } = await import('@/components/three/createConnectedScene')
        if (cancelled) return
        scene = await createConnectedScene(container, {
          onStage: setCaption,
          onReveal: () => setComplete(true),
          onStart: () => {
            skipRequested.current = true
            rememberVisit()
          },
          onError: () => {
            setFailed(true)
            setComplete(true)
          },
        })
        if (cancelled) {
          scene.dispose()
          return
        }
        controller.current = scene
        if (skipRequested.current) scene.finish()
        update()
        setReady(true)
      } catch {
        if (!cancelled) {
          setFailed(true)
          setComplete(true)
        }
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) void load()
        update()
      },
      { threshold: 0.1 },
    )
    observer.observe(element)
    document.addEventListener('visibilitychange', update)
    return () => {
      cancelled = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
      scene?.dispose()
      controller.current = null
    }
  }, [reduced])

  const final = complete || reduced || failed
  return (
    <section
      ref={section}
      className="launcher-hero connected-hero"
      data-ready={ready && !failed && !reduced}
      data-final={final}
      aria-labelledby="launcher-heading"
    >
      <IslandFallback />
      <div ref={host} className="connected-canvas" aria-hidden="true" />
      <div className="connected-vignette" aria-hidden="true" />
      <div className="connected-caption" aria-hidden="true">
        <span />
        {final ? 'MAURITIUS, CONNECTED' : caption}
      </div>
      <div className="connected-title">
        <p className="connected-wordmark">
          Mori<span>Stack</span>
        </p>
        <h1 ref={heading} tabIndex={-1} id="launcher-heading">
          A More
          <br />
          <span>Connected</span>
          <br />
          Mauritius
        </h1>
        <p className="connected-intro">
          Find your home. Get moving. Live well.
          <br />
          Everyday connections, made simpler.
        </p>
      </div>
      {!final && (
        <button
          className="connected-skip"
          type="button"
          onClick={() => {
            skipRequested.current = true
            rememberVisit()
            controller.current?.finish()
            setComplete(true)
            heading.current?.focus({ preventScroll: true })
          }}
        >
          Skip animation <SkipForward size={12} />
        </button>
      )}
      {final && ready && !reduced && !failed && (
        <button
          className="connected-skip"
          type="button"
          onClick={() => {
            skipRequested.current = false
            setComplete(false)
            controller.current?.replay()
          }}
        >
          Replay animation <RotateCcw size={12} />
        </button>
      )}
      <button
        className="connected-explore"
        type="button"
        aria-label="Explore applications"
        onClick={() =>
          document
            .getElementById('launcher-apps')
            ?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'nearest' })
        }
      >
        <ArrowDown size={17} />
      </button>
    </section>
  )
}
