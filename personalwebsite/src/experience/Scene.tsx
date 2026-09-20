'use client'

import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

import { LinearSRGBColorSpace } from 'three'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraRig } from './CameraRig'
import { Lights } from './Lights'
import { Backdrop } from './Backdrop'
import { StormCloud } from './StormCloud'
import { NeuralPulses } from './NeuralPulses'

const EDGE_COLOR = '#050405'

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: false, outputColorSpace: LinearSRGBColorSpace}}>
      <fog attach="fog" args={[EDGE_COLOR, 6, 20]} />
      <Suspense fallback={null}>
        <Backdrop />
        <Lights />
        <CameraRig />
        <StormCloud />
        <NeuralPulses />
      </Suspense>
<EffectComposer>
  <Bloom intensity={1.0} luminanceThreshold={0.9} luminanceSmoothing={0.15} mipmapBlur />
  <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
</EffectComposer>
    </Canvas>
  )
}