import { ArrowRight, MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import { ButtonLink } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { Container } from '@/components/ui/Section'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'
import { RevealLine, RevealLines } from '@/components/ui/TextReveal'
import { HeroVisual } from '@/components/three/HeroVisual'
import { assurances } from '@/data/content'
import { siteConfig } from '@/data/site.config'
import { useHeroScroll } from './useHeroScroll'

export function Hero() {
  const { ref, backdropY, contentY, contentOpacity } = useHeroScroll()

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20">
      <motion.div
        aria-hidden="true"
        style={{ y: backdropY }}
        className="ms-grid-backdrop absolute inset-0 -z-20 opacity-70"
      />

      {/*
        The scene is confined to the right of the fold and covered by a scrim, so
        the headline is always read against flat navy rather than moving geometry.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <HeroVisual />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--color-navy-950)_0%,color-mix(in_oklab,var(--color-navy-950)_92%,transparent)_38%,color-mix(in_oklab,var(--color-navy-950)_35%,transparent)_58%,transparent_72%)] lg:block" />
      </div>

      <Container>
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <Stagger stagger={0.09}>
            <StaggerItem>
              <p className="ms-rule-label max-w-xs">Web studio &middot; Mauritius</p>
            </StaggerItem>

            <h1 className="mt-7 max-w-[13ch] text-hero font-extrabold lg:max-w-[11ch]">
              <RevealLines delayChildren={0.08}>
                <RevealLine>
                  Websites that <span className="ms-serif text-turquoise-400">win</span>
                </RevealLine>
                <RevealLine>
                  you <span className="ms-marker">work</span>.
                </RevealLine>
              </RevealLines>
            </h1>

            <StaggerItem>
              <p className="mt-7 max-w-lg text-lead text-ink-300">
                {siteConfig.businessName} builds fast, modern websites and custom web apps for
                businesses in Mauritius &mdash; designed to turn visitors into customers, not just
                to look busy.
              </p>
            </StaggerItem>

            <StaggerItem className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic className="max-sm:w-full">
                <ButtonLink to="/contact" size="lg" className="group max-sm:w-full">
                  Request a Free Quote
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  />
                </ButtonLink>
              </Magnetic>
              <Magnetic strength={0.22} className="max-sm:w-full">
                <ButtonLink to="/work" size="lg" variant="secondary" className="max-sm:w-full">
                  See how we build
                </ButtonLink>
              </Magnetic>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-400">
                <MapPin size={14} aria-hidden="true" className="text-turquoise-500" />
                Based in {siteConfig.location} &mdash; {siteConfig.responseTime}
              </p>
            </StaggerItem>
          </Stagger>
        </motion.div>

        <Stagger
          as="dl"
          stagger={0.08}
          delayChildren={0.15}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-cyan-400/12 pt-8 sm:grid-cols-4"
        >
          {assurances.map((item) => (
            <StaggerItem key={item.label}>
              <>
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="ms-tnum block text-2xl font-extrabold tracking-tight text-ink-50">
                    {item.value}
                  </span>
                  <span className="mt-1.5 block text-xs font-bold tracking-[0.16em] text-turquoise-400 uppercase">
                    {item.label}
                  </span>
                  <span className="mt-2 block max-w-[24ch] text-sm leading-snug text-ink-500">
                    {item.body}
                  </span>
                </dd>
              </>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
