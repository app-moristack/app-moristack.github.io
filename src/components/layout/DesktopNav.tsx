import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { PageNavLink as NavLink } from './PageNavLink'
import { siteConfig, type NavLink as NavItem } from '@/data/site.config'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

/**
 * Hover-to-open is a mouse affordance only. On touch the same pointerenter
 * fires on tap and would immediately re-open what the button just closed, so
 * coarse pointers get the button as the single way in. Keyboard users get the
 * button too: opening on focus would fight the same toggle.
 */
const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

function useHoverCapable() {
  const [hoverable, setHoverable] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(HOVER_QUERY).matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const media = window.matchMedia(HOVER_QUERY)
    const onChange = (event: MediaQueryListEvent) => setHoverable(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return hoverable
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
    isActive ? 'text-turquoise-400' : 'text-ink-300 hover:text-ink-50',
  )

/**
 * The parent of a group is a real link as well as a disclosure: the section
 * page is reachable in one click, and the children are an expansion of it
 * rather than the only way in.
 */
function NavGroup({
  item,
  open,
  onOpen,
  onClose,
}: {
  readonly item: NavItem
  readonly open: boolean
  readonly onOpen: () => void
  readonly onClose: () => void
}) {
  const reduced = usePrefersReducedMotion()
  const hoverable = useHoverCapable()
  const closeTimer = useRef<number | undefined>(undefined)

  const cancelClose = () => window.clearTimeout(closeTimer.current)
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(onClose, 120)
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  return (
    <li
      className="relative"
      onPointerEnter={
        hoverable
          ? () => {
              cancelClose()
              onOpen()
            }
          : undefined
      }
      onPointerLeave={hoverable ? scheduleClose : undefined}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) onClose()
      }}
    >
      <span className="flex items-center">
        <NavLink to={item.to} className={linkClass}>
          {item.label}
        </NavLink>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${item.label} menu`}
          onClick={() => (open ? onClose() : onOpen())}
          className="-ml-1.5 cursor-pointer rounded-full p-1 text-ink-400 transition-colors hover:text-turquoise-400"
        >
          <ChevronDown
            size={14}
            aria-hidden="true"
            className={cn('transition-transform duration-200', open && 'rotate-180')}
          />
        </button>
      </span>

      <AnimatePresence>
        {open ? (
          <motion.ul
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 z-10 mt-2 w-72 overflow-hidden rounded-2xl border border-cyan-400/15 bg-navy-900/97 p-2 shadow-panel backdrop-blur-xl"
          >
            {item.children?.map((child) => (
              <li key={child.to}>
                <NavLink
                  to={child.to}
                  onClick={onClose}
                  className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-navy-800/80"
                >
                  <span className="block text-sm font-semibold text-ink-50">{child.label}</span>
                  <span className="mt-0.5 block text-xs text-ink-400">{child.description}</span>
                </NavLink>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </li>
  )
}

export function DesktopNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null)
  const close = useCallback(() => setOpenLabel(null), [])

  return (
    <nav
      aria-label="Main"
      className="hidden lg:block"
      onKeyDown={(event) => {
        if (event.key === 'Escape') close()
      }}
    >
      <ul className="flex items-center gap-1">
        {siteConfig.nav.map((item) =>
          item.children ? (
            <NavGroup
              key={item.to}
              item={item}
              open={openLabel === item.label}
              onOpen={() => setOpenLabel(item.label)}
              onClose={close}
            />
          ) : (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  )
}
