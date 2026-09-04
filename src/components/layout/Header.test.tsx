import { describe, expect, it } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '@/test/renderApp'
import { siteConfig } from '@/data/site.config'
import { Header } from './Header'

describe('Header', () => {
  it('renders a link for every configured navigation entry', () => {
    renderWithRouter(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Main' })

    for (const link of siteConfig.nav) {
      expect(within(nav).getByRole('link', { name: link.label })).toBeInTheDocument()
    }
  })

  it('marks the current route as the active page', () => {
    renderWithRouter(<Header />, ['/services'])
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(within(nav).getByRole('link', { name: 'Services' })).toHaveClass('text-turquoise-400')
  })

  it('always offers the quote call to action', () => {
    renderWithRouter(<Header />)
    expect(screen.getAllByRole('link', { name: 'Request a Quote' }).length).toBeGreaterThan(0)
  })
})

describe('mobile menu', () => {
  it('is closed until the toggle is pressed', () => {
    renderWithRouter(<Header />)

    const toggle = screen.getByRole('button', { name: 'Open menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument()
  })

  it('opens, exposes the navigation, and closes again', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' })
    expect(within(mobileNav).getByRole('link', { name: 'Contact' })).toBeInTheDocument()

    const closeButton = screen.getByRole('button', { name: 'Close menu' })
    expect(closeButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(closeButton)
    await waitFor(() =>
      expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument(),
    )
  })

  it('closes on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)

    const toggle = screen.getByRole('button', { name: 'Open menu' })
    await user.click(toggle)
    await user.keyboard('{Escape}')

    await waitFor(() =>
      expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument(),
    )
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus()
  })

  it('controls the panel it announces via aria-controls', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)

    const toggle = screen.getByRole('button', { name: 'Open menu' })
    const controlledId = toggle.getAttribute('aria-controls')
    await user.click(toggle)

    expect(document.getElementById(controlledId ?? '')).toBeInTheDocument()
  })
})
