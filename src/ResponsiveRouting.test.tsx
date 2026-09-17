import { act, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import userEvent from '@testing-library/user-event'
import { App } from './App'
const MOBILE_QUERY = '(max-width: 767px)'

function mockViewport(initialMobile: boolean) {
  let mobile = initialMobile
  const listeners = new Set<() => void>()
  vi.stubGlobal('matchMedia', (query: string) => ({
    get matches() {
      return query === MOBILE_QUERY && mobile
    },
    media: query,
    addEventListener: (_: string, listener: () => void) => {
      if (query === MOBILE_QUERY) listeners.add(listener)
    },
    removeEventListener: (_: string, listener: () => void) => {
      listeners.delete(listener)
    },
  }))
  return (value: boolean) =>
    act(() => {
      mobile = value
      listeners.forEach((listener) => listener())
    })
}

const renderRoute = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
const heading = (launcher: boolean) =>
  launcher ? /A More\s*Connected\s*Mauritius/i : /Building a more connected Mauritius/i

describe('responsive landing and explicit pages', () => {
  it.each([
    [true, '/', true],
    [false, '/', true],
    [true, '/home', false],
    [false, '/home', false],
    [true, '/moristack', true],
    [false, '/moristack', true],
  ] as const)(
    'mobile=%s route=%s displays launcher=%s with the matching active link',
    async (mobile, path, launcher) => {
      mockViewport(mobile)
      renderRoute(path)
      expect(
        await screen.findByRole(
          'heading',
          { level: 1, name: heading(launcher) },
          { timeout: 5000 },
        ),
      ).toBeInTheDocument()
      const nav = within(screen.getByRole('navigation', { name: 'Main' }))
      expect(nav.getByRole('link', { name: launcher ? 'MoriStack' : 'Home' })).toHaveAttribute(
        'aria-current',
        'page',
      )
      expect(nav.getByRole('link', { name: launcher ? 'Home' : 'MoriStack' })).not.toHaveAttribute(
        'aria-current',
      )
    },
  )

  it('keeps the MoriStack page and active link when the viewport crosses the breakpoint', async () => {
    const resize = mockViewport(false)
    renderRoute('/')
    await screen.findByRole('heading', { level: 1, name: heading(true) })
    resize(true)
    await screen.findByRole('heading', { level: 1, name: heading(true) })
    expect(
      within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', {
        name: 'MoriStack',
      }),
    ).toHaveAttribute('aria-current', 'page')
    resize(false)
    await screen.findByRole('heading', { level: 1, name: heading(true) })
  })

  it('keeps existing homepage section links working on mobile', async () => {
    mockViewport(true)
    renderRoute('/#ecosystem')
    await screen.findByRole('heading', { level: 1, name: heading(false) })
    expect(document.getElementById('ecosystem')).toBeInTheDocument()
  })

  it('opens the preserved homepage from the mobile overlay and closes the overlay', async () => {
    mockViewport(true)
    const user = userEvent.setup()
    renderRoute('/')
    await screen.findByRole('heading', { level: 1, name: heading(true) })
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    const dialog = screen.getByRole('dialog', { name: 'Site navigation' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    await user.click(within(dialog).getByRole('link', { name: 'Home' }))
    await screen.findByRole('heading', { level: 1, name: heading(false) })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
