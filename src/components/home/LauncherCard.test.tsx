import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { LauncherCard, type LauncherProduct } from './LauncherCard'

const app: LauncherProduct = {
  id: 'moricar',
  name: 'MoriCar',
  tagline: 'Buy. Sell. Maintain. Drive.',
  category: 'On the road',
  image: 'car',
  color: '#ff6c85',
  url: null,
  description: 'Cars, showrooms and automotive services, brought together.',
}

describe('launcher card interactions', () => {
  it('flips on click and returns to the artwork on Escape or a second click', async () => {
    const user = userEvent.setup()
    render(<LauncherCard app={app} index={0} />)
    const flip = screen.getByRole('button', { name: 'About MoriCar' })
    expect(flip).toHaveAttribute('aria-pressed', 'false')
    await user.click(flip)
    expect(flip).toHaveAttribute('aria-pressed', 'true')
    expect(flip).toHaveAccessibleDescription(app.description)
    await user.keyboard('{Escape}')
    expect(flip).toHaveAttribute('aria-pressed', 'false')
    await user.keyboard('{Enter}')
    expect(flip).toHaveAttribute('aria-pressed', 'true')
    await user.click(flip)
    expect(flip).toHaveAttribute('aria-pressed', 'false')
  })

  it('responds to a blank app destination without navigating or flipping', async () => {
    const user = userEvent.setup()
    render(<LauncherCard app={app} index={0} />)
    const arrow = screen.getByRole('button', { name: 'Open MoriCar — coming soon' })
    expect(arrow).toBeEnabled()
    await user.click(arrow)
    expect(screen.getByRole('button', { name: 'About MoriCar' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('App link coming soon.')
  })

  it('keeps the configured app link separate from the flip button', () => {
    render(<LauncherCard app={{ ...app, url: 'https://example.com/app' }} index={0} />)
    const link = screen.getByRole('link', { name: 'Open MoriCar' })
    expect(link).toHaveAttribute('href', 'https://example.com/app')
    expect(link.closest('button')).toBeNull()
    expect(screen.getByRole('button', { name: 'About MoriCar' })).not.toContainElement(link)
  })
})
