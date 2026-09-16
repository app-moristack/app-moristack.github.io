import { Compass } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'
import { ProductScreenshot } from '@/components/ui/ProductScreenshot'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'
import { ecosystemProducts, type EcosystemProduct } from '@/data/ecosystem'
import { MoriCarMockup } from './MoriCarMockup'
import { MoriHomeMockup } from './MoriHomeMockup'

const mockups: Record<string, React.ReactNode> = {
  morihome: <MoriHomeMockup />,
  moricar: <MoriCarMockup />,
}

function ProductVisual({ product }: { readonly product: EcosystemProduct }) {
  const mockup = mockups[product.slug]
  if (!product.screenshot) return mockup

  return (
    <ProductScreenshot
      src={product.screenshot}
      alt={product.screenshotAlt}
      brand={product.brand}
      size={product.screenshotSize}
      fallback={mockup}
    />
  )
}

export function Ecosystem({
  headingLevel = 'h2',
}: {
  readonly headingLevel?: 'h1' | 'h2'
} = {}) {
  return (
    <Section id="ecosystem" labelledBy="ecosystem-heading" className="relative">
      <SectionHeading
        id="ecosystem-heading"
        as={headingLevel}
        eyebrow="The MoriStack ecosystem"
        title={
          <>
            Technology built around <span className="ms-serif text-turquoise-400">life</span> in
            Mauritius.
          </>
        }
        intro="We create local platforms that make it easier for people, professionals and businesses to find each other, connect and grow."
      />

      <div className="space-y-6">
        {ecosystemProducts.map((product, index) => (
          <Reveal key={product.slug} direction={index % 2 === 0 ? 'right' : 'left'}>
            <ProductCard
              product={product}
              visual={<ProductVisual product={product} />}
              reversed={index % 2 === 1}
            />
          </Reveal>
        ))}

        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-panel border border-dashed border-cyan-400/22 bg-navy-900/40 p-6 sm:p-9">
            <div
              aria-hidden="true"
              className="absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,229,174,0.1),transparent_65%)] blur-2xl"
            />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <span
                aria-hidden="true"
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-turquoise-500/25 bg-turquoise-500/10 text-turquoise-400"
              >
                <Compass size={22} />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-ink-50 sm:text-2xl">
                  More connections are coming.
                </h3>
                <p className="mt-2.5 max-w-xl text-base leading-relaxed text-ink-400">
                  MoriStack continues to explore everyday problems in Mauritius where thoughtful
                  technology can make things simpler. When we find one worth solving properly, it
                  becomes the next platform in the ecosystem.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
