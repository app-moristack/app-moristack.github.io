import { Info } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { featuredProjects } from '@/data/projects'

export function FeaturedWork() {
  return (
    <Section labelledBy="work-heading" className="bg-navy-900/40">
      <SectionHeading
        id="work-heading"
        eyebrow="Our work"
        title="Concepts that show how we build"
        intro="Structure, interface decisions and code quality, demonstrated on realistic scenarios."
      />

      <Reveal className="mx-auto mb-10 flex max-w-2xl items-start gap-3 rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-4">
        <Info size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-cyan-400" />
        <p className="text-sm leading-relaxed text-ink-300">
          These are concept projects built to demonstrate our approach. They are not commercial
          engagements, and no client names or results are attached to them.
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.06} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <ButtonLink to="/work" variant="secondary" size="lg">
          See all our work
        </ButtonLink>
      </div>
    </Section>
  )
}
