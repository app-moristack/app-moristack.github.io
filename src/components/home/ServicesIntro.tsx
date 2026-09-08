import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Section'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'

const paragraphs = [
  'AI has made it possible to create websites faster than ever. But generating code is only one part of building a product that a business can rely on.',
  'At MoriStack, our developers bring years of real-world development experience. We take the time to understand your business, your users and where you want to go — then build clean, modular and scalable solutions designed to evolve with you.',
  'And when your project goes live, our job doesn’t end there. We provide genuine human support after delivery, whether you need help, improvements or new features as your business grows.',
]

export function ServicesIntro({ headingId }: { readonly headingId: string }) {
  return (
    <div className="mb-14 grid gap-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
      <Reveal direction="right">
        <Eyebrow>What we do</Eyebrow>
        <h2 id={headingId} className="mt-5 text-section font-extrabold text-balance">
          Building a website is easier than ever. Building it{' '}
          <span className="ms-serif text-turquoise-400">right</span> isn&rsquo;t.
        </h2>
      </Reveal>

      <Stagger stagger={0.07} className="space-y-4 lg:pt-1.5">
        {paragraphs.map((paragraph) => (
          <StaggerItem as="p" key={paragraph} className="text-lead text-ink-400">
            {paragraph}
          </StaggerItem>
        ))}

        <StaggerItem className="pt-1">
          <p className="border-l-2 border-turquoise-500/55 pl-5 text-lead font-semibold text-ink-100">
            AI gives us speed. Experience gives your project direction.
          </p>
        </StaggerItem>
      </Stagger>
    </div>
  )
}
