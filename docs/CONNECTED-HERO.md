# Connected Mauritius hero

Only the MoriStack launcher hero is replaced. `ConnectedHero.tsx` owns visibility,
session playback, accessible HTML copy, skip/replay and the static SVG fallback.
`createConnectedScene.ts` is dynamically imported on intersection, reuses the
existing Three.js dependency, and owns the camera and GPU resource lifecycle.
Stage timings are in `journey.ts` (11.5 seconds, excluding loading and pauses).

The globe approaches 20.28° S, 57.57° E, east of Madagascar. A tangent-space island
mesh at the same geographic anchor replaces the low-resolution satellite surface
during approach. The camera then tilts. The main island's coastline is geographic;
the raised terrain, ocean, community markers and network are artistic illustrations,
not survey elevation data or live user locations. Outlying islands are outside the
close-up frame.

## Assets and credits

- `public/launcher/earth.webp`: NASA/Goddard Space Flight Center Scientific
  Visualization Studio, Blue Marble. Blue Marble data courtesy of Reto Stockli
  (NASA/GSFC) and NASA's Earth Observatory. Converted from the 2048×1024 PNG to
  WebP (quality 85, approximately 191 kB), without cropping or geographic changes.
  Source: https://svs.gsfc.nasa.gov/2915/
  Download: https://svs.gsfc.nasa.gov/vis/a000000/a002900/a002915/bluemarble-2048.png
  Usage guidelines: https://www.nasa.gov/nasa-brand-center/images-and-media/
  Used as geographic illustration, with no NASA identifiers or implied endorsement.
- `mauritiusCoast.json`: main-island ring extracted from Natural Earth's 1:10m
  Admin 0 Countries data; coordinates rounded to five decimal places. Public domain.
  Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_admin_0_countries.geojson
  Terms: https://www.naturalearthdata.com/about/terms-of-use/
- Terrain, static island artwork, person sprites, stars, network and animation:
  generated in project code. No external runtime requests, map API or tracking.

## Playback and review

Visit `/#/moristack` (or `/` on mobile). Playback starts on intersection and remembers
the visit in sessionStorage, with an in-memory fallback when storage is unavailable.
Revisiting shows the final state; Replay explicitly starts another viewing. Resizing
does not recreate the renderer or reset the clock. Scrolling offscreen and hiding
the tab stop requestAnimationFrame and freeze progress. Pixel ratio is capped at 1.5.

Reduced motion avoids loading Three.js for this hero and shows the static network.
Loading and renderer/texture/context failures keep the SVG illustration and HTML
headline available. Skip works during loading too. Unmount disposes geometry,
materials, textures, renderer, observers, events and animation frames.
