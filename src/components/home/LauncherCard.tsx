import { useState, type CSSProperties } from 'react'
import { ArrowRight, Box, RotateCcw, Sparkles } from 'lucide-react'
import { assetUrl } from '@/data/site.config'

export type LauncherProduct = {
  id: string
  name: string
  tagline: string
  category: string
  image: string | null
  color: string
  url: string | null
  description: string
}

export function LauncherCard({ app, index }: { app: LauncherProduct; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const [linkNotice, setLinkNotice] = useState(false)
  const descriptionId = `launcher-description-${app.id}`

  return (
    <article
      className="launcher-card"
      data-flipped={flipped}
      style={{ '--app-color': app.color, '--card-delay': `${index * 90}ms` } as CSSProperties}
      onPointerEnter={(event) => {
        if (
          event.pointerType === 'mouse' &&
          window.matchMedia('(hover: hover) and (pointer: fine)').matches
        )
          setFlipped(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setFlipped(false)
        setLinkNotice(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setFlipped(false)
          setLinkNotice(false)
        }
      }}
    >
      <div className="launcher-card-rotor">
        <div className="launcher-card-face launcher-card-front" aria-hidden={flipped}>
          {app.image ? (
            <div className="launcher-card-art">
              <img
                src={assetUrl(`launcher/${app.image}.webp`)}
                alt=""
                width="560"
                height="560"
                decoding="async"
              />
            </div>
          ) : (
            <div className="launcher-cube-art" aria-hidden="true">
              <div className="launcher-cube">
                <Box strokeWidth={0.7} />
                <Sparkles size={22} />
              </div>
              <span />
            </div>
          )}
          <div className="launcher-card-copy">
            <span className="launcher-card-category">{app.category}</span>
            <h2>{app.name}</h2>
            <p>{app.tagline}</p>
            <span className="launcher-card-status">
              {app.url ? 'Open platform' : app.image ? 'In development' : 'Coming soon'}
            </span>
          </div>
        </div>
        <div className="launcher-card-face launcher-card-back" aria-hidden={!flipped}>
          <span className="launcher-back-category">{app.category}</span>
          <h2>{app.name}</h2>
          <p id={descriptionId}>{app.description}</p>
          <span className="launcher-back-hint">
            <RotateCcw size={13} /> Tap to turn back
          </span>
        </div>
      </div>
      <button
        className="launcher-card-flip"
        type="button"
        aria-label={`${flipped ? 'Show artwork for' : 'About'} ${app.name}`}
        aria-pressed={flipped}
        aria-describedby={flipped ? descriptionId : undefined}
        onClick={() => {
          setFlipped((value) => !value)
          setLinkNotice(false)
        }}
      />
      {app.url ? (
        <a className="launcher-card-arrow" href={app.url} aria-label={`Open ${app.name}`}>
          <ArrowRight size={17} />
        </a>
      ) : (
        <button
          className="launcher-card-arrow"
          type="button"
          onClick={() => setLinkNotice(true)}
          aria-label={`Open ${app.name} — coming soon`}
          title="App link coming soon"
        >
          <ArrowRight size={17} />
        </button>
      )}
      {linkNotice && (
        <span className="launcher-link-notice" role="status">
          App link coming soon.
        </span>
      )}
    </article>
  )
}
