import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { Parallax } from '@/components/ui/Parallax'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow, Section } from '@/components/ui/Section'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'
import { RevealLine, RevealLines } from '@/components/ui/TextReveal'
import { restaurantFeatures } from '@/data/content'
import { DeviceMockup } from './DeviceMockup'

export function RestaurantShowcase() {
  return (
    <Section labelledBy="restaurant-heading" className="relative overflow-hidden">
      <Parallax distance={110}>
        <div
          aria-hidden="true"
          className="absolute top-1/3 -right-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,69,0.1),transparent_65%)] blur-2xl"
        />
      </Parallax>

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="right">
          <Eyebrow>For restaurants</Eyebrow>
          <h2 id="restaurant-heading" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            <RevealLines>
              <RevealLine>Give Your Restaurant the</RevealLine>
              <RevealLine className="text-coral-400">Online Presence It Deserves</RevealLine>
            </RevealLines>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-300">
            Your food is the reason people come back. Your website should make that obvious before
            they arrive — on the phone they are already holding.
          </p>

          <Stagger as="ul" stagger={0.05} className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {restaurantFeatures.map((feature) => (
              <StaggerItem
                as="li"
                key={feature}
                className="flex items-start gap-2.5 text-sm text-ink-300"
              >
                <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-coral-400" />
                {feature}
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-8">
            <Magnetic>
              <ButtonLink to="/contact">Get a quote for my restaurant</ButtonLink>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal direction="left">
          <Parallax distance={54}>
            <DeviceMockup />
          </Parallax>
        </Reveal>
      </div>
    </Section>
  )
}
