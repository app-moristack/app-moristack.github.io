import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { technologies, technologyBenefits } from '@/data/content'

export function Technologies() {
  return (
    <Section labelledBy="tech-heading">
      <SectionHeading
        id="tech-heading"
        eyebrow="Technology"
        title="Built on tools that stay maintainable"
        intro="We choose established, well-supported technology so your project can be extended in two years, not rewritten."
      />

      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <ul className="grid gap-3 sm:grid-cols-2">
          {technologies.map((tech, index) => (
            <Reveal
              as="li"
              key={tech.name}
              delay={index * 0.04}
              className="ms-panel flex gap-4 p-4"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400"
              >
                <tech.icon size={18} />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink-50">{tech.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-400">{tech.body}</span>
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal
          delay={0.1}
          className="ms-panel h-fit border-turquoise-500/22 bg-gradient-to-br from-turquoise-500/8 to-transparent p-6 sm:p-7"
        >
          <h3 className="text-lg font-bold text-ink-50">What this means for you</h3>
          <ul className="mt-5 space-y-3.5">
            {technologyBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-ink-300">
                <Check
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-turquoise-400"
                />
                {benefit}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
