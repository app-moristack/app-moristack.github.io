import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ConnectedHero } from './ConnectedHero'
import { setReducedMotion } from '@/test/setup'

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  scene: { setActive: vi.fn(), finish: vi.fn(), replay: vi.fn(), dispose: vi.fn() },
}))
vi.mock('@/components/three/createConnectedScene', () => ({ createConnectedScene: mocks.create }))
let intersect: (entries: { isIntersecting: boolean }[]) => void
beforeEach(() => {
  vi.clearAllMocks()
  sessionStorage.clear()
  mocks.create.mockResolvedValue(mocks.scene)
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: typeof intersect) {
        intersect = callback
      }
      observe() {}
      disconnect() {}
    },
  )
})
const enter = async () => {
  await act(async () => intersect([{ isIntersecting: true }]))
}

describe('connected hero playback', () => {
  it('loads on intersection, pauses offscreen and in hidden tabs, and disposes on unmount', async () => {
    const { unmount } = render(<ConnectedHero />)
    expect(mocks.create).not.toHaveBeenCalled()
    await enter()
    await waitFor(() => expect(mocks.scene.setActive).toHaveBeenLastCalledWith(true))
    act(() => intersect([{ isIntersecting: false }]))
    expect(mocks.scene.setActive).toHaveBeenLastCalledWith(false)
    await enter()
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true)
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(mocks.scene.setActive).toHaveBeenLastCalledWith(false)
    hidden.mockReturnValue(false)
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(mocks.scene.setActive).toHaveBeenLastCalledWith(true)
    expect(mocks.create).toHaveBeenCalledTimes(1)
    unmount()
    expect(mocks.scene.dispose).toHaveBeenCalledTimes(1)
  })
  it('shows the static final composition without creating WebGL for reduced motion', () => {
    setReducedMotion(true)
    render(<ConnectedHero />)
    expect(screen.getByRole('region')).toHaveAttribute('data-final', 'true')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A MoreConnectedMauritius')
    expect(screen.queryByRole('button', { name: 'Skip animation' })).not.toBeInTheDocument()
    expect(mocks.create).not.toHaveBeenCalled()
  })
  it('keeps the headline and static island available when scene initialization fails', async () => {
    mocks.create.mockRejectedValueOnce(new Error('WebGL unavailable'))
    render(<ConnectedHero />)
    await enter()
    await waitFor(() => expect(screen.getByRole('region')).toHaveAttribute('data-final', 'true'))
    expect(screen.getByRole('region')).toHaveAttribute('data-ready', 'false')
  })
  it('skips while loading, remembers the visit and supports explicit replay', async () => {
    let resolve!: (value: typeof mocks.scene) => void
    mocks.create.mockReturnValueOnce(
      new Promise((r) => {
        resolve = r
      }),
    )
    const user = userEvent.setup()
    const view = render(<ConnectedHero />)
    await enter()
    await user.click(screen.getByRole('button', { name: 'Skip animation' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus()
    await act(async () => resolve(mocks.scene))
    expect(mocks.scene.finish).toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Replay animation' }))
    expect(mocks.scene.replay).toHaveBeenCalled()
    expect(screen.getByRole('region')).toHaveAttribute('data-final', 'false')
    view.unmount()
    render(<ConnectedHero />)
    expect(screen.getByRole('region')).toHaveAttribute('data-final', 'true')
  })
})
