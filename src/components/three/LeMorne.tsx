import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Matrix4, WireframeGeometry } from 'three'
import type { Group, InstancedMesh, LineBasicMaterial, MeshStandardMaterial } from 'three'
import {
  TERRAIN_WIDTH,
  createContourGeometries,
  createTerrainGeometry,
  surfaceNodes,
} from './leMorneTerrain'
import { heroScrollProgress, useHeroPointer } from './useHeroPointer'

const TEAL_DEEP = '#06283a'
const TURQUOISE = '#22e5ae'
const CYAN = '#29bdf0'
const CORAL = '#ff6b45'

const CONTOUR_LEVELS = [0.09, 0.2, 0.45, 0.68, 0.84]
const REVEAL_SECONDS = 2.4

/** Sits the massif low-right so the summit clears the headline and the CTAs. */
const BASE_Y = -0.9

/** A touch of nose-up so the summit plateau reads as a plateau, not a ridge. */
const BASE_TILT = 0.1

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value)
const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt))

/**
 * Le Morne Brabant as a digital topographic model. The build-in runs
 * contours -> wireframe -> solid fill, so the massif draws itself on load.
 */
export function LeMorne({ animate, scale = 1 }: { readonly animate: boolean; readonly scale?: number }) {
  const outer = useRef<Group>(null)
  const inner = useRef<Group>(null)
  const surface = useRef<MeshStandardMaterial>(null)
  const wire = useRef<LineBasicMaterial>(null)
  const contours = useRef<(LineBasicMaterial | null)[]>([])
  const nodes = useRef<InstancedMesh>(null)
  const nodeLinks = useRef<LineBasicMaterial>(null)
  const progress = useRef(animate ? 0 : 1)

  const pointer = useHeroPointer(animate)

  const terrain = useMemo(() => createTerrainGeometry(), [])
  const wireframe = useMemo(() => new WireframeGeometry(terrain), [terrain])
  const contourGeometries = useMemo(() => createContourGeometries(CONTOUR_LEVELS), [])
  const points = useMemo(() => surfaceNodes(26).slice(0, 11), [])

  const linkPositions = useMemo(() => {
    const values: number[] = []
    points.forEach((node, index) => {
      const next = points[(index + 3) % points.length]
      values.push(...node.position, ...next.position)
    })
    return new Float32Array(values)
  }, [points])

  useLayoutEffect(() => {
    if (!nodes.current) return
    const matrix = new Matrix4()
    points.forEach((node, index) => {
      matrix.makeTranslation(...node.position)
      nodes.current?.setMatrixAt(index, matrix)
    })
    nodes.current.instanceMatrix.needsUpdate = true
  }, [points])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    if (animate && progress.current < 1) {
      progress.current = Math.min(1, progress.current + dt / REVEAL_SECONDS)
    }
    const p = progress.current

    if (surface.current) surface.current.opacity = clamp01((p - 0.3) / 0.6)
    if (wire.current) {
      wire.current.opacity = p < 0.5 ? (p / 0.5) * 0.85 : 0.85 - ((p - 0.5) / 0.5) * 0.71
    }
    contours.current.forEach((material, index) => {
      if (material) material.opacity = clamp01((p - 0.04 - index * 0.07) / 0.24) * 0.7
    })
    const nodeReveal = clamp01((p - 0.68) / 0.32)
    if (nodes.current) nodes.current.visible = nodeReveal > 0.02
    if (nodeLinks.current) nodeLinks.current.opacity = nodeReveal * 0.32

    if (!inner.current || !outer.current) return

    if (!animate) {
      inner.current.rotation.set(BASE_TILT, -0.42, 0)
      inner.current.position.y = 0
      return
    }

    const t = state.clock.elapsedTime
    const targetY = pointer.current.x * 0.17
    const targetX = BASE_TILT + pointer.current.y * 0.07
    inner.current.rotation.y = damp(inner.current.rotation.y, targetY, 2.6, dt)
    inner.current.rotation.x = damp(inner.current.rotation.x, targetX, 2.6, dt)
    inner.current.position.y = Math.sin(t * 0.5) * 0.09

    // Recedes and sinks as the hero leaves, handing the eye to the next section.
    const s = heroScrollProgress()
    outer.current.position.y = BASE_Y - s * 1.9
    outer.current.position.z = -s * 2.4
    outer.current.rotation.z = s * 0.06
    const shrink = scale * (1 - s * 0.22)
    outer.current.scale.setScalar(shrink)
  })

  return (
    <group ref={outer} position={[0, BASE_Y, 0]} scale={scale}>
      <group ref={inner} rotation={[BASE_TILT, -0.42, 0]}>
        <mesh geometry={terrain} renderOrder={0}>
          <meshStandardMaterial
            ref={surface}
            color={TEAL_DEEP}
            vertexColors
            emissive={CYAN}
            emissiveIntensity={0.1}
            flatShading
            transparent
            opacity={0}
            roughness={0.72}
            metalness={0.24}
          />
        </mesh>

        <lineSegments geometry={wireframe} renderOrder={1}>
          <lineBasicMaterial ref={wire} color={TURQUOISE} transparent opacity={0} />
        </lineSegments>

        {contourGeometries.map((geometry, index) => (
          <lineSegments key={CONTOUR_LEVELS[index]} geometry={geometry}>
            <lineBasicMaterial
              ref={(material) => {
                contours.current[index] = material
              }}
              color={index === CONTOUR_LEVELS.length - 1 ? CORAL : CYAN}
              transparent
              opacity={0}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        ))}

        <instancedMesh ref={nodes} args={[undefined, undefined, points.length]} visible={false}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={TURQUOISE} />
        </instancedMesh>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={nodeLinks}
            color={TURQUOISE}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </lineSegments>

        <gridHelper
          args={[TERRAIN_WIDTH * 1.15, 14, CYAN, CYAN]}
          position={[0, -0.02, 0]}
          material-transparent
          material-opacity={0.09}
          material-depthWrite={false}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
          <ringGeometry args={[TERRAIN_WIDTH * 0.46, TERRAIN_WIDTH * 0.484, 64]} />
          <meshBasicMaterial
            color={TURQUOISE}
            transparent
            opacity={0.16}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}
