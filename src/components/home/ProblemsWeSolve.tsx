import { ArrowRight, Check, FileSpreadsheet, MessagesSquare, Printer } from 'lucide-react'
import { motion } from 'motion/react'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'
import { manualVsSystem, problemBenefits } from '@/data/content'
import { easeOutSoft, viewportOnce } from '@/lib/motion'

const manualIcons = [FileSpreadsheet, Printer, MessagesSquare]

export function ProblemsWeSolve() {
  return (
    <Section labelledBy="problems-heading" className="relative">
      <SectionHeading
        id="problems-heading"
        eyebrow="The problem"
        title={
          <>
            Still managing your business <span className="ms-serif text-coral-400">by hand</span>?
          </>
        }
        intro="Spreadsheets, paperwork and scattered messages work until they do not. We turn them into one clear, centralised system your whole team can rely on."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <Reveal direction="right" className="ms-panel p-6 sm:p-7">
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
          <Stagger as="ul" stagger={0.06} delayChildren={0.15} className="mt-6 space-y-3.5">
            {manualVsSystem.map((row) => (
              <StaggerItem
                as="li"
                key={row.before}
                className="flex items-start gap-3 text-sm text-ink-400"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink-500"
                />
                {row.before}
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <div className="flex justify-center lg:px-2" aria-hidden="true">
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.25, duration: 0.5, ease: easeOutSoft }}
            className="inline-flex size-12 rotate-90 items-center justify-center rounded-full border border-turquoise-500/30 bg-turquoise-500/10 text-turquoise-400 lg:rotate-0"
          >
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </motion.span>
        </div>

        <Reveal
          direction="left"
          className="ms-panel border-turquoise-500/25 bg-gradient-to-br from-turquoise-500/8 to-cyan-500/5 p-6 sm:p-7"
        >
          <h3 className="text-sm font-bold tracking-[0.12em] text-turquoise-400 uppercase">
            With MoriStack
          </h3>
          <Stagger as="ul" stagger={0.06} delayChildren={0.3} className="mt-6 space-y-3.5">
            {manualVsSystem.map((row) => (
              <StaggerItem
                as="li"
                key={row.after}
                className="flex items-start gap-3 text-sm text-ink-100"
              >
                <Check
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-turquoise-400"
                />
                {row.after}
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>

      <Stagger as="ul" stagger={0.06} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {problemBenefits.map((benefit) => (
          <StaggerItem as="li" key={benefit.title} className="ms-panel p-5 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-turquoise-500/30">
            <div>
              <benefit.icon size={19} aria-hidden="true" className="text-turquoise-400" />
              <h3 className="mt-3.5 text-sm font-bold text-ink-50">{benefit.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{benefit.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
