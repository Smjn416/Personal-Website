'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, DoubleSide, Color } from 'three'

const CLOUD_COLOR = '#1c1e2b' // kühles, dunkles Blaugrau — Kontrast zum warmen Charcoal
const RIM_COLOR = '#8fa0ff'   // kühles Rand-Licht, hebt die Silhouette ab

type CloudUniforms = {
  uTime: { value: number }
  uColor: { value: Color }
  uRimColor: { value: Color }
}

const vertexShader = /* glsl */ `
  varying vec3 vDir;
  varying vec3 vNormalView;
  varying vec3 vViewDir;
  void main() {
    vDir = normalize(position);
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vNormalView = normalize(normalMatrix * normal);
    vViewDir = normalize(-viewPos.xyz);
    gl_Position = projectionMatrix * viewPos;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uRimColor;
  varying vec3 vDir;
  varying vec3 vNormalView;
  varying vec3 vViewDir;

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
        mix(hash3(i + vec3(0.0,0.0,0.0)), hash3(i + vec3(1.0,0.0,0.0)), f.x),
        mix(hash3(i + vec3(0.0,1.0,0.0)), hash3(i + vec3(1.0,1.0,0.0)), f.x),
        f.y
      ),
      mix(
        mix(hash3(i + vec3(0.0,0.0,1.0)), hash3(i + vec3(1.0,0.0,1.0)), f.x),
        mix(hash3(i + vec3(0.0,1.0,1.0)), hash3(i + vec3(1.0,1.0,1.0)), f.x),
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
      p *= 2.05;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    
    vec3 dir = normalize(vDir);
    vec3 wind = vec3(uTime * 0.09, uTime * -0.07, uTime * 0.05);
    float churn = fbm(dir * 2.6 + wind);

    // Deutlich sichtbarer Helligkeitskontrast durch die Nebel-Variation
    vec3 color = uColor * mix(0.5, 2.0, churn);

    // Normale für Vorder- UND Rückseite der durchsichtigen Kugel korrekt ausrichten
    vec3 n = gl_FrontFacing ? normalize(vNormalView) : -normalize(vNormalView);
    float facing = max(dot(n, normalize(vViewDir)), 0.0); // 1 = Zentrum, 0 = Silhouette

    float core = smoothstep(0.0, 0.75, facing);   // vorher: 0.05, 0.55 — breiterer Übergang, läuft länger aus

    float rim = pow(1.0 - facing, 4.5);           // vorher: 3.0 — Glanzstreifen wird schmaler
    color += uRimColor * rim * 0.01;              // vorher: 0.2 — deutlich zurückhaltender
    

    float alpha = core * mix(0.5, 0.95, churn);

    gl_FragColor = vec4(color, alpha);
    
  }
`

export function StormCloud() {
  const meshRef = useRef<Mesh>(null)

  const uniforms = useMemo<CloudUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new Color(CLOUD_COLOR) },
      uRimColor: { value: new Color(RIM_COLOR) },
    }),
    []
  )

  useFrame(({ clock }, delta) => {
    uniforms.uTime.value = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06
      meshRef.current.rotation.x += delta * 0.00
    }
  })

  return (
    <mesh ref={meshRef} scale={[1.4, 1.05, 1.2]}>
      <sphereGeometry args={[1, 48, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}