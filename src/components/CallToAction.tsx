import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router'
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Container } from '@/components/ui/Section'
import { siteConfig, whatsappLink } from '@/data/site.config'

export function CallToAction({
  title = 'Ready to Bring Your Idea to Life?',
  intro = 'Tell us what you are trying to build or fix. We will come back with a clear plan and a written quote.',
}: {
  readonly title?: string
  readonly intro?: string
}) {
  return (
    <section aria-labelledby="cta-heading" className="py-16 sm:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-turquoise-500/22 bg-[linear-gradient(140deg,rgba(10,43,63,0.95),rgba(5,27,44,0.95))] px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,229,174,0.16),transparent_62%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-16 -bottom-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(255,107,69,0.14),transparent_65%)] blur-2xl"
          />

          <div className="relative">
            <h2 id="cta-heading" className="text-3xl font-extrabold sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-300">{intro}</p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink to="/contact" size="lg">
                Request a Free Quote
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>

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

            <p className="mt-6 text-sm text-ink-400">
              Prefer a form?{' '}
              <Link to="/contact" className="font-semibold text-turquoise-400 hover:underline">
                Use the contact page
              </Link>{' '}
              &mdash; {siteConfig.responseTime}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
