import type { ReactNode } from 'react'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router'
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { Reveal } from '@/components/ui/Reveal'
import { Container } from '@/components/ui/Section'
import { siteConfig, whatsappLink } from '@/data/site.config'

export function CallToAction({
  title = (
    <>
      Ready to build <span className="ms-serif text-turquoise-400">something</span> good?
    </>
  ),
  intro = 'Tell us what you are trying to build or fix. We will come back with a clear plan and a written quote.',
}: {
  readonly title?: ReactNode
  readonly intro?: ReactNode
}) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(165deg,var(--color-navy-900),var(--color-navy-950))]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,229,174,0.14),transparent_62%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -bottom-32 -z-10 size-96 rounded-full bg-[radial-gradient(circle,rgba(255,107,69,0.16),transparent_65%)] blur-3xl"
      />
      <div aria-hidden="true" className="ms-hairline absolute inset-x-0 top-0 h-px" />

      <Container>
        <Reveal className="text-center">
          <h2 id="cta-heading" className="mx-auto max-w-[16ch] text-hero font-extrabold">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lead text-ink-400">{intro}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <ButtonLink to="/contact" size="lg" className="group">
                Request a Free Quote
                <ArrowRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                />
              </ButtonLink>
            </Magnetic>

            <ButtonAnchor href={`mailto:${siteConfig.email}`} size="lg" variant="secondary">
              <Mail size={16} aria-hidden="true" />
              {siteConfig.email}
            </ButtonAnchor>

            {whatsappLink ? (
              <ButtonAnchor
                href={whatsappLink}
                target="_blank"
                rel="noreferrer noopener"
                size="lg"
                variant="secondary"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </ButtonAnchor>
            ) : null}
          </div>

          <p className="mt-7 text-sm text-ink-500">
            Prefer a form?{' '}
            <Link to="/contact" className="font-semibold text-turquoise-400 hover:underline">
              Use the contact page
            </Link>{' '}
            &mdash; {siteConfig.responseTime}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
