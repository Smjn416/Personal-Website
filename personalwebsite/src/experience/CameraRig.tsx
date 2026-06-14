'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export function CameraRig() {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    // camera movement logic
  })

  return <group ref={groupRef} />
}
