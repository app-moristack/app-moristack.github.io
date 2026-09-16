import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import type { EcosystemProduct, ProductBrand } from '@/data/ecosystem'
import { cn } from '@/lib/cn'

/**
 * Each product keeps its own brand colour, but only as an accent: the card
 * ground, type and spacing stay MoriStack so the ecosystem reads as one system.
 */
const brandVar: Record<ProductBrand, string> = {
  home: 'var(--color-home-400)',
  auto: 'var(--color-auto-300)',
}

const brandText: Record<ProductBrand, string> = {
  home: 'text-home-400',
  auto: 'text-auto-300',
}

const brandChip: Record<ProductBrand, string> = {
  home: 'border-home-500/30 bg-home-500/10 text-home-300',
  auto: 'border-auto-400/30 bg-auto-400/10 text-auto-200',
}

const brandButton: Record<ProductBrand, string> = {
  home: 'bg-home-400 text-navy-950 hover:bg-home-300',
  auto: 'bg-auto-200 text-navy-950 hover:bg-white',
}

export function ProductCard({
  product,
  visual,
  reversed = false,
}: {
  readonly product: EcosystemProduct
  readonly visual: ReactNode
  readonly reversed?: boolean
}) {
  const Icon = product.icon

  return (
    <article
      id={product.slug}
      style={{ '--ms-brand': brandVar[product.brand] } as React.CSSProperties}
      className="ms-product scroll-mt-28 p-6 sm:p-9"
    >
      <div
        className={cn(
          'grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12',
          reversed && 'lg:[&>*:first-child]:order-2',
        )}
      >
        <div>
          <p
            className={cn(
              'inline-flex items-center gap-2.5 rounded-full border px-3 py-1 text-[0.68rem] font-bold tracking-[0.16em] uppercase',
              brandChip[product.brand],
            )}
          >
            <Icon size={14} aria-hidden="true" />
            {product.category}
          </p>

          <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            {product.headline}
          </h3>

          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-300">
            {product.description}
          </p>

          <div aria-hidden="true" className="ms-product-rule mt-7" />

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
            {product.connects.map((audience) => (
              <li key={audience} className="flex items-center gap-2 text-sm text-ink-400">
                <span
                  aria-hidden="true"
                  className={cn('size-1.5 rounded-full', brandText[product.brand])}
                  style={{ backgroundColor: 'currentColor' }}
                />
                {audience}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {product.url ? (
              <a
                href={product.url}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  'group inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors',
                  brandButton[product.brand],
                )}
              >
                {product.cta}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                />
              </a>
            ) : (
              <Link
                to="/contact"
                className={cn(
                  'group inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors',
                  brandButton[product.brand],
                )}
              >
                {product.cta}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                />
              </Link>
            )}
            <span className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">
              A MoriStack platform
            </span>
          </div>
        </div>

        <div className="relative">{visual}</div>
      </div>
    </article>
  )
}
