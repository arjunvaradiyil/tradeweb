'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

// Abstract global financial network: a rotating globe of linked nodes over a liquidity-wave plane.
function Network() {
  const group = useRef<THREE.Group>(null)
  const wave = useRef<THREE.Points>(null)

  const { nodes, lines } = useMemo(() => {
    const n = 140
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < n; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      pts.push(new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.cos(phi), Math.sin(theta) * Math.sin(phi)).multiplyScalar(1.6))
    }
    const seg: number[] = []
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++) if (pts[i].distanceTo(pts[j]) < 0.55) seg.push(...pts[i].toArray(), ...pts[j].toArray())
    return {
      nodes: new THREE.BufferGeometry().setFromPoints(pts),
      lines: new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(seg, 3)),
    }
  }, [])

  const waveGeo = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let x = -30; x <= 30; x++) for (let z = -14; z <= 14; z++) pts.push(new THREE.Vector3(x * 0.2, 0, z * 0.2))
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.12 + pointer.x * 0.4
      group.current.rotation.x = pointer.y * 0.2
    }
    const pos = wave.current?.geometry.attributes.position
    if (pos) {
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), z = pos.getZ(i)
        pos.setY(i, Math.sin(x * 0.7 + t * 1.2) * 0.25 + Math.cos(z * 0.9 + t) * 0.2)
      }
      pos.needsUpdate = true
    }
  })

  return (
    <>
      <group ref={group}>
        <points geometry={nodes}><pointsMaterial color="#0a8f5b" size={0.06} sizeAttenuation /></points>
        <lineSegments geometry={lines}><lineBasicMaterial color="#0b2a4a" transparent opacity={0.22} /></lineSegments>
      </group>
      <points ref={wave} geometry={waveGeo} position={[0, -2.3, -2]}><pointsMaterial color="#009dfd" size={0.035} transparent opacity={0.7} sizeAttenuation /></points>
    </>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0.4, 5.2], fov: 50 }} dpr={[1, 1.75]} aria-hidden>
      <Network />
    </Canvas>
  )
}
