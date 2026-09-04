import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { whyChooseUs } from '@/data/content'

export function WhyChooseUs() {
  return (
    <Section labelledBy="why-heading" className="bg-navy-900/40">
      <SectionHeading
        id="why-heading"
        eyebrow="Why MoriStack"
        title="A developer who understands your business"
        intro="You are not buying a template. You are working directly with the person who designs, builds and supports what you launch."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item, index) => (
          <Reveal
            as="li"
            key={item.title}
            delay={index * 0.04}
            className="ms-panel group p-6 transition-colors duration-300 hover:border-turquoise-500/35"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-11 items-center justify-center rounded-xl bg-turquoise-500/10 text-turquoise-400 transition-transform duration-300 group-hover:scale-105"
            >
              <item.icon size={20} />
            </span>
            <h3 className="mt-4 text-base font-bold text-ink-50">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
