import { ExternalLink, ImageOff } from 'lucide-react'
import { SocialIcon } from '@/components/ui/SocialIcon'
import type { Project } from '@/data/projects'
import { assetUrl } from '@/data/site.config'
import { cn } from '@/lib/cn'

const statusStyles: Record<Project['status'], string> = {
  Concept: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-400',
  'Sample Work': 'border-turquoise-500/30 bg-turquoise-500/10 text-turquoise-400',
  'Client Project': 'border-coral-500/30 bg-coral-500/10 text-coral-400',
}

export function ProjectCard({ project }: { readonly project: Project }) {
  return (
    <article className="ms-panel group flex h-full flex-col overflow-hidden transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-turquoise-500/35">
      <div className="relative aspect-16/10 overflow-hidden bg-navy-800/70">
        {project.screenshot ? (
          <img
            src={assetUrl(project.screenshot)}
            alt={project.screenshotAlt}
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(41,189,240,0.12),transparent_65%)] text-ink-500">
            <ImageOff size={22} aria-hidden="true" />
            <p className="px-6 text-center text-xs">Screenshot coming soon</p>
          </div>
        )}

        <span
          className={cn(
            'absolute top-3 right-3 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold',
            statusStyles[project.status],
          )}
        >
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-bold text-ink-50">{project.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-400">{project.description}</p>

        <dl className="mt-5 space-y-3 border-t border-cyan-400/10 pt-5 text-sm">
          <div>
            <dt className="text-xs font-bold tracking-[0.12em] text-coral-400 uppercase">
              Problem
            </dt>
            <dd className="mt-1 text-ink-400">{project.problem}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold tracking-[0.12em] text-cyan-400 uppercase">
              Solution
            </dt>
            <dd className="mt-1 text-ink-400">{project.solution}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold tracking-[0.12em] text-turquoise-400 uppercase">
              Outcome
            </dt>
            <dd className="mt-1 text-ink-400">{project.outcome}</dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-cyan-400/15 bg-navy-800/60 px-2.5 py-1 text-[0.7rem] font-medium text-ink-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.liveUrl || project.sourceUrl ? (
          <div className="mt-5 flex flex-wrap gap-4 border-t border-cyan-400/10 pt-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-turquoise-400 hover:underline"
              >
                <ExternalLink size={14} aria-hidden="true" />
                View {project.title} live
              </a>
            ) : null}
            {project.sourceUrl ? (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-300 hover:underline"
              >
                <SocialIcon name="github" size={14} />
                Source code for {project.title}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}
