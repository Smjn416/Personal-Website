'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { MathUtils, CatmullRomCurve3, Vector3, Color } from 'three'

const VOLUME_SCALE: [number, number, number] = [1.3, 1.00, 1.0] // muss zur scale deiner StormCloud passen!
const PULSE_COUNT = 3
const DISPLACE_DEPTH = 3
const ROUGHNESS = 0.5
const ROUGHNESS_FALLOFF = 0.55
const WINDOW_SIZE = 0.22
const SAMPLES = 32
const BRANCH_CHANCE = 0.55
const BRANCH_DEPTH = 2
const HEAD_COLOR = new Color(2.4, 2.6, 3.0) // bewusst "übersteuert" heller als normales Weiß (1,1,1)


type Vec3 = [number, number, number]

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / len, v[1] / len, v[2] / len]
}

function randomPointInSphere(): Vec3 {
  let x = 0, y = 0, z = 0
  do {
    x = Math.random() * 2 - 1
    y = Math.random() * 2 - 1
    z = Math.random() * 2 - 1
  } while (x * x + y * y + z * z > 1)
  return [x, y, z]
}

function randomPerpendicularOffset(dir: Vec3, amount: number): Vec3 {
  const r = randomPointInSphere()
  const dot = r[0] * dir[0] + r[1] * dir[1] + r[2] * dir[2]
  const perp = normalize([r[0] - dot * dir[0], r[1] - dot * dir[1], r[2] - dot * dir[2]])
  return [perp[0] * amount, perp[1] * amount, perp[2] * amount]
}

function midpointDisplace(a: Vec3, b: Vec3, depth: number, roughness: number): Vec3[] {
  if (depth <= 0) return [a, b]
  const mid: Vec3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]
  const segDir = normalize([b[0] - a[0], b[1] - a[1], b[2] - a[2]])
  const segLen = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2])
  const offset = randomPerpendicularOffset(segDir, segLen * roughness * (0.6 + Math.random() * 0.8))
  const displaced: Vec3 = [mid[0] + offset[0], mid[1] + offset[1], mid[2] + offset[2]]
  const left = midpointDisplace(a, displaced, depth - 1, roughness * ROUGHNESS_FALLOFF)
  const right = midpointDisplace(displaced, b, depth - 1, roughness * ROUGHNESS_FALLOFF)
  return [...left.slice(0, -1), ...right]
}

function buildCurve(from: Vec3, to: Vec3, depth: number, roughness: number): CatmullRomCurve3 {
  const controlPoints = midpointDisplace(from, to, depth, roughness)
  return new CatmullRomCurve3(controlPoints.map(([x, y, z]) => new Vector3(x, y, z)))
}

function sampleCurveWindow(curve: CatmullRomCurve3, headT: number): Vec3[] {
  const pts: Vec3[] = []
  for (let i = 0; i < SAMPLES; i++) {
    const localT = i / (SAMPLES - 1)
    const t = MathUtils.clamp(headT - WINDOW_SIZE + localT * WINDOW_SIZE, 0, 1)
    const p = curve.getPointAt(t)
    pts.push([p.x, p.y, p.z])
  }
  return pts
}

function toFlatScaled(points: Vec3[]): number[] {
  return points.flatMap(([x, y, z]) => [
    x * VOLUME_SCALE[0],
    y * VOLUME_SCALE[1],
    z * VOLUME_SCALE[2],
  ])
}

function Pulse() {
  const lineRef = useRef<any>(null)
  const branchRef = useRef<any>(null)

  const state = useRef({
    curve: null as CatmullRomCurve3 | null,
    startTime: 0,
    duration: 0,
    nextFireDelay: Math.random() * 2,
    firing: false,
    branchCurve: null as CatmullRomCurve3 | null,
    branchForkT: 0,
    branchDuration: 0,
    branchFired: false,
    branchStartTime: 0,
  })

  const initialPoints = useMemo<Vec3[]>(() => Array.from({ length: SAMPLES }, () => [0, 0, 0]), [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const s = state.current
    const line = lineRef.current
    const branch = branchRef.current
    if (!line || !branch) return

    if (!s.firing) {
      if (time - s.startTime > s.nextFireDelay) {
        s.curve = buildCurve(randomPointInSphere(), randomPointInSphere(), DISPLACE_DEPTH, ROUGHNESS)
        s.duration = 0.6 + Math.random() * 0.7
        s.startTime = time
        s.firing = true
        s.branchFired = false
        s.branchCurve = null

        if (Math.random() < BRANCH_CHANCE) {
          const forkT = 0.3 + Math.random() * 0.4
          const forkPoint = s.curve.getPointAt(forkT)
          const forkDir = randomPointInSphere()
          const branchEnd: Vec3 = [
            forkPoint.x + forkDir[0] * 0.5,
            forkPoint.y + forkDir[1] * 0.5,
            forkPoint.z + forkDir[2] * 0.5,
          ]
          s.branchCurve = buildCurve([forkPoint.x, forkPoint.y, forkPoint.z], branchEnd, BRANCH_DEPTH, ROUGHNESS * 1.3)
          s.branchForkT = forkT
          s.branchDuration = s.duration * 0.5
        }
      }
      line.visible = false
      branch.visible = false
      return
    }

    const headT = (time - s.startTime) / s.duration
    if (headT >= 1 + WINDOW_SIZE) {
      s.firing = false
      s.startTime = time
      s.nextFireDelay = 0.15 + Math.random() * 1.2
      line.visible = false
      branch.visible = false
      return
    }

    line.visible = true
    line.geometry.setPositions(toFlatScaled(sampleCurveWindow(s.curve!, headT)))

    if (s.branchCurve) {
      if (!s.branchFired && headT >= s.branchForkT) {
        s.branchFired = true
        s.branchStartTime = time
      }
      if (s.branchFired) {
        const branchT = (time - s.branchStartTime) / s.branchDuration
        if (branchT <= 1 + WINDOW_SIZE) {
          branch.visible = true
          branch.geometry.setPositions(toFlatScaled(sampleCurveWindow(s.branchCurve, branchT)))
        } else {
          branch.visible = false
        }
      }
    }
  })

  return (
    <>
      <Line ref={lineRef} points={initialPoints} color="#eaf4ff" lineWidth={2.5} transparent toneMapped={false} />
      <Line ref={branchRef} points={initialPoints} color="#bcd0ff" lineWidth={1.2} transparent opacity={0.6} toneMapped={false} />
    </>
  )
}

export function NeuralPulses() {
  return (
    <>
      {Array.from({ length: PULSE_COUNT }, (_, i) => (
        <Pulse key={i} />
      ))}
    </>
  )
}