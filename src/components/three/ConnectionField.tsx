import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Matrix4 } from 'three'
import type { Group, InstancedMesh } from 'three'

const TURQUOISE = '#22e5ae'
const CYAN = '#29bdf0'
const CORAL = '#ff6b45'

const NODE_COUNT = 22

function nodeAt(index: number): [number, number, number] {
  const angle = (index / NODE_COUNT) * Math.PI * 2
  const radius = 3.1 + (index % 3) * 0.55
  return [Math.cos(angle) * radius, Math.sin(index * 1.7) * 1.5, Math.sin(angle) * radius * 0.55]
}

/**
 * Nodes and edges: connected digital systems, data moving between them.
 * Instanced by colour and drawn as one line buffer, so the whole field costs
 * three draw calls rather than one per node.
 */
export function ConnectionField({ scale }: { readonly scale: number }) {
  const group = useRef<Group>(null)
  const turquoise = useRef<InstancedMesh>(null)
  const coral = useRef<InstancedMesh>(null)

  const field = useMemo(() => {
    const all = Array.from({ length: NODE_COUNT }, (_, index) => nodeAt(index))
    const values: number[] = []
    all.forEach((node, index) => {
      if (index % 2 !== 0) return
      values.push(...node, ...all[(index + 5) % all.length])
    })
    return {
      turquoiseNodes: all.filter((_, index) => index % 4 !== 0),
      coralNodes: all.filter((_, index) => index % 4 === 0),
      edges: new Float32Array(values),
    }
  }, [])

  useLayoutEffect(() => {
    const matrix = new Matrix4()

    for (let index = 0; index < field.turquoiseNodes.length; index += 1) {
      matrix.makeTranslation(...field.turquoiseNodes[index])
      turquoise.current?.setMatrixAt(index, matrix)
    }
    for (let index = 0; index < field.coralNodes.length; index += 1) {
      matrix.makeTranslation(...field.coralNodes[index])
      coral.current?.setMatrixAt(index, matrix)
    }

    if (turquoise.current) turquoise.current.instanceMatrix.needsUpdate = true
    if (coral.current) coral.current.instanceMatrix.needsUpdate = true
  }, [field])

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.045
  })

  return (
    <group ref={group} scale={scale}>
      <instancedMesh ref={turquoise} args={[undefined, undefined, field.turquoiseNodes.length]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshBasicMaterial color={TURQUOISE} />
      </instancedMesh>

      <instancedMesh ref={coral} args={[undefined, undefined, field.coralNodes.length]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshBasicMaterial color={CORAL} />
      </instancedMesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={CYAN} transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
    </group>
  )
}
