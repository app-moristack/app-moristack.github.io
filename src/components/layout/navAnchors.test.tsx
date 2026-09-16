import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderApp'
import { ecosystemProducts } from '@/data/ecosystem'
import { siteConfig } from '@/data/site.config'
import { DesktopNav } from './DesktopNav'
import { Footer } from './Footer'

/**
 * The ecosystem lives in a section of the home page rather than a route of its
 * own, so every entry point to it is an anchor. A stale "/ecosystem" href would
 * land on the 404 page.
 */
describe('ecosystem anchors', () => {
  it('sends the navigation group and its children to the home page section', () => {
    renderWithRouter(<DesktopNav />)

    const group = siteConfig.nav.find((item) => item.label === 'Ecosystem')
    expect(group?.to).toBe('/#ecosystem')

    for (const child of group?.children ?? []) {
      expect(child.to.startsWith('/#')).toBe(true)
    }
  })

  it('sends every footer platform link to its card on the home page', () => {
    renderWithRouter(<Footer />)

    for (const product of ecosystemProducts) {
      expect(screen.getByRole('link', { name: product.name })).toHaveAttribute(
        'href',
        `/#${product.slug}`,
      )
    }
  })
})
