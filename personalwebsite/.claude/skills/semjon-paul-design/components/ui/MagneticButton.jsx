import React, { useRef, useState, useEffect } from 'react'

/**
 * Wrapper that pulls its child toward the cursor by --magnet-strength of the
 * pointer offset while hovering, then glides back on leave. Used on hero CTAs
 * where the DOM needs to feel as physical as the 3D scene behind it.
 */
export function MagneticButton({ strength = 0.18, radius = 120, style, children, ...rest }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const onMove = (e) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    const dist = Math.hypot(dx, dy)
    const falloff = Math.max(0, 1 - dist / (radius + r.width / 2))
    setOffset({ x: dx * strength * falloff, y: dy * strength * falloff })
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ display: 'inline-block', ...style }}
      {...rest}
    >
      <span
        style={{
          display: 'inline-block',
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: offset.x === 0 && offset.y === 0
            ? 'transform var(--dur-slow) var(--ease-glide)'
            : 'transform var(--dur-instant) var(--ease-linear)',
          willChange: 'transform',
        }}
      >
        {children}
      </span>
    </span>
  )
}
