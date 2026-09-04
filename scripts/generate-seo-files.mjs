/**
 * Writes robots.txt and sitemap.xml into dist using the real deploy URL, so the
 * host and path are never hard-coded. Driven by VITE_SITE_URL and VITE_BASE_PATH,
 * the same values the build itself uses.
 */
import { writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeBasePath } from '../vite.config.ts'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

const origin = (process.env.VITE_SITE_URL || 'https://app-moristack.github.io').replace(/\/+$/, '')
const base = normalizeBasePath(process.env.VITE_BASE_PATH)
const siteUrl = `${origin}${base}`

/** Hash routes are fragments of the entry document, not separately indexable. */
const routes = [
  { path: '', changefreq: 'monthly', priority: '1.0' },
  { path: '#/services', changefreq: 'monthly', priority: '0.9' },
  { path: '#/work', changefreq: 'monthly', priority: '0.8' },
  { path: '#/about', changefreq: 'yearly', priority: '0.7' },
  { path: '#/contact', changefreq: 'yearly', priority: '0.9' },
  { path: '#/privacy', changefreq: 'yearly', priority: '0.3' },
]

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}sitemap.xml
`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated at build time by scripts/generate-seo-files.mjs. Do not edit by hand. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url><loc>${siteUrl}${route.path}</loc><changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`

await writeFile(resolve(dist, 'robots.txt'), robots, 'utf8')
await writeFile(resolve(dist, 'sitemap.xml'), sitemap, 'utf8')
console.log(`wrote dist/robots.txt and dist/sitemap.xml for ${siteUrl}`)
