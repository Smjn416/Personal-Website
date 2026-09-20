import React from 'react'

/**
 * Label + hint + error wrapper for a single form control. Pairs with
 * React Hook Form: pass the field's error message straight through.
 */
export function Field({ label, htmlFor, hint, error, required = false, style, children, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }} {...rest}>
      {label && (
        <label
          htmlFor={htmlFor}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-label)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--text-accent)', marginLeft: '0.3em' }}>*</span>}
        </label>
      )}
      {children}
      {(error || hint) && (
        <p style={{
          margin: 0,
          fontSize: 'var(--text-xs)',
          lineHeight: 'var(--leading-snug)',
          color: error ? 'var(--signal-danger)' : 'var(--text-faint)',
        }}>
          {error || hint}
        </p>
      )}
    </div>
  )
}
