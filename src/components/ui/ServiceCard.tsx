import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import type { Service, ServiceAccent } from '@/data/services'
import { cn } from '@/lib/cn'

const accentRing: Record<ServiceAccent, string> = {
  turquoise: 'group-hover:border-turquoise-500/45 group-hover:shadow-glow-turquoise',
  cyan: 'group-hover:border-cyan-400/45 group-hover:shadow-[0_0_0_1px_rgba(41,189,240,0.22),0_18px_50px_-20px_rgba(41,189,240,0.45)]',
  coral: 'group-hover:border-coral-500/45 group-hover:shadow-glow-coral',
}

const accentIcon: Record<ServiceAccent, string> = {
  turquoise: 'bg-turquoise-500/12 text-turquoise-400',
  cyan: 'bg-cyan-500/12 text-cyan-400',
  coral: 'bg-coral-500/12 text-coral-400',
}

export function ServiceCard({ service }: { readonly service: Service }) {
  const Icon = service.icon

  return (
    <Link
      to={`/services#${service.slug}`}
      className={cn(
        'ms-panel group flex h-full flex-col p-6 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1',
        accentRing[service.accent],
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
          accentIcon[service.accent],
        )}
      >
        <Icon size={22} />
      </span>

      <h3 className="mt-5 text-lg font-bold text-ink-50">{service.title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-400">{service.summary}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-turquoise-400">
        Learn more
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  )
}
