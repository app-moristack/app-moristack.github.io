import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'
import { ButtonLink } from '@/components/ui/Button'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Logo } from '@/components/ui/Logo'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { siteConfig, whatsappLink } from '@/data/site.config'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[padding,background-color,box-shadow,backdrop-filter] duration-300',
        scrolled
          ? 'bg-navy-950/85 py-2 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl'
          : 'bg-transparent py-4',
      )}
    >
      <ScrollProgress />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to="/"
          aria-label={`${siteConfig.businessName} — home`}
          className="rounded-full transition-opacity hover:opacity-85"
        >
          <Logo size={scrolled ? 34 : 40} />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Contact ${siteConfig.businessName} on WhatsApp`}
              title={`WhatsApp ${siteConfig.whatsappNumber}`}
              className="hover:text-turquoise-300 inline-flex size-11 items-center justify-center rounded-full border border-cyan-400/20 bg-navy-800/60 text-turquoise-400 transition-colors hover:border-turquoise-500/45"
            >
              <SocialIcon name="whatsapp" size={19} />
            </a>
          ) : null}

          {/* max-md:hidden, not hidden: only a media-query variant beats the base inline-flex. */}
          <ButtonLink to="/contact" className="max-md:hidden">
            Build with us
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-full border border-cyan-400/20 bg-navy-800/60 text-ink-100 transition-colors hover:border-turquoise-500/45 lg:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id={menuId}
            ref={panelRef}
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mt-3 overflow-hidden rounded-2xl border border-cyan-400/15 bg-navy-900/97 p-3 shadow-panel backdrop-blur-xl lg:hidden"
          >
            <MobileNav onNavigate={closeMenu} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
