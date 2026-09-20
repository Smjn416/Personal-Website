'use client'

import { OrbitControls } from '@react-three/drei'

export function CameraRig() {
  return (
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.5}
      minPolarAngle={0.01}
      maxPolarAngle={Math.PI - 0.01}
    />
  )
}