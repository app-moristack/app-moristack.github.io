import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { ArrowDown, ArrowRight, Box, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router'
import { Seo } from '@/components/Seo'
import { Logo } from '@/components/ui/Logo'
import { assetUrl } from '@/data/site.config'
import { launcherApps } from '@/data/launcher'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import '@/styles/launcher.css'

export default function MoriStackPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const reduced = usePrefersReducedMotion()
  const product = launcherApps.find((app) => app.id === selected)
  const launcherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = launcherRef.current
    if (!element) return
    let visible = true
    const updateMotion = () => {
      element.dataset.paused = String(document.hidden || !visible)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updateMotion()
    })
    observer.observe(element)
    document.addEventListener('visibilitychange', updateMotion)
    updateMotion()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateMotion)
    }
  }, [])

  function tilt(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty(
      '--tilt-x',
      `${-((event.clientY - rect.top) / rect.height - 0.5) * 10}deg`,
    )
    event.currentTarget.style.setProperty(
      '--tilt-y',
      `${((event.clientX - rect.left) / rect.width - 0.5) * 10}deg`,
    )
  }

  function resetTilt(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div ref={launcherRef} className="launcher">
      <Seo
        title="MoriStack | A More Connected Mauritius"
        description="Your gateway to the MoriStack ecosystem. Explore MoriHome, MoriCar and MoriHealth — digital platforms for a more connected Mauritius."
      />
      <div className="launcher-layout">
        <section className="launcher-hero" aria-labelledby="launcher-heading">
          <p className="launcher-eyebrow">
            <span /> One island. Endless possibilities.
          </p>
          <h1 id="launcher-heading">
            A More
            <br />
            <span>Connected</span>
            <br />
            Mauritius
          </h1>
          <p className="launcher-intro">
            Digital solutions and platforms
            <br />
            for a brighter tomorrow.
          </p>
          <div className="launcher-landscape" aria-hidden="true">
            <img
              src={assetUrl('launcher/le-morne.webp')}
              width="1200"
              height="800"
              fetchPriority="high"
              alt=""
            />
            <span className="launcher-orbit launcher-orbit-one" />
            <span className="launcher-orbit launcher-orbit-two" />
            <span className="launcher-beacon" />
          </div>
          <p className="launcher-island-note">
            Small island.
            <br />
            <span>Bigger possibilities.</span>
          </p>
          <button
            type="button"
            className="launcher-explore"
            onClick={() => {
              document
                .getElementById('launcher-apps')
                ?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'nearest' })
            }}
            aria-label="Explore applications"
          >
            <ArrowDown size={18} />
          </button>
        </section>

        <section className="launcher-apps" id="launcher-apps" aria-label="MoriStack applications">
          <div className="launcher-grid-heading">
            <span>Your everyday, connected.</span>
            <span>THE ECOSYSTEM</span>
          </div>
          <div className="launcher-grid">
            {launcherApps.map((app, index) => {
              const content = (
                <>
                  <div className="launcher-card-art">
                    <img
                      src={assetUrl(`launcher/${app.image}.webp`)}
                      alt=""
                      width="560"
                      height="560"
                      decoding="async"
                    />
                  </div>
                  <div className="launcher-card-copy">
                    <span className="launcher-card-category">{app.category}</span>
                    <h2>{app.name}</h2>
                    <p>{app.tagline}</p>
                    <span className="launcher-card-status">
                      {app.url ? 'Open platform' : 'In development'}
                    </span>
                  </div>
                  <span className="launcher-card-arrow" aria-hidden="true">
                    <ArrowRight size={17} />
                  </span>
                </>
              )
              const props = {
                className: 'launcher-card',
                style: {
                  '--app-color': app.color,
                  '--card-delay': `${index * 90}ms`,
                } as CSSProperties,
                onPointerMove: tilt,
                onPointerLeave: resetTilt,
              }
              return app.url ? (
                <a key={app.id} {...props} href={app.url} aria-label={`Open ${app.name}`}>
                  {content}
                </a>
              ) : (
                <button
                  key={app.id}
                  {...props}
                  type="button"
                  onClick={() => setSelected(app.id)}
                  aria-expanded={selected === app.id}
                  aria-controls="launcher-status"
                  aria-label={`${app.name} — in development. View details`}
                >
                  {content}
                </button>
              )
            })}
            <button
              type="button"
              className="launcher-card launcher-coming"
              style={{ '--app-color': '#65caff', '--card-delay': '270ms' } as CSSProperties}
              onPointerMove={tilt}
              onPointerLeave={resetTilt}
              onClick={() => setSelected('soon')}
              aria-expanded={selected === 'soon'}
              aria-controls="launcher-status"
            >
              <div className="launcher-cube-art" aria-hidden="true">
                <div className="launcher-cube">
                  <Box strokeWidth={0.7} />
                  <Sparkles size={22} />
                </div>
                <span />
              </div>
              <div className="launcher-card-copy">
                <span className="launcher-card-category">What's next</span>
                <h2>
                  More to come<span className="text-cyan-400">.</span>
                </h2>
                <p>New solutions, loading...</p>
                <span className="launcher-card-status">Coming soon</span>
              </div>
              <span className="launcher-card-arrow" aria-hidden="true">
                <ArrowRight size={17} />
              </span>
            </button>
          </div>
          {selected && (
            <div id="launcher-status" className="launcher-status" role="status">
              <div>
                <strong>{product?.name ?? 'More possibilities are on the way'}</strong>
                <p>
                  {product
                    ? `${product.description} This platform is in development; a public launch link is not available yet.`
                    : 'We are building more ways to connect Mauritius. Explore our work or get in touch to be part of the journey.'}
                </p>
                <Link to="/contact">
                  Get in touch <ArrowRight size={14} />
                </Link>
              </div>
              <button
                type="button"
                aria-label="Dismiss platform details"
                onClick={() => setSelected(null)}
              >
                <X size={18} />
              </button>
            </div>
          )}
        </section>
      </div>
      <footer className="launcher-footer">
        <div>
          <Logo size={28} />
          <p>Technology for a stronger Mauritius.</p>
        </div>
        <Link to="/home">
          Explore MoriStack <ArrowRight size={15} />
        </Link>
      </footer>
    </div>
  )
}
