import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderApp'
import { ecosystemProducts } from '@/data/ecosystem'
import { DesktopNav } from './DesktopNav'
import { Footer } from './Footer'

/**
 * The ecosystem lives in a section of the home page rather than a route of its
 * own, so every entry point to it is an anchor. A stale "/ecosystem" href would
 * land on the 404 page.
 */
describe('ecosystem anchors', () => {
  it('links directly to the home page without an ecosystem submenu', () => {
    renderWithRouter(<DesktopNav />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home')
    expect(screen.queryByRole('button', { name: 'Home menu' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ecosystem menu' })).not.toBeInTheDocument()
  })

  it('sends every footer platform link to its card on the home page', () => {
    renderWithRouter(<Footer />)

    for (const product of ecosystemProducts) {
      expect(screen.getByRole('link', { name: product.name })).toHaveAttribute(
        'href',
        `/home#${product.slug}`,
      )
    }
  })
})
