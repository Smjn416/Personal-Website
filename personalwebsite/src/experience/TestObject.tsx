'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

const ACCENT = '#ff4438' // --accent / --flare-400 aus dem Design System

export function TestObject() {
  const meshRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.15
    meshRef.current.rotation.y += delta * 0.25
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial color={ACCENT} roughness={0.35} metalness={0.1} />
    </mesh>
  )
}