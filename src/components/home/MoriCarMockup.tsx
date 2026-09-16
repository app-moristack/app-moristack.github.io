const specs = ['2019', '58 000 km', 'Automatic', 'Petrol']

const listings = [
  { seller: 'Showroom · Curepipe', price: '695 000' },
  { seller: 'Private seller · Vacoas', price: '430 000' },
]

/**
 * A CSS-only impression of a MoriCar listing. Decorative: hidden from
 * assistive technology, with no external imagery.
 */
export function MoriCarMockup() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="overflow-hidden rounded-2xl border border-auto-400/20 bg-navy-950 shadow-panel">
        <div className="flex items-center gap-2 border-b border-auto-400/12 bg-navy-900/80 px-4 py-3">
          <span className="text-[0.7rem] font-extrabold tracking-tight">
            <span className="text-ink-50">Mori</span>
            <span className="text-auto-300">Car</span>
          </span>
          <span className="ml-auto flex gap-1.5">
            {['Cars', 'Services'].map((tab, index) => (
              <span
                key={tab}
                className={
                  index === 0
                    ? 'rounded-full bg-auto-200/90 px-2 py-0.5 text-[0.55rem] font-bold text-navy-950'
                    : 'rounded-full px-2 py-0.5 text-[0.55rem] font-semibold text-ink-500'
                }
              >
                {tab}
              </span>
            ))}
          </span>
        </div>

        <div className="relative h-28 bg-[linear-gradient(135deg,#0a2b3f,#17567a_55%,#94a9bf_190%)] sm:h-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_130%,rgba(227,235,243,0.28),transparent_62%)]" />
          {/* Silhouette stands in for the vehicle photograph the real listing carries. */}
          <div className="absolute inset-x-8 bottom-4 h-10 rounded-t-[999px] bg-navy-950/45 [clip-path:polygon(0_100%,10%_46%,30%_16%,68%_14%,88%_44%,100%_100%)]" />
          <span className="absolute top-3 left-4 rounded-full bg-navy-950/70 px-2.5 py-1 text-[0.55rem] font-bold tracking-[0.12em] text-auto-200 uppercase">
            Featured
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[0.78rem] font-bold text-ink-50">Hatchback · 1.2L</span>
            <span className="ms-tnum text-[0.78rem] font-extrabold text-auto-200">Rs 545 000</span>
          </div>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {specs.map((spec) => (
              <li
                key={spec}
                className="rounded-md border border-auto-400/18 bg-navy-900/70 px-2 py-1 text-[0.55rem] font-semibold text-ink-400"
              >
                {spec}
              </li>
            ))}
          </ul>

          <ul className="mt-3 space-y-1.5 border-t border-auto-400/10 pt-3">
            {listings.map((listing) => (
              <li key={listing.seller} className="flex items-center justify-between gap-3">
                <span className="text-[0.6rem] text-ink-500">{listing.seller}</span>
                <span className="ms-tnum text-[0.6rem] font-bold text-ink-300">
                  Rs {listing.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute -inset-x-6 -bottom-8 -z-10 h-24 rounded-full bg-[radial-gradient(ellipse,rgba(148,169,191,0.2),transparent_70%)] blur-2xl" />
    </div>
  )
}
