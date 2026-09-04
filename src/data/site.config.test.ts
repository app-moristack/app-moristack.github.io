import { describe, expect, it } from 'vitest'
import { absoluteUrl, assetUrl, mailtoLink, siteConfig } from './site.config'
import { services } from './services'
import { projectCategories, projects } from './projects'

describe('site configuration', () => {
  it('carries the known business details', () => {
    expect(siteConfig.businessName).toBe('MoriStack')
    expect(siteConfig.email).toBe('moristack@gmail.com')
    expect(siteConfig.location).toBe('Mauritius')
  })

  it('exposes every navigation destination the header renders', () => {
    expect(siteConfig.nav.map((link) => link.to)).toEqual([
      '/',
      '/services',
      '/work',
      '/about',
      '/contact',
    ])
  })

  it('invents no social media URLs', () => {
    for (const social of siteConfig.socials) {
      expect(social.url === null || social.url.startsWith('https://')).toBe(true)
    }
  })

  it('builds asset URLs under the configured base path', () => {
    expect(assetUrl('brand/moristack-logo.png')).toBe(
      `${siteConfig.basePath.replace(/\/$/, '')}/brand/moristack-logo.png`,
    )
    expect(assetUrl('/leading-slash.png')).not.toContain('//leading')
  })

  it('builds absolute URLs and mailto links', () => {
    expect(absoluteUrl('/')).toMatch(/^https?:\/\//)
    expect(mailtoLink('Quote request')).toBe('mailto:moristack@gmail.com?subject=Quote%20request')
  })

  it('keeps the slash before a hash route so the canonical names the right document', () => {
    const url = absoluteUrl('#/services')
    expect(url).toContain('/#/services')
    expect(url).not.toMatch(/[^/]#\/services/)
  })

  it('never emits a doubled slash in an absolute URL path', () => {
    for (const path of ['/', '#/services', '#/contact']) {
      expect(absoluteUrl(path).replace(/^https?:\/\//, '')).not.toContain('//')
    }
  })
})

describe('content data', () => {
  it('defines six services with unique slugs', () => {
    expect(services).toHaveLength(6)
    expect(new Set(services.map((service) => service.slug)).size).toBe(6)
  })

  it('gives every service the copy the services page renders', () => {
    for (const service of services) {
      expect(service.audience.length).toBeGreaterThan(0)
      expect(service.problem.length).toBeGreaterThan(0)
      expect(service.includes.length).toBeGreaterThan(0)
      expect(service.benefits.length).toBeGreaterThan(0)
    }
  })

  it('marks every project as a concept rather than a client engagement', () => {
    expect(projects.length).toBeGreaterThan(0)
    for (const project of projects) {
      expect(project.status).toBe('Concept')
      expect(projectCategories).toContain(project.category)
    }
  })
})
