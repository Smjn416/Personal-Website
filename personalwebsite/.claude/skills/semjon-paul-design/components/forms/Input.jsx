import React, { useState, forwardRef } from 'react'

export const fieldSurface = (focus, invalid) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.75rem 1rem',
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-body)',
  lineHeight: 'var(--leading-snug)',
  color: 'var(--text-strong)',
  background: 'var(--surface-inset)',
  borderRadius: 'var(--radius-field)',
  border: `1px solid ${invalid ? 'var(--signal-danger)' : focus ? 'var(--border-accent)' : 'var(--border-soft)'}`,
  boxShadow: focus && !invalid ? 'var(--glow-accent-soft)' : 'none',
  outline: 'none',
  transition: 'border-color var(--dur-fast) var(--ease-glide), box-shadow var(--dur-fast) var(--ease-glide), background-color var(--dur-fast) var(--ease-glide)',
})

/** Single-line text field. Sunken, not raised — inputs read as cut into the page. */
export const Input = forwardRef(function Input({ invalid = false, style, onFocus, onBlur, ...rest }, ref) {
  const [focus, setFocus] = useState(false)
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      onFocus={(e) => { setFocus(true); onFocus?.(e) }}
      onBlur={(e) => { setFocus(false); onBlur?.(e) }}
      style={{ ...fieldSurface(focus, invalid), ...style }}
      {...rest}
    />
  )
})
