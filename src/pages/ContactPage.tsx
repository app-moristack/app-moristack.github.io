import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { ContactForm } from '@/components/contact/ContactForm'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Eyebrow } from '@/components/ui/Section'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { activeSocials, siteConfig, whatsappLink } from '@/data/site.config'

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact | Request a Free Quote | MoriStack"
        description="Tell MoriStack about your website or web application project and receive a clear, written quote. Based in Mauritius."
      />

      <header className="relative overflow-hidden py-14 sm:py-20">
        <div aria-hidden="true" className="ms-grid-backdrop absolute inset-0 -z-10 opacity-60" />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              Request a <span className="ms-gradient-text">free quote</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              The more you can tell us about the project, the more useful our first reply will be.
              Nothing here commits you to anything.
            </p>
          </div>
        </Container>
      </header>

      <Container className="pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-4">
            <div className="ms-panel p-6">
              <h2 className="text-base font-bold text-ink-50">Prefer to reach us directly?</h2>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 flex items-center gap-3 rounded-xl border border-cyan-400/15 bg-navy-900/60 p-3.5 text-sm transition-colors hover:border-turquoise-500/40"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-turquoise-500/10 text-turquoise-400"
                >
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-xs text-ink-500">Email</span>
                  <span className="block font-medium text-ink-100">{siteConfig.email}</span>
                </span>
              </a>

              {siteConfig.phone ? (
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="mt-3 flex items-center gap-3 rounded-xl border border-cyan-400/15 bg-navy-900/60 p-3.5 text-sm transition-colors hover:border-turquoise-500/40"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400"
                  >
                    <Phone size={18} />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-500">Phone</span>
                    <span className="block font-medium text-ink-100">{siteConfig.phone}</span>
                  </span>
                </a>
              ) : null}

              {whatsappLink ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 flex items-center gap-3 rounded-xl border border-cyan-400/15 bg-navy-900/60 p-3.5 text-sm transition-colors hover:border-turquoise-500/40"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-turquoise-500/10 text-turquoise-400"
                  >
                    <MessageCircle size={18} />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-500">WhatsApp</span>
                    <span className="block font-medium text-ink-100">Start a chat</span>
                  </span>
                </a>
              ) : null}

              <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-400">
                <MapPin size={15} aria-hidden="true" className="text-turquoise-500" />
                Based in {siteConfig.location}
              </p>
            </div>

            {activeSocials.length > 0 ? (
              <div className="ms-panel p-6">
                <h2 className="text-base font-bold text-ink-50">Follow our work</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {activeSocials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-400/15 px-4 text-sm text-ink-300 transition-colors hover:border-turquoise-500/45 hover:text-turquoise-400"
                      >
                        <SocialIcon name={social.icon} size={16} />
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="ms-panel p-6">
              <h2 className="text-base font-bold text-ink-50">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm text-ink-400">
                <li className="flex gap-3">
                  <span className="font-bold text-turquoise-400">1.</span>
                  We read your enquiry and come back with any questions.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-turquoise-400">2.</span>A short call or exchange
                  to agree on the scope.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-turquoise-400">3.</span>A written quote with what
                  is included and a timeline.
                </li>
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  )
}
