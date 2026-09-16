import { useState, type ReactNode } from 'react'
import type { ProductBrand } from '@/data/ecosystem'
import { assetUrl } from '@/data/site.config'
import { cn } from '@/lib/cn'

const frameBorder: Record<ProductBrand, string> = {
  home: 'border-home-500/20',
  auto: 'border-auto-400/20',
}

const glow: Record<ProductBrand, string> = {
  home: 'bg-[radial-gradient(ellipse,rgba(245,176,33,0.18),transparent_70%)]',
  auto: 'bg-[radial-gradient(ellipse,rgba(148,169,191,0.2),transparent_70%)]',
}

const dot: Record<ProductBrand, string> = {
  home: 'bg-home-400/60',
  auto: 'bg-auto-300/60',
}

/**
 * A real product screenshot in a browser frame. The frame takes the file's own
 * proportions rather than cropping it to a fixed ratio, and the intrinsic size
 * reserves the box before the image arrives. Lazy, so a platform below the fold
 * never competes with the hero for bandwidth.
 *
 * A file that fails to load falls back to `fallback` rather than leaving a
 * broken image, so adding the screenshot is the only step needed to swap the
 * placeholder mockup for the real thing.
 */
export function ProductScreenshot({
  src,
  alt,
  brand,
  size,
  fallback = null,
}: {
  readonly src: string
  readonly alt: string
  readonly brand: ProductBrand
  readonly size: readonly [number, number]
  readonly fallback?: ReactNode
}) {
  const [width, height] = size
  const [failed, setFailed] = useState(false)

  if (failed) return fallback

  return (
    <div className="relative">
      <div
        className={cn(
          'overflow-hidden rounded-2xl border bg-navy-950 shadow-panel',
          frameBorder[brand],
        )}
      >
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-navy-900/80 px-3.5 py-2.5">
          <span aria-hidden="true" className={cn('size-1.5 rounded-full', dot[brand])} />
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ink-500/40" />
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ink-500/40" />
        </div>

        <img
          src={assetUrl(src)}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="block h-auto w-full"
        />
      </div>

      <div
        aria-hidden="true"
        className={cn(
          'absolute -inset-x-6 -bottom-8 -z-10 h-24 rounded-full blur-2xl',
          glow[brand],
        )}
      />
    </div>
  )
}
