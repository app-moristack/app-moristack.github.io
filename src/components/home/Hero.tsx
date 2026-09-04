import { ArrowRight, MapPin } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { Container } from '@/components/ui/Section'
import { HeroVisual } from '@/components/three/HeroVisual'
import { siteConfig } from '@/data/site.config'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-20">
      <div aria-hidden="true" className="ms-grid-backdrop absolute inset-0 -z-20 opacity-70" />

      {/*
        The scene is confined to the right of the fold and covered by a scrim, so
        the headline is always read against flat navy rather than moving geometry.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <HeroVisual />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--color-navy-950)_0%,color-mix(in_oklab,var(--color-navy-950)_88%,transparent)_30%,color-mix(in_oklab,var(--color-navy-950)_30%,transparent)_50%,transparent_66%)] lg:block" />
      </div>

      <Container>
        <div className="relative max-w-2xl lg:max-w-xl">
          <Logo size={52} />

          <h1 className="mt-7 text-[2.5rem] leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Websites &amp; Web Apps <span className="ms-gradient-text">Built for Growth</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
            {siteConfig.businessName} creates modern websites and custom digital solutions that help
            businesses work smarter, reach more customers and grow.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to="/contact" size="lg">
              Request a Free Quote
              <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/services" size="lg" variant="secondary">
              Explore Our Services
            </ButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <p className="font-medium text-ink-300">
              React &bull; Vue.js &bull; Modern Web Solutions
            </p>
            <p className="inline-flex items-center gap-1.5 text-ink-400">
              <MapPin size={14} aria-hidden="true" className="text-turquoise-500" />
              Based in {siteConfig.location}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
