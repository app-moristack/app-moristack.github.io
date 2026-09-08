import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'
import { processSteps } from '@/data/content'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

const railBase =
  'absolute top-0 bottom-0 left-[1.4375rem] w-px lg:top-[1.4375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto'

export function ProcessTimeline() {
  const railRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 82%', 'end 65%'],
  })
  const draw = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 })

  return (
    <Section labelledBy="process-heading">
      <SectionHeading
        id="process-heading"
        eyebrow="How we work"
        title={
          <>
            A clear <span className="ms-serif text-cyan-400">five-step</span> process
          </>
        }
        intro="You always know what stage the project is at, what happens next, and what is expected from you."
      />

      <div ref={railRef} className="relative">
        <span aria-hidden="true" className={`${railBase} bg-cyan-400/12`} />
        {/* scaleY drives the mobile rail and scaleX the desktop one; only one axis is ever 1px. */}
        <motion.span
          aria-hidden="true"
          style={reduced ? undefined : { scaleY: draw, scaleX: draw }}
          className={`${railBase} origin-top bg-gradient-to-b from-turquoise-500 via-cyan-500 to-coral-500 lg:origin-left lg:bg-gradient-to-r`}
        />

        <Stagger as="ol" stagger={0.09} className="grid gap-8 lg:grid-cols-5 lg:gap-5">
          {processSteps.map((step) => (
            <StaggerItem
              as="li"
              key={step.step}
              className="relative flex gap-5 lg:flex-col lg:gap-0"
            >
              <span
                aria-hidden="true"
                className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-turquoise-500/30 bg-navy-900 text-turquoise-400 shadow-[0_0_0_6px_rgba(3,17,29,1)] transition-[border-color,color,transform] duration-300 hover:scale-105 hover:border-turquoise-400 hover:text-turquoise-300"
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
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
