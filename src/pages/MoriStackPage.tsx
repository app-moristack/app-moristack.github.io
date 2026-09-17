import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Seo } from '@/components/Seo'
import { LauncherCard } from '@/components/home/LauncherCard'
import { Logo } from '@/components/ui/Logo'
import { ConnectedHero } from '@/components/home/ConnectedHero'
import { launcherApps } from '@/data/launcher'
import '@/styles/launcher.css'

export default function MoriStackPage() {
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
        description="Your gateway to the MoriStack ecosystem. Explore MoriHome and MoriCar — digital platforms for a more connected Mauritius."
      />
      <div className="launcher-layout">
        <ConnectedHero />

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
              index={launcherApps.length}
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
