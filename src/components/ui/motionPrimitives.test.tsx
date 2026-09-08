import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Marquee } from './Marquee'
import { RevealLine, RevealLines } from './TextReveal'
import { Stagger, StaggerItem } from './Stagger'
import { setReducedMotion } from '@/test/setup'

describe('RevealLines', () => {
  it('keeps a split headline readable as one accessible name', () => {
    render(
      <h1>
        <RevealLines>
          <RevealLine>Websites that win</RevealLine>
          <RevealLine>you work.</RevealLine>
        </RevealLines>
      </h1>,
    )

    expect(screen.getByRole('heading', { name: 'Websites that win you work.' })).toBeInTheDocument()
  })

  it('keeps that name when reduced motion strips the animation', () => {
    setReducedMotion(true)
    render(
      <h1>
        <RevealLines>
          <RevealLine>Websites that win</RevealLine>
          <RevealLine>you work.</RevealLine>
        </RevealLines>
      </h1>,
    )

    expect(screen.getByRole('heading', { name: 'Websites that win you work.' })).toBeInTheDocument()
  })
})

describe('Stagger', () => {
  it('preserves list semantics for its items', () => {
    render(
      <Stagger as="ul">
        <StaggerItem as="li">One</StaggerItem>
        <StaggerItem as="li">Two</StaggerItem>
      </Stagger>,
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders plain elements when reduced motion is requested', () => {
    setReducedMotion(true)
    render(
      <Stagger as="ul">
        <StaggerItem as="li">One</StaggerItem>
      </Stagger>,
    )

    expect(screen.getByRole('listitem')).toHaveTextContent('One')
  })
})

describe('Marquee', () => {
  it('duplicates the track for the seamless wrap but announces it once', () => {
    render(
      <Marquee>
        <span>React</span>
      </Marquee>,
    )

    expect(screen.getAllByText('React')).toHaveLength(2)
    expect(document.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1)
  })

  it('drops the duplicate track when reduced motion is requested', () => {
    setReducedMotion(true)
    render(
      <Marquee>
        <span>React</span>
      </Marquee>,
    )

    expect(screen.getAllByText('React')).toHaveLength(1)
  })
})
