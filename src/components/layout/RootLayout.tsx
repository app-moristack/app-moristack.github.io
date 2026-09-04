import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Footer } from './Footer'
import { Header } from './Header'

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <span
        aria-hidden="true"
        className="size-8 animate-spin rounded-full border-2 border-cyan-400/25 border-t-turquoise-500"
      />
    </div>
  )
}

export function RootLayout() {
  const { pathname, hash } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  /**
   * HashRouter is not a data router, so scrolling and focus are handled here
   * rather than by <ScrollRestoration />.
   */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (hash) {
      const target = document.getElementById(hash.replace('#', ''))
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0 })
    mainRef.current?.focus()
  }, [pathname, hash])

  return (
    <div className="relative flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-turquoise-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy-950"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 pt-20 outline-none sm:pt-24">
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  )
}
