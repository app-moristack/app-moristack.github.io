import { CallToAction } from '@/components/CallToAction'
import { Seo } from '@/components/Seo'
import { Ecosystem } from '@/components/home/Ecosystem'
import { ForBusinesses } from '@/components/home/ForBusinesses'
import { Hero } from '@/components/home/Hero'
import { ProblemsWeSolve } from '@/components/home/ProblemsWeSolve'
import { ProcessTimeline } from '@/components/home/ProcessTimeline'
import { SelectedWork } from '@/components/home/SelectedWork'
import { Technologies } from '@/components/home/Technologies'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { ServiceRow } from '@/components/ui/ServiceRow'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'
import { Section } from '@/components/ui/Section'
import { services } from '@/data/services'

export default function HomePage() {
  return (
    <>
      <Seo
        title="MoriStack | Mauritian Technology Company & Digital Platforms"
        description="MoriStack builds digital platforms that connect Mauritius — MoriHome and MoriCar — and develops websites, web applications and business systems for companies across the island."
      />

      <Hero />

      <Ecosystem />

      <Section labelledBy="services-heading">
        <ForBusinesses headingId="services-heading" />

        <Stagger stagger={0.06} className="border-b border-cyan-400/12">
          {services.map((service, index) => (
            <StaggerItem key={service.slug} direction="right">
              <ServiceRow service={service} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <ProblemsWeSolve />
      <WhyChooseUs />
      <ProcessTimeline />
      <SelectedWork />
      <Technologies />
      <CallToAction />
    </>
  )
}
