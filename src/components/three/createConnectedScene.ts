import * as THREE from 'three'
import { assetUrl } from '@/data/site.config'
import {
  CENTER,
  SCALE,
  JOURNEY,
  coastline,
  communities,
  connections,
  progress,
  stageAt,
} from './journey'

export type JourneyController = {
  setActive: (active: boolean) => void
  finish: () => void
  replay: () => void
  dispose: () => void
}
type Callbacks = {
  onStage: (stage: string) => void
  onReveal: () => void
  onStart: () => void
  onError: () => void
}
const radians = Math.PI / 180
function globePoint(lat: number, lon: number) {
  return new THREE.Vector3(
    Math.cos(lat * radians) * Math.cos(lon * radians),
    Math.sin(lat * radians),
    -Math.cos(lat * radians) * Math.sin(lon * radians),
  )
}
function elevation(x: number, y: number) {
  const ridge = Math.exp(-((x + 0.35) ** 2 / 0.3 + (y + 0.35) ** 2 / 0.9))
  const plateau = Math.exp(-((x - 0.15) ** 2 / 0.65 + (y + 0.15) ** 2 / 0.6))
  return 0.015 + 0.18 * ridge + 0.08 * plateau + 0.018 * Math.sin(x * 24 + y * 17) * ridge
}

function terrainGeometry(shape: THREE.Shape) {
  const indexed = new THREE.ShapeGeometry(shape)
  const flat = indexed.toNonIndexed()
  indexed.dispose()
  const positions: number[] = [],
    colors: number[] = []
  const dark = new THREE.Color('#164f49'),
    high = new THREE.Color('#6e9680')
  function triangle(a: THREE.Vector2, b: THREE.Vector2, c: THREE.Vector2, depth: number) {
    if (depth) {
      const ab = a.clone().lerp(b, 0.5),
        bc = b.clone().lerp(c, 0.5),
        ca = c.clone().lerp(a, 0.5)
      triangle(a, ab, ca, depth - 1)
      triangle(ab, b, bc, depth - 1)
      triangle(ca, bc, c, depth - 1)
      triangle(ab, bc, ca, depth - 1)
      return
    }
    for (const p of [a, b, c]) {
      const z = elevation(p.x, p.y)
      positions.push(p.x, p.y, z)
      const color = dark.clone().lerp(high, Math.min(1, z * 3.6))
      colors.push(color.r, color.g, color.b)
    }
  }
  const p = flat.getAttribute('position')
  for (let i = 0; i < p.count; i += 3)
    triangle(
      new THREE.Vector2(p.getX(i), p.getY(i)),
      new THREE.Vector2(p.getX(i + 1), p.getY(i + 1)),
      new THREE.Vector2(p.getX(i + 2), p.getY(i + 2)),
      3,
    )
  flat.dispose()
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  return geometry
}

function personTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.shadowColor = '#35d5ff'
  ctx.shadowBlur = 12
  ctx.fillStyle = '#092d40'
  ctx.strokeStyle = '#6ee5ff'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(64, 64, 43, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.shadowBlur = 0
  ctx.strokeStyle = '#d9fbff'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(64, 52, 10, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(45, 84)
  ctx.bezierCurveTo(45, 63, 83, 63, 83, 84)
  ctx.stroke()
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export async function createConnectedScene(
  host: HTMLElement,
  callbacks: Callbacks,
): Promise<JourneyController> {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setClearColor('#03111d', 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.00005, 80)
  const geometryResources = new Set<THREE.BufferGeometry>()
  const materialResources = new Set<THREE.Material>()
  const textures = new Set<THREE.Texture>()
  const geometry = <T extends THREE.BufferGeometry>(g: T) => {
    geometryResources.add(g)
    return g
  }
  const material = <T extends THREE.Material>(m: T) => {
    materialResources.add(m)
    return m
  }
  let disposed = false,
    active = false,
    frame = 0,
    last = 0,
    elapsed = 0,
    started = false,
    revealed = false,
    lastStage = ''
  let observer: ResizeObserver | undefined
  const dispose = () => {
    if (disposed) return
    disposed = true
    cancelAnimationFrame(frame)
    observer?.disconnect()
    renderer.domElement.removeEventListener('webglcontextlost', contextLost)
    geometryResources.forEach((g) => g.dispose())
    materialResources.forEach((m) => m.dispose())
    textures.forEach((t) => t.dispose())
    renderer.dispose()
    renderer.domElement.remove()
  }
  const contextLost = (event: Event) => {
    event.preventDefault()
    dispose()
    callbacks.onError()
  }
  try {
    const earthTexture = await new THREE.TextureLoader().loadAsync(assetUrl('launcher/earth.webp'))
    textures.add(earthTexture)
    earthTexture.colorSpace = THREE.SRGBColorSpace
    earthTexture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
    const globeMaterial = material(
      new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 12,
        specular: new THREE.Color('#173e51'),
      }),
    )
    const globe = new THREE.Mesh(geometry(new THREE.SphereGeometry(1, 96, 64)), globeMaterial)
    scene.add(globe)
    scene.add(new THREE.AmbientLight('#a3c9e3', 1.35))
    const sun = new THREE.DirectionalLight('#e5f5ff', 2.1)
    sun.position.set(3, 4, 5)
    scene.add(sun)
    const rim = new THREE.DirectionalLight('#30a8ff', 1.4)
    rim.position.set(-3, -1, -4)
    scene.add(rim)
    const atmosphereMaterial = material(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        vertexShader:
          'varying vec3 n; varying vec3 v; void main(){ vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal); v=normalize(-p.xyz); gl_Position=projectionMatrix*p; }',
        fragmentShader:
          'varying vec3 n; varying vec3 v; void main(){ float a=pow(max(0.,1.-abs(dot(n,v))),3.); gl_FragColor=vec4(.08,.48,.85,a*.6); }',
      }),
    )
    const atmosphere = new THREE.Mesh(
      geometry(new THREE.SphereGeometry(1.035, 64, 48)),
      atmosphereMaterial,
    )
    scene.add(atmosphere)
    // Stable, deterministic star field: no random changes on resize or remount.
    const stars: number[] = []
    for (let i = 0; i < 450; i++) {
      const a = i * 2.39996,
        y = 1 - (2 * (i + 0.5)) / 450,
        r = Math.sqrt(1 - y * y)
      stars.push(Math.cos(a) * r * 25, y * 25, Math.sin(a) * r * 25)
    }
    const starGeo = geometry(new THREE.BufferGeometry())
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(stars, 3))
    const starField = new THREE.Points(
      starGeo,
      material(
        new THREE.PointsMaterial({
          color: '#b9dfff',
          size: 0.025,
          transparent: true,
          opacity: 0.65,
        }),
      ),
    )
    scene.add(starField)

    const center = globePoint(CENTER.lat, CENTER.lon)
    const east = new THREE.Vector3(
      -Math.sin(CENTER.lon * radians),
      0,
      -Math.cos(CENTER.lon * radians),
    )
    const north = new THREE.Vector3().crossVectors(center, east).normalize()
    const island = new THREE.Group()
    island.position.copy(center.clone().multiplyScalar(1.00008))
    island.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(east, north, center))
    island.scale.setScalar(SCALE)
    scene.add(island)
    const shape = new THREE.Shape(coastline.map(([x, y]) => new THREE.Vector2(x, y)))
    const land = new THREE.Mesh(
      geometry(terrainGeometry(shape)),
      material(
        new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0.12 }),
      ),
    )
    island.add(land)
    const shore = new THREE.LineLoop(
      geometry(
        new THREE.BufferGeometry().setFromPoints(
          coastline.map(([x, y]) => new THREE.Vector3(x, y, elevation(x, y) + 0.008)),
        ),
      ),
      material(new THREE.LineBasicMaterial({ color: '#71f2df', transparent: true, opacity: 0.8 })),
    )
    island.add(shore)
    // High-detail island geometry takes over from the satellite map before texture blur.
    const oceanMaterial = material(
      new THREE.MeshBasicMaterial({
        color: '#082b40',
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    )
    const ocean = new THREE.Mesh(geometry(new THREE.CircleGeometry(18, 96)), oceanMaterial)
    ocean.position.z = -0.012
    island.add(ocean)
    for (let i = 0; i < 3; i++) {
      const reef = new THREE.LineLoop(
        geometry(
          new THREE.BufferGeometry().setFromPoints(
            coastline.map(
              ([x, y]) =>
                new THREE.Vector3(x * (1.035 + i * 0.027), y * (1.035 + i * 0.027), -0.003),
            ),
          ),
        ),
        material(
          new THREE.LineBasicMaterial({
            color: '#39c4dc',
            transparent: true,
            opacity: 0.2 - i * 0.045,
          }),
        ),
      )
      island.add(reef)
    }
    const iconMap = personTexture()
    textures.add(iconMap)
    const icons = communities.map(([x, y]) => {
      const sprite = new THREE.Sprite(
        material(
          new THREE.SpriteMaterial({
            map: iconMap,
            transparent: true,
            opacity: 0,
            depthTest: false,
            depthWrite: false,
          }),
        ),
      )
      sprite.position.set(x, y, elevation(x, y) + 0.26)
      // Keep person markers above the coastline and connection paths.
      sprite.renderOrder = 10
      island.add(sprite)
      const ring = new THREE.Mesh(
        geometry(new THREE.RingGeometry(0.085, 0.095, 40)),
        material(
          new THREE.MeshBasicMaterial({
            color: '#5ce4ff',
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            depthWrite: false,
          }),
        ),
      )
      ring.position.set(x, y, elevation(x, y) + 0.015)
      island.add(ring)
      return { sprite, ring }
    })
    const links = connections.map(([a, b], i) => {
      const start = icons[a].sprite.position.clone(),
        end = icons[b].sprite.position.clone()
      const middle = start.clone().lerp(end, 0.5)
      middle.z += 0.22 + start.distanceTo(end) * 0.09
      const curve = new THREE.QuadraticBezierCurve3(start, middle, end)
      const lineGeo = geometry(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)))
      const line = new THREE.Line(
        lineGeo,
        material(
          new THREE.LineBasicMaterial({ color: '#62dfff', transparent: true, opacity: 0.68 }),
        ),
      )
      island.add(line)
      const spark = new THREE.Mesh(
        geometry(new THREE.SphereGeometry(0.026, 8, 8)),
        material(new THREE.MeshBasicMaterial({ color: '#d9fbff' })),
      )
      island.add(spark)
      return { line, spark, curve, delay: i * 0.085 }
    })
    const pin = new THREE.Mesh(
      geometry(new THREE.SphereGeometry(0.009, 16, 12)),
      material(new THREE.MeshBasicMaterial({ color: '#77efff' })),
    )
    pin.position.copy(center.clone().multiplyScalar(1.009))
    scene.add(pin)
    const halo = new THREE.Mesh(
      geometry(new THREE.RingGeometry(0.018, 0.022, 48)),
      material(
        new THREE.MeshBasicMaterial({
          color: '#58dfff',
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      ),
    )
    halo.position.copy(pin.position)
    halo.quaternion.copy(island.quaternion)
    scene.add(halo)
    const localTarget = new THREE.Vector3(),
      closePosition = new THREE.Vector3(),
      target = new THREE.Vector3(),
      orbit = new THREE.Vector3()

    const render = () => {
      const t = elapsed,
        rotation = progress(t, JOURNEY.rotate, JOURNEY.zoom),
        zoom = progress(t, JOURNEY.zoom, JOURNEY.island)
      const final = progress(t, JOURNEY.title, JOURNEY.end)
      const fit = Math.max(1, 0.82 / camera.aspect)
      const distance =
        1 + Math.exp(THREE.MathUtils.lerp(Math.log(3.4 * fit), Math.log(0.024 * fit), zoom))
      orbit
        .copy(
          globePoint(
            THREE.MathUtils.lerp(16, CENTER.lat, rotation),
            THREE.MathUtils.lerp(-48, CENTER.lon, rotation),
          ),
        )
        .multiplyScalar(distance)
      // The camera approaches the same geodetic anchor, then tips toward the south.
      const tilt = progress(t, 5.3, 7.3)
      closePosition
        .copy(center)
        .multiplyScalar(1 + SCALE * (6.9 + final * 2.6) * fit)
        .addScaledVector(north, -SCALE * 3.7 * tilt * fit)
        .addScaledVector(east, SCALE * 0.65 * tilt)
      camera.position.copy(orbit).lerp(closePosition, tilt)
      localTarget
        .copy(center)
        .multiplyScalar(1.0002)
        .addScaledVector(north, SCALE * 1.9 * final)
      target.set(0, 0, 0).lerp(localTarget, zoom)
      camera.up.set(0, 1, 0).lerp(north, zoom).normalize()
      camera.lookAt(target)
      sun.position
        .set(3, 4, 5)
        .lerp(
          center.clone().multiplyScalar(3).addScaledVector(north, 2).addScaledVector(east, -2),
          zoom,
        )
      island.visible = t > 4.1
      oceanMaterial.opacity = progress(t, 4.4, 6.1)
      globe.visible = t < 6.4
      atmosphere.visible = t < 5.8
      starField.visible = t < 6.4
      pin.visible = t > 2.5 && t < 5.7
      halo.visible = pin.visible
      halo.scale.setScalar(1 + 0.25 * Math.sin(t * 3))
      halo.material.opacity = 0.5 + 0.15 * Math.sin(t * 3)
      icons.forEach(({ sprite, ring }, i) => {
        const p = progress(t, JOURNEY.people + i * 0.14, JOURNEY.people + i * 0.14 + 0.55)
        sprite.scale.setScalar(0.37 * p)
        sprite.material.opacity = p
        ring.material.opacity = p * (0.24 + 0.12 * Math.sin(t * 1.3 + i))
        ring.scale.setScalar(1 + 0.18 * Math.sin(t * 1.3 + i))
      })
      links.forEach(({ line, spark, curve, delay }, i) => {
        const p = progress(t, JOURNEY.links + delay, JOURNEY.links + delay + 0.9)
        line.geometry.setDrawRange(0, Math.floor(65 * p))
        spark.visible = p === 1 && i % 3 === 0
        spark.position.copy(curve.getPoint(((t - JOURNEY.links) * 0.12 + i * 0.23) % 1))
      })
      const caption = stageAt(t)
      if (caption !== lastStage) {
        lastStage = caption
        callbacks.onStage(caption)
      }
      if (t >= JOURNEY.title && !revealed) {
        revealed = true
        callbacks.onReveal()
      }
      renderer.render(scene, camera)
    }
    const tick = (now: number) => {
      if (disposed || !active) return
      if (!started) {
        started = true
        callbacks.onStart()
      }
      if (last) elapsed += (now - last) / 1000
      last = now
      try {
        render()
      } catch {
        dispose()
        callbacks.onError()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      if (!active) render()
    }
    host.appendChild(renderer.domElement)
    renderer.domElement.addEventListener('webglcontextlost', contextLost)
    observer = new ResizeObserver(resize)
    observer.observe(host)
    resize()
    return {
      setActive(value) {
        if (disposed || active === value) return
        active = value
        last = 0
        if (active) frame = requestAnimationFrame(tick)
        else cancelAnimationFrame(frame)
      },
      finish() {
        elapsed = JOURNEY.end
        render()
      },
      replay() {
        elapsed = 0
        last = 0
        revealed = false
        render()
      },
      dispose,
    }
  } catch (error) {
    dispose()
    throw error
  }
}
