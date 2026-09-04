import { CallToAction } from '@/components/CallToAction'
import { Seo } from '@/components/Seo'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { Hero } from '@/components/home/Hero'
import { ProblemsWeSolve } from '@/components/home/ProblemsWeSolve'
import { ProcessTimeline } from '@/components/home/ProcessTimeline'
import { RestaurantShowcase } from '@/components/home/RestaurantShowcase'
import { Technologies } from '@/components/home/Technologies'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { Reveal } from '@/components/ui/Reveal'
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
          eyebrow="What we do"
          title="Solutions that solve real business problems"
          intro="From a first website to a system that runs your operations, every project starts with what the business actually needs."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
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
