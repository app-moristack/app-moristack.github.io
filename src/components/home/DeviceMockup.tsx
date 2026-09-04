const menuItems = [
  { name: 'Grilled Line-Caught Fish', price: '480', note: 'Creole sauce, saffron rice' },
  { name: 'Octopus Salad', price: '390', note: 'Lime, chilli, coriander' },
  { name: 'Slow-Braised Beef', price: '520', note: 'Root vegetables, red wine' },
]

/**
 * A CSS-only presentation of a restaurant website on a laptop and a phone.
 * Decorative: hidden from assistive technology, with no external imagery.
 */
export function DeviceMockup() {
  return (
    <div aria-hidden="true" className="relative mx-auto mb-14 max-w-lg select-none sm:mr-10">
      <div className="ms-panel overflow-hidden rounded-2xl border-cyan-400/18 p-2.5 shadow-panel">
        <div className="flex items-center gap-1.5 px-2 pb-2.5">
          <span className="size-2 rounded-full bg-coral-500/70" />
          <span className="size-2 rounded-full bg-cyan-500/50" />
          <span className="size-2 rounded-full bg-turquoise-500/50" />
        </div>

        <div className="overflow-hidden rounded-xl bg-navy-950">
          <div className="relative h-24 bg-[linear-gradient(120deg,#0a2b3f,#10405c_45%,#1c5cbd_120%)] sm:h-28">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_120%,rgba(255,107,69,0.35),transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-3">
              <div>
                <p className="text-[0.6rem] font-semibold tracking-[0.22em] text-turquoise-400 uppercase">
                  Coastal Table
                </p>
                <p className="text-sm font-bold text-ink-50">Menu du Jour</p>
              </div>
              <span className="rounded-full bg-coral-500 px-2.5 py-1 text-[0.6rem] font-bold text-navy-950">
                Open now
              </span>
            </div>
          </div>

          <ul className="divide-y divide-cyan-400/8 px-4">
            {menuItems.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-3 py-2.5">
                <span>
                  <span className="block text-[0.7rem] font-semibold text-ink-100">
                    {item.name}
                  </span>
                  <span className="block text-[0.6rem] text-ink-500">{item.note}</span>
                </span>
                <span className="text-[0.7rem] font-bold text-turquoise-400">Rs {item.price}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 px-4 pt-2 pb-4">
            <span className="flex-1 rounded-full bg-gradient-to-r from-turquoise-500 to-cyan-500 py-1.5 text-center text-[0.6rem] font-bold text-navy-950">
              Reserve a table
            </span>
            <span className="rounded-full border border-cyan-400/20 px-3 py-1.5 text-[0.6rem] font-semibold text-ink-300">
              Directions
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto h-2 w-2/3 rounded-b-xl bg-navy-800/80" />

      {/* Offset below the laptop base so it never covers the menu or its buttons. */}
      <div className="absolute -right-1 -bottom-12 w-28 rounded-[1.25rem] border border-cyan-400/20 bg-navy-900 p-1.5 shadow-panel sm:-right-8 sm:w-32">
        <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-navy-700" />
        <div className="overflow-hidden rounded-[0.9rem] bg-navy-950">
          <div className="h-10 bg-[linear-gradient(140deg,#10405c,#ff6b45_180%)]" />
          <div className="space-y-1.5 p-2">
            <div className="h-1.5 w-3/4 rounded-full bg-turquoise-500/45" />
            <div className="h-1.5 w-full rounded-full bg-navy-700" />
            <div className="h-1.5 w-2/3 rounded-full bg-navy-700" />
            <div className="mt-2 h-4 rounded-full bg-gradient-to-r from-turquoise-500 to-cyan-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
