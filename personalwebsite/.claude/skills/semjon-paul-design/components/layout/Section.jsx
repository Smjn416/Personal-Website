import React from 'react'
import { Container } from './Container'

/**
 * Vertical rhythm unit. Owns --space-section padding and the optional
 * mono index label + hairline that opens each section of the portfolio.
 */
export function Section({
  id,
  label,
  index,
  tight = false,
  bleed = false,
  hairline = true,
  width = 'wide',
  style,
  children,
  ...rest
}) {
  const pad = tight ? 'var(--space-section-tight)' : 'var(--space-section)'
  const header = label || index
  return (
    <section
      id={id}
      style={{ position: 'relative', paddingBlock: pad, ...style }}
      {...rest}
    >
      {hairline && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '0 0 auto 0',
            height: 1,
            background: 'var(--gradient-hairline)',
          }}
        />
      )}
      {bleed ? (
        children
      ) : (
        <Container width={width}>
          {header && (
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-10)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-label)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
              }}
            >
              {index && <span style={{ color: 'var(--text-faint)' }}>{index}</span>}
              {label && <span>{label}</span>}
            </div>
          )}
          {children}
        </Container>
      )}
    </section>
  )
}
