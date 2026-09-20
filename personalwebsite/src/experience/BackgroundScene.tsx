'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import { Mesh, Vector2 } from 'three'

type BackgroundUniforms = {
  uMouse: { value: Vector2 }
  uAspect: { value: number }
  uTime: { value: number }
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = vUv;

    // Aspect-corrected coords
    vec2 uvA        = vec2((uv.x     - 0.5) * uAspect, uv.y     - 0.5);
    vec2 mouseA     = vec2((uMouse.x - 0.5) * uAspect, uMouse.y - 0.5);
    float mouseDist  = length(uvA - mouseA);
    float centerDist = length(uvA);

    // ── Dark indigo/navy background ──────────────────────────────
    vec3 edgeColor = vec3(0.028, 0.028, 0.070);  // ~#07071B corners
    vec3 fillColor = vec3(0.082, 0.080, 0.196);  // ~#151431 center

    float centerFade = smoothstep(0.90, 0.0, centerDist);
    vec3 color = mix(edgeColor, fillColor, centerFade);

    // Slow ambient noise — keeps it alive without mouse
    float n  = noise(uv * 2.0 + uTime * 0.03);
    float n2 = noise(uv * 4.5 - uTime * 0.02);
    color += vec3(0.012, 0.010, 0.035) * (n + n2 * 0.4) * 0.030;

    // ── Mouse: barely-visible brightness lift ────────────────────
    float spot = smoothstep(0.07, 0.0, mouseDist);
    color += color * spot * 0.10;

    // Film grain
    color += hash(uv + fract(uTime * 0.1)) * 0.010;

    // Edge vignette — corners fall off to near black
    float vignette = smoothstep(1.0, 0.10, centerDist);
    color *= mix(0.40, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`

function BackgroundPlane() {
  const { viewport } = useThree()
  const meshRef = useRef<Mesh>(null)
  const mouseTarget = useRef(new Vector2(0.5, 0.5))
  const mouseSmooth = useRef(new Vector2(0.5, 0.5))

  const uniforms = useMemo<BackgroundUniforms>(
    () => ({
      uMouse:  { value: new Vector2(0.5, 0.5) },
      uAspect: { value: 1.0 },
      uTime:   { value: 0 },
    }),
    []
  )

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      )
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    uniforms.uMouse.value.copy(mouseTarget.current)
    uniforms.uAspect.value = window.innerWidth / window.innerHeight
    uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}

export function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: false }}
      >
        <BackgroundPlane />
      </Canvas>
    </div>
  )
}
