import { useMemo, useState } from 'react'
import { Info, SearchX } from 'lucide-react'
import { CallToAction } from '@/components/CallToAction'
import { Seo } from '@/components/Seo'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Eyebrow, Section } from '@/components/ui/Section'
import { projectCategories, projects, type ProjectCategory } from '@/data/projects'
import { cn } from '@/lib/cn'

type Filter = ProjectCategory | 'All'

export default function WorkPage() {
  const [filter, setFilter] = useState<Filter>('All')

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  const filters: readonly Filter[] = ['All', ...projectCategories]

  return (
    <>
      <Seo
        title="Our Work | Web Development Concepts | MoriStack"
        description="Concept projects from MoriStack showing how we structure restaurant websites, business management systems and membership platforms."
      />

      <header className="relative overflow-hidden py-14 sm:py-20">
        <div aria-hidden="true" className="ms-grid-backdrop absolute inset-0 -z-10 opacity-60" />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Our work</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              How we <span className="ms-gradient-text">approach a project</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              Each entry sets out the problem, what was built to solve it, and what the result
              demonstrates.
            </p>
          </div>

          <div className="mt-8 flex max-w-2xl items-start gap-3 rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-4">
            <Info size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-cyan-400" />
            <p className="text-sm leading-relaxed text-ink-300">
              Everything shown here is a concept project built to demonstrate our approach. These
              are not commercial engagements, and no client names, testimonials or business results
              are attached to them.
            </p>
          </div>
        </Container>
      </header>

      <Section labelledBy="projects-heading" className="pt-0">
        <h2 id="projects-heading" className="sr-only">
          Project list
        </h2>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-9 flex flex-wrap gap-2"
        >
          {filters.map((option) => {
            const isActive = filter === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-turquoise-500/50 bg-turquoise-500/12 text-turquoise-400'
                    : 'border-cyan-400/15 bg-navy-800/50 text-ink-300 hover:border-turquoise-500/35 hover:text-ink-50',
                )}
              >
                {option}
              </button>
            )
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'} shown
          {filter === 'All' ? '' : ` in ${filter}`}
        </p>

        {visible.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="ms-panel flex flex-col items-center gap-3 px-6 py-16 text-center">
            <SearchX size={26} aria-hidden="true" className="text-ink-500" />
            <h3 className="text-base font-bold text-ink-100">Nothing here yet</h3>
            <p className="max-w-sm text-sm text-ink-400">
              There are no projects in this category at the moment. Try another category, or get in
              touch to discuss what you have in mind.
            </p>
          </div>
        )}
      </Section>

      <CallToAction
        title="Want something like this for your business?"
        intro="Tell us about your project and we will explain how we would approach it."
      />
    </>
  )
}
