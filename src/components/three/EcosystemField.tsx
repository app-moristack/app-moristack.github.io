import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, Matrix4, Vector3 } from 'three'
import type { BufferAttribute, Group, InstancedMesh } from 'three'

const TURQUOISE = '#22e5ae'
const CYAN = '#29bdf0'
const HOME = '#ffc94d'
const AUTO = '#c3d2e0'

/**
 * The five domains the ecosystem spans. Two carry a product's own colour, so
 * the ring around Le Morne reads as MoriHome and MoriCar orbiting MoriStack
 * rather than as decorative noise.
 */
const DOMAINS = [
  { color: HOME, radius: 3.25, height: 1.05, satellites: 4 },
  { color: AUTO, radius: 3.5, height: -0.55, satellites: 4 },
  { color: TURQUOISE, radius: 3.05, height: 1.5, satellites: 3 },
  { color: TURQUOISE, radius: 3.7, height: -1.15, satellites: 3 },
  { color: CYAN, radius: 3.35, height: 0.25, satellites: 4 },
] as const

const PULSE_COUNT = 5
const PULSE_SECONDS = 3.4

type Vec3 = [number, number, number]

function buildField() {
  const anchors: Vec3[] = []
  const satellites: { position: Vec3; color: string }[] = []
  const edges: number[] = []

  DOMAINS.forEach((domain, index) => {
    const angle = (index / DOMAINS.length) * Math.PI * 2
    const anchor: Vec3 = [
      Math.cos(angle) * domain.radius,
      domain.height,
      Math.sin(angle) * domain.radius * 0.55,
    ]
    anchors.push(anchor)

    for (let step = 0; step < domain.satellites; step += 1) {
      const spread = (step - (domain.satellites - 1) / 2) * 0.42
      satellites.push({
        position: [
          anchor[0] + Math.cos(angle + Math.PI / 2) * spread,
          anchor[1] + Math.sin(step * 2.1) * 0.32,
          anchor[2] + Math.sin(angle + Math.PI / 2) * spread * 0.6,
        ],
        color: domain.color,
      })
    }
  })

  // Every domain answers to the centre, then to its neighbour: a hub, not a mesh.
  anchors.forEach((anchor, index) => {
    edges.push(0, 0.35, 0, ...anchor)
    edges.push(...anchor, ...anchors[(index + 1) % anchors.length])
  })

  return { anchors, satellites, edges: new Float32Array(edges) }
}

/**
 * Nodes, domains and the links between them: the MoriStack ecosystem drawn
 * around the massif. Instanced and drawn as one line buffer, so the whole
 * field costs three draw calls however many nodes it holds.
 */
export function EcosystemField({
  scale,
  animate,
}: {
  readonly scale: number
  readonly animate: boolean
}) {
  const group = useRef<Group>(null)
  const anchorMesh = useRef<InstancedMesh>(null)
  const satelliteMesh = useRef<InstancedMesh>(null)
  const pulseMesh = useRef<InstancedMesh>(null)

  const field = useMemo(() => buildField(), [])

  useLayoutEffect(() => {
    const matrix = new Matrix4()
    const color = new Color()

    field.anchors.forEach((anchor, index) => {
      matrix.makeTranslation(...anchor)
      anchorMesh.current?.setMatrixAt(index, matrix)
      anchorMesh.current?.setColorAt(index, color.set(DOMAINS[index].color))
    })
    field.satellites.forEach((satellite, index) => {
      matrix.makeTranslation(...satellite.position)
      satelliteMesh.current?.setMatrixAt(index, matrix)
      satelliteMesh.current?.setColorAt(index, color.set(satellite.color))
    })

    for (const mesh of [anchorMesh.current, satelliteMesh.current]) {
      if (!mesh) continue
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) (mesh.instanceColor as BufferAttribute).needsUpdate = true
    }
  }, [field])

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.04

    const mesh = pulseMesh.current
    if (!mesh || !animate) return

    // Each pulse rides the centre -> domain leg on its own offset phase.
    const matrix = new Matrix4()
    const pulseScale = new Vector3()
    const time = state.clock.elapsedTime
    for (let index = 0; index < PULSE_COUNT; index += 1) {
      const anchor = field.anchors[index % field.anchors.length]
      const phase = (time / PULSE_SECONDS + index / PULSE_COUNT) % 1
      const eased = phase * phase * (3 - 2 * phase)
      matrix.makeTranslation(
        anchor[0] * eased,
        0.35 + (anchor[1] - 0.35) * eased,
        anchor[2] * eased,
      )
      const size = Math.sin(phase * Math.PI) * 1.4 + 0.15
      matrix.scale(pulseScale.setScalar(size))
      mesh.setMatrixAt(index, matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={group} scale={scale}>
      <instancedMesh ref={anchorMesh} args={[undefined, undefined, field.anchors.length]}>
        <sphereGeometry args={[0.085, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={satelliteMesh} args={[undefined, undefined, field.satellites.length]}>
        <sphereGeometry args={[0.042, 8, 8]} />
        <meshBasicMaterial transparent opacity={0.75} toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={pulseMesh} args={[undefined, undefined, PULSE_COUNT]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={TURQUOISE} transparent opacity={0.9} toneMapped={false} />
      </instancedMesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={CYAN} transparent opacity={0.17} depthWrite={false} />
      </lineSegments>
    </group>
  )
}
