import { Link } from 'react-router'
import { PageNavLink as NavLink } from './PageNavLink'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { siteConfig, whatsappLink } from '@/data/site.config'
import { cn } from '@/lib/cn'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'

const itemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
    isActive ? 'bg-turquoise-500/10 text-turquoise-400' : 'text-ink-200 hover:bg-navy-800/70',
  )

/** Groups are flattened into labelled sections: no nested disclosure on a phone. */
export function MobileNav({ onNavigate }: { readonly onNavigate: () => void }) {
  return (
    <nav aria-label="Mobile" className="flex flex-col">
      {siteConfig.nav.map((item, index) => (
        <div
          key={item.to}
          className={cn(
            'mobile-navigation-item flex flex-col',
            item.to === '/moristack' && 'mobile-navigation-hub',
          )}
          style={{ '--nav-delay': `${index * 45}ms` } as CSSProperties}
        >
          <NavLink to={item.to} onClick={onNavigate} className={itemClass}>
            {item.label}
            {item.to === '/moristack' && (
              <span className="ml-auto inline-flex items-center gap-2 text-[10px] tracking-wider text-cyan-400 uppercase">
                Ecosystem <ArrowUpRight size={16} />
              </span>
            )}
          </NavLink>
          {item.children ? (
            <div className="mb-1 ml-4 flex flex-col border-l border-cyan-400/12 pl-3">
              {item.children.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  onClick={onNavigate}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-400 transition-colors hover:bg-navy-800/60 hover:text-ink-100"
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>
      ))}

      <Link
        to="/contact"
        onClick={onNavigate}
        className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-turquoise-500 to-cyan-500 px-5 text-sm font-semibold text-navy-950"
      >
        Build with us
      </Link>

      {whatsappLink ? (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer noopener"
          onClick={onNavigate}
          className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-turquoise-500/35 px-5 text-sm font-semibold text-turquoise-400"
        >
          <SocialIcon name="whatsapp" size={17} />
          WhatsApp {siteConfig.whatsappNumber}
        </a>
      ) : null}
    </nav>
  )
}
