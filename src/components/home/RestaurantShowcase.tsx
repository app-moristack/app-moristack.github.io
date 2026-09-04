import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow, Section } from '@/components/ui/Section'
import { restaurantFeatures } from '@/data/content'
import { DeviceMockup } from './DeviceMockup'

export function RestaurantShowcase() {
  return (
    <Section labelledBy="restaurant-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,69,0.1),transparent_65%)] blur-2xl"
      />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>For restaurants</Eyebrow>
          <h2 id="restaurant-heading" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Give Your Restaurant the{' '}
            <span className="text-coral-400">Online Presence It Deserves</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-300">
            Your food is the reason people come back. Your website should make that obvious before
            they arrive — on the phone they are already holding.
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {restaurantFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-300">
                <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-coral-400" />
                {feature}
              </li>
            ))}
          </ul>

          <ButtonLink to="/contact" className="mt-8">
            Get a quote for my restaurant
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.12}>
          <DeviceMockup />
        </Reveal>
      </div>
    </Section>
  )
}
