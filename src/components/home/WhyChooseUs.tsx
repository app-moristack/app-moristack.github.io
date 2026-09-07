import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { whyChooseUs } from '@/data/content'

export function WhyChooseUs() {
  return (
    <Section labelledBy="why-heading" className="ms-ground-sand">
      <SectionHeading
        id="why-heading"
        align="left"
        eyebrow="Why MoriStack"
        title={
          <>
            You are not buying a <span className="ms-serif text-coral-400">template</span>.
          </>
        }
        intro="You work directly with the person who designs, builds and supports what you launch — and that changes what you get."
      />

      <ul className="grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index * 0.03} className="group">
            <span
              aria-hidden="true"
              className="ms-tnum text-xs font-bold tracking-[0.18em] text-coral-400/70"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2.5 flex items-center gap-2.5 text-base font-bold text-ink-50">
              <item.icon size={17} aria-hidden="true" className="shrink-0 text-turquoise-400" />
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
