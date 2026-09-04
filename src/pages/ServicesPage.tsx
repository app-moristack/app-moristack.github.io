import { ArrowRight, Check, Target, Users } from 'lucide-react'
import { CallToAction } from '@/components/CallToAction'
import { Seo } from '@/components/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Eyebrow, Section } from '@/components/ui/Section'
import { services, type ServiceAccent } from '@/data/services'
import { cn } from '@/lib/cn'

const accentText: Record<ServiceAccent, string> = {
  turquoise: 'text-turquoise-400',
  cyan: 'text-cyan-400',
  coral: 'text-coral-400',
}

const accentBg: Record<ServiceAccent, string> = {
  turquoise: 'bg-turquoise-500/10 text-turquoise-400',
  cyan: 'bg-cyan-500/10 text-cyan-400',
  coral: 'bg-coral-500/10 text-coral-400',
}

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services | Web Development & Custom Web Apps | MoriStack"
        description="Business websites, custom web applications, restaurant websites and digital menus, booking platforms, management systems, redesign and maintenance — built in Mauritius."
      />

      <header className="relative overflow-hidden py-14 sm:py-20">
        <div aria-hidden="true" className="ms-grid-backdrop absolute inset-0 -z-10 opacity-60" />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Services</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              Built around <span className="ms-gradient-text">what your business needs</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              Every service below starts the same way: understanding the problem you are actually
              trying to solve, then choosing the simplest thing that solves it well.
            </p>
          </div>

          <nav aria-label="Services on this page" className="mt-9">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-cyan-400/18 bg-navy-800/50 px-4 text-sm font-medium text-ink-300 transition-colors hover:border-turquoise-500/45 hover:text-turquoise-400"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </header>

      {services.map((service, index) => (
        <Section
          key={service.slug}
          id={service.slug}
          labelledBy={`${service.slug}-heading`}
          className={cn('scroll-mt-28', index % 2 === 1 && 'bg-navy-900/40')}
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Reveal>
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex size-14 items-center justify-center rounded-2xl',
                  accentBg[service.accent],
                )}
              >
                <service.icon size={26} />
              </span>
              <h2
                id={`${service.slug}-heading`}
                className="mt-5 text-2xl font-extrabold sm:text-3xl"
              >
                {service.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-300">{service.summary}</p>

              <div className="mt-7 space-y-5">
                <div>
                  <h3 className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.1em] text-ink-500 uppercase">
                    <Users size={14} aria-hidden="true" />
                    Who it is for
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{service.audience}</p>
                </div>

                <div>
                  <h3 className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.1em] text-ink-500 uppercase">
                    <Target size={14} aria-hidden="true" />
                    The problem it solves
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{service.problem}</p>
                </div>
              </div>

              <ButtonLink to="/contact" className="mt-8">
                {service.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
            </Reveal>

            <Reveal delay={0.1} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="ms-panel p-6">
                <h3 className="text-sm font-bold tracking-[0.1em] text-ink-500 uppercase">
                  What may be included
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink-300">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-400/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ms-panel border-turquoise-500/20 bg-gradient-to-br from-turquoise-500/6 to-transparent p-6">
                <h3
                  className={cn(
                    'text-sm font-bold tracking-[0.1em] uppercase',
                    accentText[service.accent],
                  )}
                >
                  Business benefits
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {service.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink-300">
                      <Check
                        size={15}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-turquoise-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>
      ))}

      <Container>
        <p className="rounded-xl border border-cyan-400/15 bg-navy-900/60 p-5 text-sm leading-relaxed text-ink-400">
          <strong className="text-ink-200 font-semibold">A note on this website.</strong> The site
          you are reading is a static application with no backend, so it does not itself run a
          booking calendar or a management system. Those are built as separate applications for
          clients, with the server-side components each one requires.
        </p>
      </Container>

      <CallToAction
        title="Not sure which one you need?"
        intro="Describe the problem in your own words. We will tell you what would solve it and roughly what it takes."
      />
    </>
  )
}
