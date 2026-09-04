import { Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/ui/Section'
import { Logo } from '@/components/ui/Logo'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { services } from '@/data/services'
import { activeSocials, siteConfig } from '@/data/site.config'

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-cyan-400/10 bg-navy-950">
      <div aria-hidden="true" className="ms-hairline absolute inset-x-0 top-0 h-px" />
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo size={42} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              A freelance web development studio building modern websites and custom web
              applications for businesses in Mauritius.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-300">
              <MapPin size={15} aria-hidden="true" className="text-turquoise-500" />
              Based in {siteConfig.location}
            </p>
          </div>

          <nav aria-labelledby="footer-nav-heading">
            <h2 id="footer-nav-heading" className="text-sm font-semibold text-ink-50">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav.map((link) => (
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

          <nav aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading" className="text-sm font-semibold text-ink-50">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services#${service.slug}`}
                    className="text-sm text-ink-400 transition-colors hover:text-turquoise-400"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-ink-50">Get in touch</h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-turquoise-400"
            >
              <Mail size={15} aria-hidden="true" className="text-turquoise-500" />
              {siteConfig.email}
            </a>
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
          <Link to="/privacy" className="transition-colors hover:text-turquoise-400">
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  )
}
