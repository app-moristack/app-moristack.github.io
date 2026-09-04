import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { processSteps } from '@/data/content'

export function ProcessTimeline() {
  return (
    <Section labelledBy="process-heading">
      <SectionHeading
        id="process-heading"
        eyebrow="How we work"
        title="A clear five-step process"
        intro="You always know what stage the project is at, what happens next, and what is expected from you."
      />

      <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-5">
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[1.4375rem] w-px bg-gradient-to-b from-turquoise-500/40 via-cyan-500/25 to-coral-500/25 lg:top-[1.4375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:bg-gradient-to-r"
        />

        {processSteps.map((step, index) => (
          <Reveal
            as="li"
            key={step.step}
            delay={index * 0.07}
            className="relative flex gap-5 lg:flex-col lg:gap-0"
          >
            <span
              aria-hidden="true"
              className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-turquoise-500/30 bg-navy-900 text-turquoise-400 shadow-[0_0_0_6px_rgba(3,17,29,1)]"
            >
              <step.icon size={20} />
            </span>

            <div className="lg:mt-5 lg:pr-4">
              <p className="text-xs font-bold tracking-[0.16em] text-ink-500 uppercase">
                Step {step.step}
              </p>
              <h3 className="mt-1.5 text-base font-bold text-ink-50">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
