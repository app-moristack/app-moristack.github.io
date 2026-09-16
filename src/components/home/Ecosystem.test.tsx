import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderApp'
import { ecosystemProducts } from '@/data/ecosystem'
import { Ecosystem } from './Ecosystem'

describe('Ecosystem section', () => {
  it('presents every platform with its category, headline and call to action', () => {
    renderWithRouter(<Ecosystem />)

    for (const product of ecosystemProducts) {
      const card = document.getElementById(product.slug)
      expect(card).not.toBeNull()

      const scope = within(card as HTMLElement)
      expect(scope.getByText(product.category)).toBeInTheDocument()
      expect(scope.getByRole('heading', { name: product.headline })).toBeInTheDocument()
      expect(scope.getByRole('link', { name: new RegExp(product.cta, 'i') })).toBeInTheDocument()
    }
  })

  it('points a platform without a live site at the contact route rather than inventing one', () => {
    renderWithRouter(<Ecosystem />)

    for (const product of ecosystemProducts.filter((entry) => entry.url === null)) {
      expect(screen.getByRole('link', { name: new RegExp(product.cta, 'i') })).toHaveAttribute(
        'href',
        '/contact',
      )
    }
  })

  it('promises no unbuilt product alongside the platforms that exist', () => {
    renderWithRouter(<Ecosystem />)

    expect(
      screen.getByRole('heading', { name: /More connections are coming/i }),
    ).toBeInTheDocument()
    expect(screen.queryByText(/coming soon|launching|Mori(?!Home|Car|Stack)\w+/i)).toBeNull()
  })
})
