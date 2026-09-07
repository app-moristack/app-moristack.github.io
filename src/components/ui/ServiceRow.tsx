import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import type { Service, ServiceAccent } from '@/data/services'
import { cn } from '@/lib/cn'

const accentText: Record<ServiceAccent, string> = {
  turquoise: 'group-hover:text-turquoise-400',
  cyan: 'group-hover:text-cyan-400',
  coral: 'group-hover:text-coral-400',
}

const accentWash: Record<ServiceAccent, string> = {
  turquoise: 'from-turquoise-500/8',
  cyan: 'from-cyan-500/8',
  coral: 'from-coral-500/8',
}

/**
 * An editorial index row rather than a card: the numeral carries the hierarchy
 * and the hairline rules carry the rhythm, so a list of services reads as a
 * contents page instead of another grid of tiles.
 */
export function ServiceRow({
  service,
  index,
}: {
  readonly service: Service
  readonly index: number
}) {
  const Icon = service.icon

  return (
    <Link
      to={`/services#${service.slug}`}
      className="group relative flex items-baseline gap-5 border-t border-cyan-400/12 py-7 sm:gap-8 sm:py-9"
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 inset-y-px -z-10 rounded-lg bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          accentWash[service.accent],
        )}
      />

      <span
        aria-hidden="true"
        className="ms-tnum w-10 shrink-0 text-sm font-bold text-ink-500 transition-colors duration-300 group-hover:text-ink-300 sm:w-14 sm:text-base"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-3">
          <Icon
            size={19}
            aria-hidden="true"
            className={cn(
              'shrink-0 text-ink-500 transition-colors duration-300',
              accentText[service.accent],
            )}
          />
          <span
            className={cn(
              'text-xl font-extrabold tracking-tight text-ink-50 transition-colors duration-300 sm:text-2xl',
              accentText[service.accent],
            )}
          >
            {service.title}
          </span>
        </span>
        <span className="mt-2.5 block max-w-xl text-sm leading-relaxed text-ink-400 sm:text-[0.9375rem]">
          {service.summary}
        </span>
      </span>

      <ArrowUpRight
        size={22}
        aria-hidden="true"
        className={cn(
          'mt-1 hidden shrink-0 self-start text-ink-500 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block',
          accentText[service.accent],
        )}
      />
    </Link>
  )
}
