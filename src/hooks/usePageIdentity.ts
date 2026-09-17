import { useLocation } from 'react-router'

export function usePageIdentity() {
  const { pathname, hash } = useLocation()
  // Preserve previously shared homepage section links at every viewport size.
  const launcher = pathname === '/moristack' || (pathname === '/' && !hash)
  const activePath = pathname === '/' ? (launcher ? '/moristack' : '/home') : pathname
  return { launcher, activePath }
}
