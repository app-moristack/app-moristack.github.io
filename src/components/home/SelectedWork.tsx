import { ArrowRight, Info } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { latestProject, projects } from '@/data/projects'

export function SelectedWork() {
  return (
    <Section labelledBy="work-heading" className="bg-navy-900/40">
      <SectionHeading
        id="work-heading"
        eyebrow="Projects"
        title={
          <>
            Products &amp; work we&rsquo;ve{' '}
            <span className="ms-serif text-turquoise-400">built</span>
          </>
        }
        intro="The platforms we run ourselves, and the client projects that show how we structure a build."
      />

      <Reveal>
        <ProjectCard project={latestProject} variant="flagship" />
      </Reveal>

      {/* The disclaimer only belongs here while the preview is a concept build. */}
      {latestProject.kind === 'client' ? (
        <Reveal
          delay={0.08}
          className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-4"
        >
          <Info size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-cyan-400" />
          <p className="text-sm leading-relaxed text-ink-300">
            This is a concept project built to demonstrate our approach. It is not a commercial
            engagement, and no client names or results are attached to it.
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.12} className="mt-10 text-center">
        <Magnetic strength={0.24}>
          <ButtonLink to="/work" variant="secondary" size="lg" className="group">
            View all {projects.length} projects
            <ArrowRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            />
          </ButtonLink>
        </Magnetic>
      </Reveal>
    </Section>
  )
}
