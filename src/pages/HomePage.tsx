import { CallToAction } from '@/components/CallToAction'
import { Seo } from '@/components/Seo'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { Hero } from '@/components/home/Hero'
import { ProblemsWeSolve } from '@/components/home/ProblemsWeSolve'
import { ProcessTimeline } from '@/components/home/ProcessTimeline'
import { RestaurantShowcase } from '@/components/home/RestaurantShowcase'
import { Technologies } from '@/components/home/Technologies'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { ServiceRow } from '@/components/ui/ServiceRow'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'
import { Section, SectionHeading } from '@/components/ui/Section'
import { services } from '@/data/services'

export default function HomePage() {
  return (
    <>
      <Seo
        title="MoriStack | Website & Web App Development in Mauritius"
        description="MoriStack creates modern websites and custom web applications for businesses in Mauritius using React, Vue.js and mobile-first design."
      />

      <Hero />

      <Section labelledBy="services-heading">
        <SectionHeading
          id="services-heading"
          align="left"
          eyebrow="What we do"
          title={
            <>
              Solutions that solve real{' '}
              <span className="ms-serif text-turquoise-400">business</span> problems
            </>
          }
          intro="From a first website to a system that runs your operations, every project starts with what the business actually needs."
        />

        <Stagger stagger={0.06} className="border-b border-cyan-400/12">
          {services.map((service, index) => (
            <StaggerItem key={service.slug} direction="right">
              <ServiceRow service={service} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <ProblemsWeSolve />
      <RestaurantShowcase />
      <WhyChooseUs />
      <ProcessTimeline />
      <FeaturedWork />
      <Technologies />
      <CallToAction />
    </>
  )
}
