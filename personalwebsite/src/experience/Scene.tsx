'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraRig } from './CameraRig'
import { Lights } from './Lights'

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <Suspense fallback={null}>
        <Lights />
        <CameraRig />
      </Suspense>
    </Canvas>
  )
}
