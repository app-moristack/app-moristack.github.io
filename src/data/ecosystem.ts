import type { LucideIcon } from 'lucide-react'
import { Car, House } from 'lucide-react'

export type ProductBrand = 'home' | 'auto'

export type EcosystemProduct = {
  readonly slug: string
  readonly name: string
  readonly category: string
  readonly headline: string
  readonly description: string
  readonly brand: ProductBrand
  readonly icon: LucideIcon
  readonly cta: string
  readonly url: string | null
  /**
   * Path under the public directory, resolved through assetUrl(). Null falls
   * back to the platform's CSS mockup, so a missing file degrades rather than
   * leaving a broken image in the card.
   */
  readonly screenshot: string | null
  readonly screenshotAlt: string
  /** Intrinsic pixel size of the screenshot, so the card reserves its exact box. */
  readonly screenshotSize: readonly [number, number]
  /** What the platform connects, shown as the card's connection strip. */
  readonly connects: readonly string[]
}

/**
 * The platforms MoriStack runs itself. Nothing speculative belongs here — the
 * "more coming" card carries the future without naming products that do not
 * exist.
 */
export const ecosystemProducts: readonly EcosystemProduct[] = [
  {
    slug: 'morihome',
    name: 'MoriHome',
    category: 'Home & Construction',
    headline: 'Find the right people for the job.',
    description:
      'Discover construction, renovation and home-service professionals across Mauritius — and give local tradespeople a place to be found.',
    brand: 'home',
    icon: House,
    cta: 'Discover MoriHome',
    url: null,
    screenshot: 'ecosystem/morihome.png',
    screenshotAlt:
      'The MoriHome homepage, showing the search for local home-service professionals across Mauritius',
    screenshotSize: [1258, 638],
    connects: ['Homeowners', 'Tradespeople', 'Contractors', 'Suppliers'],
  },
  {
    slug: 'moricar',
    name: 'MoriCar',
    category: 'Automotive',
    headline: 'Connecting Mauritius on the road.',
    description:
      'Discover cars for sale and connect with showrooms, private sellers and automotive professionals across Mauritius.',
    brand: 'auto',
    icon: Car,
    cta: 'Discover MoriCar',
    url: null,
    screenshot: null,
    screenshotAlt:
      'The MoriCar homepage, showing car listings and automotive services across Mauritius',
    screenshotSize: [1258, 638],
    connects: ['Buyers', 'Private sellers', 'Showrooms', 'Garages'],
  },
]

export const productBySlug = (slug: string) =>
  ecosystemProducts.find((product) => product.slug === slug)
