import { useSyncExternalStore } from 'react'
import { useLocation } from 'react-router'

export const MOBILE_QUERY = '(max-width: 767px)'
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(MOBILE_QUERY)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches

export function usePageIdentity() {
  const mobile = useSyncExternalStore(subscribe, getSnapshot, () => false)
  const { pathname, hash } = useLocation()
  // Preserve previously shared homepage section links on small screens too.
  const launcher = pathname === '/moristack' || (pathname === '/' && mobile && !hash)
  const activePath = pathname === '/' ? (launcher ? '/moristack' : '/home') : pathname
  return { mobile, launcher, activePath }
}
