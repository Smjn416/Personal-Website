import React from 'react'

/** Small mono pill for stacks, years and disciplines. Non-interactive. */
export function Tag({ accent = false, style, children, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.3rem 0.7rem',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-mono)',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        color: accent ? 'var(--text-accent)' : 'var(--text-dim)',
        background: accent ? 'var(--accent-wash)' : 'transparent',
        border: `1px solid ${accent ? 'var(--border-accent)' : 'var(--border-soft)'}`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  )
}
