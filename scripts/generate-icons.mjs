/**
 * Derives every icon and the social share image from the supplied logo.
 * Run after replacing public/brand/moristack-logo.png:  npm run icons
 *
 * The supplied artwork is a circular badge on an opaque square. The circular
 * alpha mask below removes the square corners without altering the artwork, so
 * the mark sits on the navy page background instead of on a black tile.
 */
import { access, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const brandDir = resolve(root, 'public/brand')
const source = resolve(brandDir, 'moristack-logo.png')

const NAVY = { r: 3, g: 17, b: 29, alpha: 1 }

try {
  await access(source)
} catch {
  console.error(
    `\nMissing logo: ${source}\n` +
      'Save the MoriStack logo there as a square PNG, then run "npm run icons" again.\n',
  )
  process.exit(1)
}

await mkdir(brandDir, { recursive: true })

const { width = 0, height = 0 } = await sharp(source).metadata()
if (width !== height) {
  console.warn(`warning: logo is ${width}x${height}, not square. Icons may be letterboxed.`)
}

/** The badge is inscribed in the square, so the mask radius is half the edge. */
const size = Math.min(width, height)
const radius = size / 2
const mask = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius - 1}" fill="#fff"/></svg>`,
)

const rounded = await sharp(source)
  .resize(size, size, { fit: 'cover', position: 'centre' })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer()

const icons = [
  { file: 'favicon-32.png', size: 32 },
  { file: 'favicon-192.png', size: 192 },
  { file: 'favicon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
]

for (const icon of icons) {
  // Apple ignores transparency and composites on black, so that one gets navy.
  const isApple = icon.file.startsWith('apple')
  let pipeline = sharp(rounded).resize(icon.size, icon.size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })

  if (isApple) {
    pipeline = sharp({
      create: { width: icon.size, height: icon.size, channels: 4, background: NAVY },
    }).composite([{ input: await pipeline.png().toBuffer() }])
  }

  await pipeline.png().toFile(resolve(brandDir, icon.file))
  console.log(`wrote public/brand/${icon.file} (${icon.size}x${icon.size})`)
}

// UI variants. The mark is never displayed above ~72px, so 224px covers 3x DPR
// and keeps the payload small; the full-size original stays as the master copy.
const UI_SIZE = 224
const uiBase = sharp(rounded).resize(UI_SIZE, UI_SIZE, { fit: 'contain' })

await uiBase.clone().webp({ quality: 88, effort: 6 }).toFile(resolve(brandDir, 'logo-mark.webp'))
await uiBase
  .clone()
  .png({ compressionLevel: 9, palette: true })
  .toFile(resolve(brandDir, 'logo-mark.png'))
console.log(`wrote public/brand/logo-mark.{webp,png} (${UI_SIZE}x${UI_SIZE})`)

const centrepiece = await sharp(rounded).resize(500, 500, { fit: 'contain' }).png().toBuffer()

await sharp({ create: { width: 1200, height: 630, channels: 4, background: NAVY } })
  .composite([{ input: centrepiece, gravity: 'centre' }])
  .png()
  .toFile(resolve(brandDir, 'og-image.png'))
console.log('wrote public/brand/og-image.png (1200x630)')
