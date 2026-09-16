import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Seo } from '@/components/Seo'
import { LauncherCard } from '@/components/home/LauncherCard'
import { Logo } from '@/components/ui/Logo'
import { assetUrl } from '@/data/site.config'
import { launcherApps } from '@/data/launcher'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import '@/styles/launcher.css'

export default function MoriStackPage() {
  const reduced = usePrefersReducedMotion()
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
            Find your home. Get moving. Live well.
            <br />
            Everyday connections, made simpler.
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
            {launcherApps.map((app, index) => (
              <LauncherCard key={app.id} app={app} index={index} />
            ))}
            <LauncherCard
              index={3}
              app={{
                id: 'soon',
                name: 'More to come.',
                tagline: 'New solutions, loading...',
                category: "What's next",
                image: null,
                color: '#65caff',
                url: null,
                description:
                  'More ways to connect Mauritius are on the way. New platforms and everyday possibilities, built for our island.',
              }}
            />
          </div>
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
