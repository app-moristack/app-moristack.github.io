import { Bot, MapPin } from 'lucide-react'
import { CallToAction } from '@/components/CallToAction'
import { Seo } from '@/components/Seo'
import { Logo } from '@/components/ui/Logo'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Section'
import { aboutPoints, processSteps } from '@/data/content'
import { siteConfig } from '@/data/site.config'

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About | Freelance Web Development Studio in Mauritius | MoriStack"
        description="MoriStack is a Mauritius-based freelance web development studio building modern React and Vue.js websites and business applications with direct, personal service."
      />

      <header className="relative overflow-hidden py-14 sm:py-20">
        <div aria-hidden="true" className="ms-grid-backdrop absolute inset-0 -z-10 opacity-60" />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              A freelance development studio,{' '}
              <span className="ms-gradient-text">based in Mauritius</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              {siteConfig.businessName} is a freelance web development studio. That means you work
              directly with the person designing and building your project — no layers, no
              hand-offs, no guessing who to call when something needs changing.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-400">
              <MapPin size={15} aria-hidden="true" className="text-turquoise-500" />
              Working with businesses across {siteConfig.location}
            </p>
          </div>
        </Container>
      </header>

      <Section labelledBy="approach-heading" className="pt-0">
        <SectionHeading
          id="approach-heading"
          eyebrow="How we work"
          title="Understand the business first, then write the code"
          intro="The best technical decision is usually the one that comes after a proper conversation about how your business actually runs."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutPoints.map((point, index) => (
            <Reveal as="li" key={point.title} delay={index * 0.05} className="ms-panel p-6">
              <span
                aria-hidden="true"
                className="inline-flex size-11 items-center justify-center rounded-xl bg-turquoise-500/10 text-turquoise-400"
              >
                <point.icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink-50">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{point.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="ai-heading" className="bg-navy-900/40">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-12">
          <Reveal className="lg:pt-2">
            <span
              aria-hidden="true"
              className="inline-flex size-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400"
            >
              <Bot size={30} />
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 id="ai-heading" className="text-2xl font-extrabold sm:text-3xl">
              On AI-assisted development
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-300">
              <p>
                We use AI tooling as part of the development process, the same way we use a compiler
                or a test runner: to move faster on the mechanical parts of the work.
              </p>
              <p>
                Everything it produces is reviewed, tested and understood before it goes near your
                project. We do not ship code we cannot explain, and we do not treat generated output
                as finished work.
              </p>
              <p>
                The accountability does not change. If something breaks, you have one person to
                call, and that person knows exactly how the system was built.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="about-process-heading">
        <SectionHeading
          id="about-process-heading"
          eyebrow="The project"
          title="What working together looks like"
        />

        <ol className="mx-auto max-w-2xl space-y-3">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.step}
              delay={index * 0.05}
              className="ms-panel flex gap-5 p-5"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-turquoise-500/10 text-sm font-bold text-turquoise-400"
              >
                {step.step}
              </span>
              <span>
                <span className="block text-base font-bold text-ink-50">{step.title}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-ink-400">
                  {step.body}
                </span>
              </span>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Logo size={56} />
        </Reveal>
      </Section>

      <CallToAction
        title="Let's talk about your project"
        intro="A short conversation is usually enough to tell whether we are a good fit. There is no cost and no obligation."
      />
    </>
  )
}
