import coast from './mauritiusCoast.json'

// Seconds from the first rendered frame; the timeline stops while offscreen.
export const JOURNEY = {
  rotate: 1,
  zoom: 3.4,
  island: 6.4,
  people: 7,
  links: 8.2,
  title: 10,
  end: 11.5,
}
export const CENTER = { lat: -20.28, lon: 57.57 }
export const SCALE = Math.PI / 180 / 6
export const coastline = coast.map(
  ([lon, lat]) =>
    [(lon - CENTER.lon) * Math.cos((CENTER.lat * Math.PI) / 180) * 6, (lat - CENTER.lat) * 6] as [
      number,
      number,
    ],
)
// Community locations, geographically placed; these are illustrative, not live users.
export const communities = [
  [57.57, -20.03],
  [57.52, -20.16],
  [57.72, -20.19],
  [57.48, -20.27],
  [57.6, -20.29],
  [57.4, -20.36],
  [57.7, -20.4],
  [57.54, -20.46],
].map(
  ([lon, lat]) =>
    [(lon - CENTER.lon) * Math.cos((CENTER.lat * Math.PI) / 180) * 6, (lat - CENTER.lat) * 6] as [
      number,
      number,
    ],
)
export const connections = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 6],
  [4, 7],
  [5, 7],
  [6, 7],
]
export function progress(time: number, start: number, end: number) {
  const x = Math.max(0, Math.min(1, (time - start) / (end - start)))
  return x * x * (3 - 2 * x)
}
export function stageAt(time: number) {
  if (time < JOURNEY.rotate) return 'A world of possibilities'
  if (time < JOURNEY.zoom) return 'Our place in the world'
  if (time < JOURNEY.people) return 'Mauritius · 20.28° S, 57.57° E'
  if (time < JOURNEY.links) return 'People. Places. Possibilities.'
  return 'An island, connected.'
}
