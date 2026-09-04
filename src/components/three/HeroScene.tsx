import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import { BoxGeometry } from 'three'
import type { Group, Mesh } from 'three'

const TURQUOISE = '#22e5ae'
const CYAN = '#29bdf0'
const CORAL = '#ff6b45'

/** Three stacked slabs: the "stack" in MoriStack, echoing the isometric MS mark. */
function StackedLayers() {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.18) * 0.32
    group.current.position.y = Math.sin(t * 0.4) * 0.08
  })

  const layers = useMemo(
    () => [
      { y: -0.7, scale: 1.24, color: CYAN, opacity: 0.4 },
      { y: 0, scale: 1.02, color: TURQUOISE, opacity: 0.52 },
      { y: 0.7, scale: 0.8, color: CORAL, opacity: 0.44 },
    ],
    [],
  )

  return (
    <group ref={group}>
      {layers.map((layer) => {
        const geometry = new BoxGeometry(1.9 * layer.scale, 0.08, 1.9 * layer.scale)
        return (
          <group key={layer.y} position={[0, layer.y, 0]} rotation={[0, Math.PI / 4, 0]}>
            <mesh geometry={geometry}>
              <meshStandardMaterial
                color={layer.color}
                transparent
                opacity={layer.opacity}
                roughness={0.1}
                metalness={0.9}
                emissive={layer.color}
                emissiveIntensity={0.45}
              />
            </mesh>
            {/* A lit edge on each slab reads as the isometric bevel in the MS mark. */}
            <lineSegments>
              <edgesGeometry args={[geometry]} />
              <lineBasicMaterial color={layer.color} transparent opacity={0.9} />
            </lineSegments>
          </group>
        )
      })}
    </group>
  )
}

/** Nodes and edges: connected digital systems, data moving between them. */
function ConnectionField() {
  const group = useRef<Group>(null)

  const nodes = useMemo(() => {
    const count = 22
    return Array.from({ length: count }, (_, index) => {
      const angle = (index / count) * Math.PI * 2
      const radius = 3.1 + (index % 3) * 0.55
      return [
        Math.cos(angle) * radius,
        Math.sin(index * 1.7) * 1.5,
        Math.sin(angle) * radius * 0.55,
      ] as [number, number, number]
    })
  }, [])

  const edges = useMemo(
    () =>
      nodes.flatMap((node, index) => {
        const next = nodes[(index + 5) % nodes.length]
        return index % 2 === 0 ? [[node, next] as [number[], number[]]] : []
      }),
    [nodes],
  )

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.045
  })

  return (
    <group ref={group}>
      {nodes.map((position, index) => (
        <mesh key={`${position[0]}-${index}`} position={position}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshBasicMaterial color={index % 4 === 0 ? CORAL : TURQUOISE} />
        </mesh>
      ))}
      {edges.map(([from, to], index) => (
        <Line
          key={index}
          points={[from as [number, number, number], to as [number, number, number]]}
          color={CYAN}
          transparent
          opacity={0.16}
          lineWidth={1}
        />
      ))}
    </group>
  )
}

/** A low silhouette below the mark, referencing Le Morne Brabant. */
function MorneSilhouette() {
  const mesh = useRef<Mesh>(null)

  return (
    <mesh ref={mesh} position={[0, -2.35, -1.6]} rotation={[0, Math.PI / 8, 0]}>
      <coneGeometry args={[3.4, 1.9, 4, 1, true]} />
      <meshBasicMaterial color="#10405c" transparent opacity={0.55} wireframe />
    </mesh>
  )
}

/**
 * `offsetX` slides the whole scene toward the right of a full-width canvas, so
 * the headline never has moving geometry behind it and no container edge shows.
 */
export default function HeroScene({
  animate,
  offsetX = 0,
}: {
  readonly animate: boolean
  readonly offsetX?: number
}) {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 7.2], fov: 42 }}
      dpr={[1, 1.6]}
      frameloop={animate ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color={TURQUOISE} />
      <directionalLight position={[-5, -2, -3]} intensity={0.85} color={CORAL} />
      <group position={[offsetX, 0, 0]}>
        <Float speed={animate ? 1.1 : 0} rotationIntensity={0.22} floatIntensity={0.5}>
          <StackedLayers />
        </Float>
        <ConnectionField />
        <MorneSilhouette />
      </group>
    </Canvas>
  )
}
