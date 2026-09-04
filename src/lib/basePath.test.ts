import { describe, expect, it } from 'vitest'
import { normalizeBasePath } from '../../vite.config'

/**
 * actions/configure-pages emits "/<repo>" for a project page but "/" for a user
 * page or custom domain, so the build must survive both without producing "//".
 */
describe('normalizeBasePath', () => {
  it.each([
    [undefined, '/'],
    ['', '/'],
    ['  ', '/'],
    ['/', '/'],
    ['//', '/'],
    ['/moristack', '/moristack/'],
    ['moristack', '/moristack/'],
    ['/moristack/', '/moristack/'],
    ['//moristack//', '/moristack/'],
    ['/deep/path', '/deep/path/'],
  ])('normalizes %o to %o', (input, expected) => {
    expect(normalizeBasePath(input)).toBe(expected)
  })

  it('always yields a value Vite can use as a base', () => {
    const candidates = [undefined, '', '/', '/repo', 'repo', '/repo/', '//repo//']
    for (const candidate of candidates) {
      const base = normalizeBasePath(candidate)
      expect(base.startsWith('/')).toBe(true)
      expect(base.endsWith('/')).toBe(true)
      expect(base).not.toContain('//')
    }
  })
})
