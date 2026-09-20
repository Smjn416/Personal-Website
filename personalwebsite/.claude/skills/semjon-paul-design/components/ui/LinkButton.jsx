import React, { useState } from 'react'
import { buttonVariant } from './Button'

const SIZES = {
  sm: { fontSize: 'var(--text-sm)', padding: '0.5rem 1rem', gap: 'var(--space-2)' },
  md: { fontSize: 'var(--text-body)', padding: '0.75rem 1.5rem', gap: 'var(--space-2)' },
  lg: { fontSize: 'var(--text-body-lg)', padding: '1rem 2.25rem', gap: 'var(--space-3)' },
}

/** Anchor styled exactly like Button. Use for navigation, not actions. */
export function LinkButton({
  href,
  variant = 'secondary',
  size = 'md',
  external = false,
  iconRight,
  iconLeft,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false)
  const [press, setPress] = useState(false)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false) }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-medium)',
        lineHeight: 1,
        borderRadius: 'var(--radius-control)',
        transform: press ? 'scale(var(--press-scale))' : hover ? 'translateY(var(--hover-lift))' : 'none',
        transition: 'transform var(--dur-fast) var(--ease-glide), background-color var(--dur-fast) var(--ease-glide), color var(--dur-fast) var(--ease-glide), border-color var(--dur-fast) var(--ease-glide), box-shadow var(--dur-fast) var(--ease-glide)',
        ...SIZES[size],
        ...buttonVariant(variant, hover, press),
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </a>
  )
}
