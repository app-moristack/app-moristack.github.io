import { Link, NavLink } from 'react-router'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { siteConfig, whatsappLink } from '@/data/site.config'
import { cn } from '@/lib/cn'

const itemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
    isActive ? 'bg-turquoise-500/10 text-turquoise-400' : 'text-ink-200 hover:bg-navy-800/70',
  )

/** Groups are flattened into labelled sections: no nested disclosure on a phone. */
export function MobileNav({ onNavigate }: { readonly onNavigate: () => void }) {
  return (
    <nav aria-label="Mobile" className="flex flex-col">
      {siteConfig.nav.map((item) => (
        <div key={item.to} className="flex flex-col">
          <NavLink to={item.to} end={item.to === '/'} onClick={onNavigate} className={itemClass}>
            {item.label}
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
