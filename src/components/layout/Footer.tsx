import { Mail } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/ui/Section'
import { Logo } from '@/components/ui/Logo'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { ecosystemProducts } from '@/data/ecosystem'
import { activeSocials, siteConfig, whatsappLink } from '@/data/site.config'

const solutions = [
  { label: 'Websites', to: '/services#business-websites' },
  { label: 'Web Applications', to: '/services#web-applications' },
  { label: 'Business Systems', to: '/services#management-systems' },
  { label: 'Custom Development', to: '/services#custom-platforms' },
]

const company = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/work' },
  { label: 'Contact', to: '/contact' },
]

function FooterColumn({
  heading,
  links,
}: {
  readonly heading: string
  readonly links: readonly { label: string; to: string }[]
}) {
  const headingId = `footer-${heading.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <nav aria-labelledby={headingId}>
      <h2 id={headingId} className="text-xs font-bold tracking-[0.18em] text-ink-50 uppercase">
        {heading}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-ink-400 transition-colors hover:text-turquoise-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-cyan-400/10 bg-navy-950">
      <div aria-hidden="true" className="ms-hairline absolute inset-x-0 top-0 h-px" />
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo size={42} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
              {siteConfig.tagline}.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-500">
              A Mauritian technology company building its own digital platforms, and the systems
              local businesses run on.
            </p>
          </div>

          <FooterColumn
            heading="Ecosystem"
            links={ecosystemProducts.map((product) => ({
              label: product.name,
              to: `/#${product.slug}`,
            }))}
          />

          <FooterColumn heading="Solutions" links={solutions} />

          <FooterColumn heading="Company" links={company} />

          <div>
            <h2 className="text-xs font-bold tracking-[0.18em] text-ink-50 uppercase">Connect</h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-turquoise-400"
            >
              <Mail size={15} aria-hidden="true" className="text-turquoise-500" />
              {siteConfig.email}
            </a>
            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-turquoise-400"
              >
                <span aria-hidden="true" className="text-turquoise-500">
                  <SocialIcon name="whatsapp" size={15} />
                </span>
                WhatsApp {siteConfig.whatsappNumber}
              </a>
            ) : null}
            {siteConfig.phone ? (
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                className="mt-2 block text-sm text-ink-300 transition-colors hover:text-turquoise-400"
              >
                {siteConfig.phone}
              </a>
            ) : null}

            {activeSocials.length > 0 ? (
              <ul className="mt-5 flex gap-2">
                {activeSocials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${siteConfig.businessName} on ${social.label}`}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-cyan-400/15 text-ink-300 transition-colors hover:border-turquoise-500/45 hover:text-turquoise-400"
                    >
                      <SocialIcon name={social.icon} size={17} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cyan-400/10 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
          <p className="font-medium text-ink-400">
            Built in Mauritius <span aria-hidden="true">🇲🇺</span>
          </p>
          <Link to="/privacy" className="transition-colors hover:text-turquoise-400">
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  )
}
