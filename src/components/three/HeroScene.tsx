import { Canvas } from '@react-three/fiber'
import { ConnectionField } from './ConnectionField'
import { LeMorne } from './LeMorne'

const TURQUOISE = '#22e5ae'
const CORAL = '#ff6b45'

/**
 * `offsetX` slides the whole scene toward the right of a full-width canvas, so
 * the headline never has moving geometry behind it and no container edge shows.
 */
export default function HeroScene({
  animate,
  offsetX = 0,
  scale = 1,
}: {
  readonly animate: boolean
  readonly offsetX?: number
  readonly scale?: number
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
      <ambientLight intensity={0.42} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color={TURQUOISE} />
      <directionalLight position={[-5, 0.5, -2]} intensity={0.55} color={CORAL} />
      <group position={[offsetX, 0, 0]}>
        <LeMorne animate={animate} scale={scale} />
        <ConnectionField scale={scale} />
      </group>
    </Canvas>
  )
}
