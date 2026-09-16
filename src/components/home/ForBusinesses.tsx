import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Section'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'

const paragraphs = [
  'AI has made producing a website faster and more accessible than it has ever been. But generating code is not the same as engineering a product a business can depend on.',
  'We use AI as an accelerator — it moves us through the mechanical work quickly. What it does not do is decide how a system should be structured, what your business actually needs, or which trade-off will still be right in two years.',
  'That part comes from years of building software: understanding the requirement, designing a maintainable architecture, keeping it modular and extensible, and taking security, performance, testing and deployment seriously before anything goes live.',
]

export function ForBusinesses({ headingId }: { readonly headingId: string }) {
  return (
    <div className="mb-14 grid gap-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
      <Reveal direction="right">
        <Eyebrow>For businesses</Eyebrow>
        <h2 id={headingId} className="mt-5 text-section font-extrabold text-balance">
          We build for ourselves. We build for{' '}
          <span className="ms-serif text-turquoise-400">businesses</span> too.
        </h2>
        <p className="mt-5 text-lead text-ink-400">
          The same engineering mindset behind MoriStack&rsquo;s own platforms is available to
          businesses that need reliable, scalable digital products.
        </p>
      </Reveal>

      <Stagger stagger={0.07} className="space-y-4 lg:pt-1.5">
        {paragraphs.map((paragraph) => (
          <StaggerItem as="p" key={paragraph} className="text-lead text-ink-400">
            {paragraph}
          </StaggerItem>
        ))}

        <StaggerItem className="pt-1">
          <p className="border-l-2 border-turquoise-500/55 pl-5 text-lead font-semibold text-ink-100">
            AI makes us faster. Experience makes the result reliable.
          </p>
        </StaggerItem>
      </Stagger>
    </div>
  )
}
