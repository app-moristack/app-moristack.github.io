import { Bot, MapPin } from 'lucide-react'
import { CallToAction } from '@/components/CallToAction'
import { Seo } from '@/components/Seo'
import { Logo } from '@/components/ui/Logo'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Section'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'
import { aboutPoints, processSteps } from '@/data/content'
import { siteConfig } from '@/data/site.config'

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About | A Mauritian Technology Company | MoriStack"
        description="MoriStack is a Mauritian technology company building a growing ecosystem of local digital platforms alongside websites, web applications and business systems for companies in Mauritius."
      />

      <header className="relative overflow-hidden py-14 sm:py-20">
        <div aria-hidden="true" className="ms-grid-backdrop absolute inset-0 -z-10 opacity-60" />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              A technology company, <span className="ms-gradient-text">built in Mauritius</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              {siteConfig.businessName} builds digital platforms for Mauritius, and the technology
              Mauritian businesses need to grow. Both come from the same place: useful software,
              built properly.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-400">
              <MapPin size={15} aria-hidden="true" className="text-turquoise-500" />
              Working across {siteConfig.location}
            </p>
          </div>
        </Container>
      </header>

      <Section labelledBy="story-heading" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal direction="right">
            <Eyebrow>Our story</Eyebrow>
            <h2 id="story-heading" className="mt-5 text-section font-extrabold text-balance">
              It started with better software. It grew into an{' '}
              <span className="ms-serif text-turquoise-400">ecosystem</span>.
            </h2>
          </Reveal>

          <Stagger stagger={0.07} className="space-y-4 text-lead text-ink-400">
            <StaggerItem as="p">
              MoriStack began with a simple idea: build better digital products.
            </StaggerItem>
            <StaggerItem as="p">
              But while working with businesses &mdash; and looking at everyday life in Mauritius
              &mdash; we kept seeing the same thing. Useful services, skilled professionals and real
              opportunities were all here, and all difficult to find. The island is small; the
              information about it is scattered.
            </StaggerItem>
            <StaggerItem as="p">So MoriStack evolved.</StaggerItem>
            <StaggerItem as="p">
              Today we are building a growing ecosystem of Mauritian digital platforms designed to
              connect people, businesses and services.{' '}
              <strong className="font-semibold text-ink-100">MoriHome</strong> connects Mauritius
              around the home. <strong className="font-semibold text-ink-100">MoriCar</strong>{' '}
              connects Mauritius around mobility and automotive services. Both are early, and both
              are only the beginning.
            </StaggerItem>
            <StaggerItem as="p">
              Alongside our own products, we continue helping businesses design and build modern
              websites, applications and internal systems &mdash; held to exactly the same standard,
              because we have to live with the code we write.
            </StaggerItem>
            <StaggerItem>
              <p className="border-l-2 border-turquoise-500/55 pl-5 text-lead font-semibold text-ink-100">
                Useful technology. Built properly. Built for Mauritius.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      <Section labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          eyebrow="What guides us"
          title="The same principles, whoever the product is for"
          intro="Whether we are building our own platform or a system for your business, the decisions are made the same way."
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
                What it does not do is make the architectural calls. Which trade-off survives
                contact with real users, how a system should be split, what will still be
                maintainable in three years &mdash; that comes from experience, and the
                accountability stays with us. If something breaks, you have someone to call who
                knows exactly how the system was built.
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
          intro="The same five stages we run our own platform builds through."
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
        title="Let's talk about what you want to build"
        intro="A short conversation is usually enough to tell whether we are a good fit. There is no cost and no obligation."
      />
    </>
  )
}
