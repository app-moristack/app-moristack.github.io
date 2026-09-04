import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { App } from './App'

const renderRoute = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

describe('routing', () => {
  it('renders the home page at the index route', async () => {
    renderRoute('/')
    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /Websites & Web Apps Built for Growth/i,
      }),
    ).toBeInTheDocument()
  })

  it.each([
    ['/services', /Built around what your business needs/i],
    ['/work', /How we approach a project/i],
    ['/about', /A freelance development studio/i],
    ['/contact', /Request a free quote/i],
    ['/privacy', /Privacy Policy/i],
  ])('renders %s', async (path, heading) => {
    renderRoute(path)
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('renders the custom 404 page for an unknown route', async () => {
    renderRoute('/this-route-does-not-exist')
    expect(
      await screen.findByRole('heading', { level: 1, name: /This page does not exist/i }),
    ).toBeInTheDocument()
  })

  it('exposes a skip link and a focusable main landmark', async () => {
    renderRoute('/')
    await waitFor(() => expect(screen.getByRole('main')).toBeInTheDocument())

    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main')
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1')
  })

  it('shows the current year in the footer copyright', async () => {
    renderRoute('/')
    const year = String(new Date().getFullYear())
    await waitFor(() =>
      expect(screen.getByText(new RegExp(`${year} MoriStack`))).toBeInTheDocument(),
    )
  })
})
