import React, { useEffect, useRef, useState } from 'react'

/**
 * The system's single entrance animation: words rise --reveal-distance and fade
 * in on --dur-reveal / --ease-out, staggered by --stagger-base. Masked by an
 * overflow-hidden line box so words slide up from behind the baseline.
 * Honours prefers-reduced-motion by rendering the final state immediately.
 */
export function TextReveal({ text, as = 'span', delay = 0, stagger = 0.07, once = true, style, children, ...rest }) {
  const Tag = as
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setShown(true); return }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setShown(true); if (once) io.disconnect() }
          else if (!once) setShown(false)
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  const source = text ?? (typeof children === 'string' ? children : '')
  const words = source ? source.split(' ') : null

  if (!words) {
    return (
      <Tag ref={ref} style={{ display: 'block', overflow: 'hidden', ...style }} {...rest}>
        <span style={{
          display: 'block',
          transform: shown ? 'translateY(0)' : 'translateY(var(--reveal-distance))',
          opacity: shown ? 1 : 0,
          transition: `transform var(--dur-reveal) var(--ease-out) ${delay}s, opacity var(--dur-reveal) var(--ease-out) ${delay}s`,
        }}>{children}</span>
      </Tag>
    )
  }

  return (
    <Tag ref={ref} style={{ display: 'block', ...style }} {...rest}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <span style={{
            display: 'inline-block',
            transform: shown ? 'translateY(0)' : 'translateY(110%)',
            opacity: shown ? 1 : 0,
            transition: `transform var(--dur-reveal) var(--ease-out) ${delay + i * stagger}s, opacity var(--dur-reveal) var(--ease-out) ${delay + i * stagger}s`,
          }}>
            {w}{i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
