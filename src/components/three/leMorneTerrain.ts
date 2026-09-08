import { BufferGeometry, Float32BufferAttribute, PlaneGeometry } from 'three'

export const TERRAIN_WIDTH = 4.6
export const TERRAIN_DEPTH = 2.8
export const TERRAIN_HEIGHT = 1.95

/**
 * The cliff drops across roughly a tenth of the footprint, so the lattice needs
 * enough columns to resolve a near-vertical wall instead of a chamfer.
 */
export const TERRAIN_SEGMENTS = 44

/** Footprint of the rock itself, as a fraction of the half-plane. */
const MASSIF_A = 0.53
const MASSIF_B = 0.46

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value)

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

/** Rounded-rectangle radial distance; the exponent is what squares off the massif. */
function superQ(x: number, z: number, a: number, b: number, exponent: number) {
  return (Math.abs(x / a) ** exponent + Math.abs(z / b) ** exponent) ** (1 / exponent)
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}

function valueNoise(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v
}

/**
 * Le Morne is a compact basalt monolith, not a mesa: sheer walls about as tall
 * as the rock is wide, a gently domed summit, and a broad vegetated talus it
 * stands on. Height is returned 0..~1 and scaled by TERRAIN_HEIGHT.
 */
export function terrainHeight(x: number, z: number) {
  // Columnar fluting scallops the cliff line so the wall is not a smooth extrusion.
  const theta = Math.atan2(z * (MASSIF_A / MASSIF_B), x)
  const flute = 1 + 0.05 * Math.sin(theta * 13) + 0.022 * Math.sin(theta * 21 + 1.3)
  const q = superQ(x, z, MASSIF_A * flute, MASSIF_B * flute, 3.4)

  // The talus the monolith sits on, reaching well beyond the cliff foot.
  const apron = 0.28 * (1 - smoothstep(0.9, 2.1, q)) ** 1.15

  // Sheer wall: the whole drop happens across a very narrow band of q.
  const wall = 1 - smoothstep(0.9, 1, q)
  const tilt = 0.7 + 0.3 * smoothstep(1, -1, x)
  const dome = 1 - 0.12 * q * q
  let monolith = wall * tilt * dome * 0.82
  monolith -= 0.1 * monolith * Math.exp(-((x + 0.05) ** 2) / 0.02)

  // Rock texture is suppressed on the wall so the cliff stays sheer.
  const summitMask = smoothstep(0.9, 0.55, q)
  const rock = (valueNoise(x * 5.2 + 11, z * 5.2 + 5) - 0.5) * 0.09
  const grit = (valueNoise(x * 11 + 3, z * 11 + 9) - 0.5) * 0.035
  const base = apron + monolith

  return Math.max(0, base + (rock + grit) * summitMask * smoothstep(0, 0.2, base))
}

/** Samples the height field on the same lattice the mesh uses. */
export function sampleGrid(segments = TERRAIN_SEGMENTS) {
  const size = segments + 1
  const values = new Float32Array(size * size)
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const nx = (col / segments - 0.5) * 2
      const nz = (row / segments - 0.5) * 2
      values[row * size + col] = terrainHeight(nx, nz)
    }
  }
  return { values, size }
}

/**
 * The sea-level margin of the plane is faded out through RGBA vertex colours,
 * so the model ends in open space instead of a hard rectangular base plate.
 */
export function createTerrainGeometry(segments = TERRAIN_SEGMENTS) {
  const geometry = new PlaneGeometry(TERRAIN_WIDTH, TERRAIN_DEPTH, segments, segments)
  geometry.rotateX(-Math.PI / 2)

  const position = geometry.attributes.position
  const colors = new Float32Array(position.count * 4)

  for (let i = 0; i < position.count; i += 1) {
    const nx = (position.getX(i) / TERRAIN_WIDTH) * 2
    const nz = (position.getZ(i) / TERRAIN_DEPTH) * 2
    const height = terrainHeight(nx, nz)
    position.setY(i, height * TERRAIN_HEIGHT)

    const lift = smoothstep(0.02, 0.34, height)
    colors[i * 4] = 0.5 + lift * 0.5
    colors[i * 4 + 1] = 0.62 + lift * 0.38
    colors[i * 4 + 2] = 0.7 + lift * 0.3
    colors[i * 4 + 3] = smoothstep(0.004, 0.07, height)
  }

  position.needsUpdate = true
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 4))
  geometry.computeVertexNormals()
  return geometry
}

const CONTOUR_EPSILON = 1e-6

function interpolate(a: number, b: number, level: number) {
  const span = b - a
  return Math.abs(span) < CONTOUR_EPSILON ? 0.5 : (level - a) / span
}

/**
 * Marching squares over the sampled grid. One geometry per level so each ring
 * can be revealed on its own schedule without a custom shader.
 */
export function createContourGeometries(levels: readonly number[], segments = TERRAIN_SEGMENTS) {
  const { values, size } = sampleGrid(segments)
  const toWorldX = (col: number) => (col / segments - 0.5) * TERRAIN_WIDTH
  const toWorldZ = (row: number) => (row / segments - 0.5) * TERRAIN_DEPTH

  return levels.map((level) => {
    const points: number[] = []
    const y = level * TERRAIN_HEIGHT + 0.012

    for (let row = 0; row < segments; row += 1) {
      for (let col = 0; col < segments; col += 1) {
        const tl = values[row * size + col]
        const tr = values[row * size + col + 1]
        const bl = values[(row + 1) * size + col]
        const br = values[(row + 1) * size + col + 1]

        const code =
          (tl > level ? 1 : 0) | (tr > level ? 2 : 0) | (br > level ? 4 : 0) | (bl > level ? 8 : 0)
        if (code === 0 || code === 15) continue

        const top = [toWorldX(col + interpolate(tl, tr, level)), y, toWorldZ(row)]
        const bottom = [toWorldX(col + interpolate(bl, br, level)), y, toWorldZ(row + 1)]
        const left = [toWorldX(col), y, toWorldZ(row + interpolate(tl, bl, level))]
        const right = [toWorldX(col + 1), y, toWorldZ(row + interpolate(tr, br, level))]

        const edges: number[][][] = []
        if (code === 1 || code === 14) edges.push([left, top])
        else if (code === 2 || code === 13) edges.push([top, right])
        else if (code === 3 || code === 12) edges.push([left, right])
        else if (code === 4 || code === 11) edges.push([right, bottom])
        else if (code === 6 || code === 9) edges.push([top, bottom])
        else if (code === 7 || code === 8) edges.push([left, bottom])
        else if (code === 5) edges.push([left, top], [right, bottom])
        else if (code === 10) edges.push([left, bottom], [top, right])

        for (const [from, to] of edges) points.push(...from, ...to)
      }
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(points, 3))
    return geometry
  })
}

/** Deterministic points sitting just proud of the summit, for the node overlay. */
export function surfaceNodes(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const nx = (hash(index * 1.7, 4.2) - 0.5) * 2 * MASSIF_A
    const nz = (hash(index * 3.3, 8.1) - 0.5) * 2 * MASSIF_B
    const height = terrainHeight(nx, nz)
    return {
      position: [
        (nx / 2) * TERRAIN_WIDTH,
        height * TERRAIN_HEIGHT + 0.04,
        (nz / 2) * TERRAIN_DEPTH,
      ] as [number, number, number],
      height,
    }
  }).filter((node) => node.height > 0.55)
}
