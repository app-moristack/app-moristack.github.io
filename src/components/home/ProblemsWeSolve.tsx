import { ArrowRight, Check, FileSpreadsheet, MessagesSquare, Printer } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { manualVsSystem, problemBenefits } from '@/data/content'

const manualIcons = [FileSpreadsheet, Printer, MessagesSquare]

export function ProblemsWeSolve() {
  return (
    <Section labelledBy="problems-heading" className="relative">
      <SectionHeading
        id="problems-heading"
        eyebrow="The problem"
        title="Still Managing Your Business Manually?"
        intro="Spreadsheets, paperwork and scattered messages work until they do not. We turn them into one clear, centralised system your whole team can rely on."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <Reveal className="ms-panel p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex gap-1.5">
              {manualIcons.map((Icon, index) => (
                <span
                  key={index}
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-navy-700/50 text-ink-500"
                >
                  <Icon size={16} />
                </span>
              ))}
            </span>
            <h3 className="text-sm font-bold tracking-[0.12em] text-ink-400 uppercase">Today</h3>
          </div>
          <ul className="mt-6 space-y-3.5">
            {manualVsSystem.map((row) => (
              <li key={row.before} className="flex items-start gap-3 text-sm text-ink-400">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink-500"
                />
                {row.before}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center lg:px-2" aria-hidden="true">
          <span className="inline-flex size-12 rotate-90 items-center justify-center rounded-full border border-turquoise-500/30 bg-turquoise-500/10 text-turquoise-400 lg:rotate-0">
            <ArrowRight size={20} />
          </span>
        </Reveal>

        <Reveal
          delay={0.15}
          className="ms-panel border-turquoise-500/25 bg-gradient-to-br from-turquoise-500/8 to-cyan-500/5 p-6 sm:p-7"
        >
          <h3 className="text-sm font-bold tracking-[0.12em] text-turquoise-400 uppercase">
            With MoriStack
          </h3>
          <ul className="mt-6 space-y-3.5">
            {manualVsSystem.map((row) => (
              <li key={row.after} className="flex items-start gap-3 text-sm text-ink-100">
                <Check
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-turquoise-400"
                />
                {row.after}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {problemBenefits.map((benefit, index) => (
          <Reveal as="li" key={benefit.title} delay={index * 0.04} className="ms-panel p-5">
            <benefit.icon size={19} aria-hidden="true" className="text-turquoise-400" />
            <h3 className="mt-3.5 text-sm font-bold text-ink-50">{benefit.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{benefit.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
