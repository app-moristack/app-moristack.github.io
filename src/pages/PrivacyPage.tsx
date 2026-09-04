import { Seo } from '@/components/Seo'
import { Container, Eyebrow } from '@/components/ui/Section'
import { siteConfig } from '@/data/site.config'

const LAST_UPDATED = 'September 2026'

export default function PrivacyPage() {
  const provider = siteConfig.contactFormEndpoint ? 'Formspree' : 'an external form provider'

  return (
    <>
      <Seo
        title="Privacy Policy | MoriStack"
        description="How MoriStack handles the information you submit through the contact form, and the third-party form provider used to deliver it."
      />

      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-ink-500">Last updated: {LAST_UPDATED}</p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-ink-300">
            <section aria-labelledby="privacy-summary">
              <h2 id="privacy-summary" className="text-xl font-bold text-ink-50">
                In short
              </h2>
              <p className="mt-3">
                This website is a static site. It has no database, no user accounts and no analytics
                or advertising trackers. The only information we receive is what you type into the
                contact form and send to us.
              </p>
            </section>

            <section aria-labelledby="privacy-collect">
              <h2 id="privacy-collect" className="text-xl font-bold text-ink-50">
                What we collect
              </h2>
              <p className="mt-3">
                When you submit the contact form we receive the fields you completed: your name,
                business name, email address, phone number, preferred contact method, project type,
                estimated budget, desired launch date, existing website address if you gave one, and
                your project description.
              </p>
              <p className="mt-3">
                We ask for this because it is what we need to understand your project and reply with
                a useful quote. Please do not include passwords, financial details or any other
                sensitive information in the message field.
              </p>
            </section>

            <section aria-labelledby="privacy-processor">
              <h2 id="privacy-processor" className="text-xl font-bold text-ink-50">
                How the form is delivered
              </h2>
              <p className="mt-3">
                Because this site has no backend of its own, the contact form is submitted to{' '}
                {provider}, a third-party form service. Your submission passes through and is stored
                on that provider&apos;s systems before it reaches our email inbox. Their own privacy
                policy and terms govern that processing, and their servers may be located outside
                Mauritius.
              </p>
              <p className="mt-3">
                If you would rather not use a third-party service, email us directly at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-turquoise-400 hover:underline"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>

            <section aria-labelledby="privacy-use">
              <h2 id="privacy-use" className="text-xl font-bold text-ink-50">
                How we use it
              </h2>
              <p className="mt-3">
                We use your details only to reply to your enquiry, prepare a quote and, if we work
                together, run the project. We do not sell your information, and we do not add you to
                a marketing list without you asking for it.
              </p>
            </section>

            <section aria-labelledby="privacy-retention">
              <h2 id="privacy-retention" className="text-xl font-bold text-ink-50">
                How long we keep it
              </h2>
              <p className="mt-3">
                Enquiries are kept for as long as they are useful for the conversation or the
                project, and for our own business records afterwards. You can ask us to delete your
                enquiry at any time and we will do so, unless we are required to keep it.
              </p>
            </section>

            <section aria-labelledby="privacy-cookies">
              <h2 id="privacy-cookies" className="text-xl font-bold text-ink-50">
                Cookies and tracking
              </h2>
              <p className="mt-3">
                This site sets no cookies of its own and does not run analytics or advertising
                scripts. The hosting provider may keep standard server access logs.
              </p>
            </section>

            <section aria-labelledby="privacy-security">
              <h2 id="privacy-security" className="text-xl font-bold text-ink-50">
                Security
              </h2>
              <p className="mt-3">
                The site is served over HTTPS and the contact form is validated in your browser
                before submission. That validation exists to catch mistakes and reduce spam — it is
                not, on its own, a complete security control, and no transmission over the internet
                can be guaranteed to be perfectly secure.
              </p>
            </section>

            <section aria-labelledby="privacy-rights">
              <h2 id="privacy-rights" className="text-xl font-bold text-ink-50">
                Your rights
              </h2>
              <p className="mt-3">
                You can ask us what information we hold about you, ask us to correct it, or ask us
                to delete it. Email{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-turquoise-400 hover:underline"
                >
                  {siteConfig.email}
                </a>{' '}
                and we will respond.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2 id="privacy-contact" className="text-xl font-bold text-ink-50">
                Contact
              </h2>
              <p className="mt-3">
                {siteConfig.businessName}, {siteConfig.location} &mdash;{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-turquoise-400 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </>
  )
}
