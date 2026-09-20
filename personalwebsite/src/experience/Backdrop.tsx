'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, BackSide, Color } from 'three'

// ── Hier an den Farben rumspielen ──────────────────────────────────────

// HEX Charcoal #120e10
// HEX red #4d211f
// Normale Hex-Codes, wie in CSS/Figma. Einfach ändern und speichern.
const BASE_COLOR = '#4d211f' // Grundfarbe der Kugel ("das Charcoal")
const FOG_TINT = '#630e0e'   // Farbton des Nebels ("das Rötliche")

//const FOG_TINT = '#630e0e' // Stufe 1 — minimal gedimmt
//const FOG_TINT = '#560c0c' // Stufe 2
//const FOG_TINT = '#480a0a' // Stufe 3
//const FOG_TINT = '#370808' // Stufe 4
//const FOG_TINT = '#270506' // Stufe 5 — fast schwarzrot, kaum noch als "rot" erkennbar

type BackdropUniforms = {
  uTime: { value: number }
  uBaseColor: { value: Color }
  uFogTint: { value: Color }
}

const vertexShader = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uFogTint;
  varying vec3 vDir;

  float hash3(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  float noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(hash3(i + vec3(0.0, 0.0, 0.0)), hash3(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash3(i + vec3(0.0, 1.0, 0.0)), hash3(i + vec3(1.0, 1.0, 0.0)), f.x),
        f.y
      ),
      mix(
        mix(hash3(i + vec3(0.0, 0.0, 1.0)), hash3(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash3(i + vec3(0.0, 1.0, 1.0)), hash3(i + vec3(1.0, 1.0, 1.0)), f.x),
        f.y
      ),
      f.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise3(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 dir = normalize(vDir);

    // A: etwas schnellerer Wind
    // Schnell — Nebel "zieht" sichtbar vorbei, eher wie Wetterfront als wie Luft
    vec3 wind = vec3(uTime * 0.156, uTime * -0.108, uTime * 0.066);

    // B: Domain Warp — verzerrt die Abtastkoordinate unregelmäßig,
    // statt sie nur geradlinig zu verschieben
    vec3 warpP = dir * 1.1 + wind * 0.4;
    vec3 warp = vec3(
      noise3(warpP),
      noise3(warpP + vec3(5.2, 1.3, 7.1)),
      noise3(warpP + vec3(1.7, 9.4, 3.3))
    ) - 0.5;

    float fog = fbm(dir * 3.4 + wind + warp * 0.9);
    fog = smoothstep(0.38, 0.78, fog); // höhere untere Schwelle = mehr klare Fläche zwischen den Flecken

    vec3 color = uBaseColor * mix(0.85, 2.0, fog);
    color += uFogTint * fog * 0.55;

    float fine = noise3(dir * 6.0 + wind * 2.6);
    color += vec3(0.11, 0.09, 0.10) * fine * fog * 0.6;

    color += hash3(vec3(gl_FragCoord.xy, uTime * 60.0)) * 0.012;

    gl_FragColor = vec4(color, 1.0);
  }
`

export function Backdrop() {
  const meshRef = useRef<Mesh>(null)

  const uniforms = useMemo<BackdropUniforms>(
    () => ({
      uTime: { value: 0 },
      uBaseColor: { value: new Color(BASE_COLOR) },
      uFogTint: { value: new Color(FOG_TINT) },
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[30, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}