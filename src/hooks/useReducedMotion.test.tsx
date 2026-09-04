import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Reveal } from '@/components/ui/Reveal'
import { usePrefersReducedMotion } from './useReducedMotion'

function Probe() {
  return <span>{usePrefersReducedMotion() ? 'reduced' : 'full'}</span>
}

function stubReducedMotion(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query.includes('prefers-reduced-motion') ? matches : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

describe('usePrefersReducedMotion', () => {
  it('reports the reduced-motion preference when it is set', () => {
    stubReducedMotion(true)
    render(<Probe />)
    expect(screen.getByText('reduced')).toBeInTheDocument()
  })

  it('reports full motion by default', () => {
    stubReducedMotion(false)
    render(<Probe />)
    expect(screen.getByText('full')).toBeInTheDocument()
  })
})

describe('Reveal', () => {
  it('renders its content whichever motion preference is set', () => {
    stubReducedMotion(true)
    const { unmount } = render(<Reveal>Reduced content</Reveal>)
    expect(screen.getByText('Reduced content')).toBeInTheDocument()
    unmount()

    stubReducedMotion(false)
    render(<Reveal>Animated content</Reveal>)
    expect(screen.getByText('Animated content')).toBeInTheDocument()
  })
})
