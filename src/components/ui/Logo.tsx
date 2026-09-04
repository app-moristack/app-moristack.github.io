import { assetUrl, siteConfig } from '@/data/site.config'

type LogoProps = {
  readonly size?: number
  readonly withWordmark?: boolean
  readonly className?: string
}

/**
 * Single point of use for the supplied MoriStack logo. Replace
 * public/brand/moristack-logo.png and run `npm run icons` to change the mark
 * everywhere; the served variants are generated from it.
 */
export function Logo({ size = 40, withWordmark = true, className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <picture>
        <source srcSet={assetUrl('brand/logo-mark.webp')} type="image/webp" />
        <img
          src={assetUrl('brand/logo-mark.png')}
          alt=""
          width={size}
          height={size}
          decoding="async"
          className="shrink-0"
          style={{ width: size, height: size }}
        />
      </picture>
      {withWordmark ? (
        <span className="text-[1.0625rem] font-extrabold tracking-tight">
          <span className="text-ink-50">Mori</span>
          <span className="text-turquoise-500">Stack</span>
        </span>
      ) : (
        <span className="sr-only">{siteConfig.businessName}</span>
      )}
    </span>
  )
}
