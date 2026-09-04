import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { absoluteUrl, assetUrl, siteConfig } from '@/data/site.config'

type SeoProps = {
  readonly title: string
  readonly description: string
  readonly noindex?: boolean
}

function upsertMeta(selector: string, attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.setAttribute('content', value)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.append(element)
  }
  element.href = href
}

/**
 * Client-side metadata for a hash-routed SPA. Crawlers that execute JavaScript
 * read these tags; most social scrapers do not. See the SEO notes in README.md.
 */
export function Seo({ title, description, noindex = false }: SeoProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const canonical = absoluteUrl(pathname === '/' ? '/' : `#${pathname}`)
    const image = `${siteConfig.domain.replace(/\/$/, '')}${assetUrl('brand/og-image.png')}`

    document.title = title
    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex ? 'noindex, follow' : 'index, follow',
    )
    upsertLink('canonical', canonical)

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', image)
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', siteConfig.businessName)

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)
  }, [title, description, noindex, pathname])

  return null
}
