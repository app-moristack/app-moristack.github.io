import { Seo } from '@/components/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { Container } from '@/components/ui/Section'
import { siteConfig } from '@/data/site.config'

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found | MoriStack"
        description="The page you were looking for does not exist. Return to the MoriStack homepage."
        noindex
      />

      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <Logo size={56} withWordmark={false} />

        <p className="mt-8 text-sm font-bold tracking-[0.2em] text-turquoise-400 uppercase">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">This page does not exist</h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-300">
          The link may be out of date, or the address may have a typo in it. Everything else is
          still where you left it.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/" size="lg">
            Back to the homepage
          </ButtonLink>
          <ButtonLink to="/contact" size="lg" variant="secondary">
            Contact us
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {siteConfig.nav.map((link) => (
              <li key={link.to}>
                <ButtonLink to={link.to} variant="ghost">
                  {link.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  )
}
