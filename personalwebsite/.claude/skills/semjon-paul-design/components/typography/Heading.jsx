import React from 'react'

const SIZES = {
  display1: { fontSize: 'var(--text-display-1)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', fontWeight: 'var(--weight-light)' },
  display2: { fontSize: 'var(--text-display-2)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', fontWeight: 'var(--weight-light)' },
  1: { fontSize: 'var(--text-h1)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-heading)', fontWeight: 'var(--weight-medium)' },
  2: { fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-heading)', fontWeight: 'var(--weight-medium)' },
  3: { fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-snug)', letterSpacing: 'var(--tracking-heading)', fontWeight: 'var(--weight-medium)' },
}

/** Every heading in the system. `size` is visual, `level` is semantic. */
export function Heading({ level = 2, size, tone = 'strong', style, children, ...rest }) {
  const Tag = 'h' + Math.min(Math.max(Number(level) || 2, 1), 6)
  const key = size ?? level
  return (
    <Tag
      style={{
        margin: 0,
        color: tone === 'accent' ? 'var(--text-accent)' : tone === 'dim' ? 'var(--text-dim)' : 'var(--text-strong)',
        textWrap: 'balance',
        ...(SIZES[key] ?? SIZES[2]),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
