const professionals = [
  { trade: 'Electrician', area: 'Quatre Bornes', tag: 'Rewiring · Certified' },
  { trade: 'Mason', area: 'Flacq', tag: 'Extensions · Slabs' },
  { trade: 'Plumber', area: 'Port Louis', tag: 'Emergency callout' },
]

/**
 * A CSS-only impression of the MoriHome search results. Decorative: hidden
 * from assistive technology, with no external imagery.
 */
export function MoriHomeMockup() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="overflow-hidden rounded-2xl border border-home-500/20 bg-navy-950 shadow-panel">
        <div className="flex items-center gap-2 border-b border-home-500/12 bg-navy-900/80 px-4 py-3">
          <span className="text-[0.7rem] font-extrabold tracking-tight">
            <span className="text-ink-50">Mori</span>
            <span className="text-home-400">Home</span>
          </span>
          <span className="ml-auto flex gap-1">
            <span className="size-1.5 rounded-full bg-home-400/60" />
            <span className="size-1.5 rounded-full bg-ink-500/40" />
            <span className="size-1.5 rounded-full bg-ink-500/40" />
          </span>
        </div>

        <div className="px-4 pt-4">
          <div className="flex items-center gap-2 rounded-full border border-home-500/25 bg-navy-800/60 px-3 py-2">
            <span className="size-1.5 rounded-full bg-home-400" />
            <span className="text-[0.65rem] text-ink-300">What do you need done?</span>
            <span className="ml-auto rounded-full bg-home-400 px-2.5 py-1 text-[0.6rem] font-bold text-navy-950">
              Search
            </span>
          </div>

          <div className="mt-3 flex gap-1.5">
            {['Near me', 'Renovation', 'Available'].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-home-500/18 px-2.5 py-1 text-[0.58rem] font-semibold text-ink-400"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <ul className="space-y-2 p-4">
          {professionals.map((person) => (
            <li
              key={person.trade}
              className="flex items-center gap-3 rounded-xl border border-home-500/12 bg-navy-900/70 p-2.5"
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-home-500/15">
                <span className="size-3 rounded-sm bg-home-400/70" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.7rem] font-bold text-ink-50">{person.trade}</span>
                <span className="block text-[0.6rem] text-ink-500">{person.tag}</span>
              </span>
              <span className="shrink-0 rounded-full bg-home-500/12 px-2 py-1 text-[0.55rem] font-semibold text-home-300">
                {person.area}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute -inset-x-6 -bottom-8 -z-10 h-24 rounded-full bg-[radial-gradient(ellipse,rgba(245,176,33,0.18),transparent_70%)] blur-2xl" />
    </div>
  )
}
