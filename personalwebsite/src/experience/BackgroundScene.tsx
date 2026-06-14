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

    // Aspect-corrected distance for circular glow
    vec2 uvA     = vec2((uv.x      - 0.5) * uAspect, uv.y      - 0.5);
    vec2 mouseA  = vec2((uMouse.x  - 0.5) * uAspect, uMouse.y  - 0.5);
    float dist = length(uvA - mouseA);

    // Base deep navy-black
    vec3 base = vec3(0.010, 0.014, 0.028);

    // Glow layers (outer → inner)
    float outerGlow = smoothstep(0.85, 0.0, dist);
    float midGlow   = smoothstep(0.38, 0.0, dist);
    float innerGlow = smoothstep(0.14, 0.0, dist);

    vec3 outerColor = vec3(0.035, 0.055, 0.160);
    vec3 midColor   = vec3(0.060, 0.110, 0.380);
    vec3 innerColor = vec3(0.200, 0.360, 0.950);

    vec3 color = base;
    color = mix(color, outerColor, outerGlow * 0.65);
    color = mix(color, midColor,   midGlow   * 0.75);
    color = mix(color, innerColor, innerGlow * 0.80);

    // Slow ambient noise movement (alive when idle)
    float n  = noise(uv * 2.5 + uTime * 0.04);
    float n2 = noise(uv * 5.0 - uTime * 0.025);
    color += vec3(0.020, 0.035, 0.110) * (n + n2 * 0.5) * 0.018;

    // Film grain
    color += hash(uv + fract(uTime * 0.1)) * 0.012;

    // Edge vignette
    float vignette = smoothstep(1.1, 0.25, length(vec2((uv.x - 0.5) * uAspect, uv.y - 0.5)));
    color *= mix(0.35, 1.0, vignette);

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
    mouseSmooth.current.lerp(mouseTarget.current, 0.065)
    uniforms.uMouse.value.copy(mouseSmooth.current)
    uniforms.uAspect.value = viewport.width / viewport.height
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
