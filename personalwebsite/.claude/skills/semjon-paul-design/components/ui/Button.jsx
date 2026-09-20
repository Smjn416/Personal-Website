import React, { useState } from 'react'

const SIZES = {
  sm: { fontSize: 'var(--text-sm)', padding: '0.5rem 1rem', gap: 'var(--space-2)' },
  md: { fontSize: 'var(--text-body)', padding: '0.75rem 1.5rem', gap: 'var(--space-2)' },
  lg: { fontSize: 'var(--text-body-lg)', padding: '1rem 2.25rem', gap: 'var(--space-3)' },
}

export function buttonVariant(variant, hover, press) {
  if (variant === 'primary') {
    return {
      background: press ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent',
      boxShadow: hover ? 'var(--glow-accent-soft)' : 'none',
    }
  }
  if (variant === 'ghost') {
    return {
      background: hover ? 'var(--accent-wash)' : 'transparent',
      color: hover ? 'var(--text-strong)' : 'var(--text-body)',
      border: '1px solid transparent',
      boxShadow: 'none',
    }
  }
  return {
    background: hover ? 'var(--glass-bg-strong)' : 'var(--glass-bg)',
    color: 'var(--text-strong)',
    border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border-soft)'}`,
    boxShadow: hover ? 'var(--shadow-md), var(--highlight-top)' : 'var(--highlight-top)',
    backdropFilter: 'var(--glass-backdrop)',
    WebkitBackdropFilter: 'var(--glass-backdrop)',
  }
}

/** Pill control. Hover lifts 2px and brightens; press shrinks 1.5%. */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  iconRight,
  iconLeft,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false)
  const [press, setPress] = useState(false)
  const active = !disabled && hover
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false) }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-medium)',
        letterSpacing: 'var(--tracking-body)',
        lineHeight: 1,
        borderRadius: 'var(--radius-control)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        transform: !disabled && press ? 'scale(var(--press-scale))' : active ? 'translateY(var(--hover-lift))' : 'none',
        transition: 'transform var(--dur-fast) var(--ease-glide), background-color var(--dur-fast) var(--ease-glide), color var(--dur-fast) var(--ease-glide), border-color var(--dur-fast) var(--ease-glide), box-shadow var(--dur-fast) var(--ease-glide)',
        ...SIZES[size],
        ...buttonVariant(variant, active, !disabled && press),
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
