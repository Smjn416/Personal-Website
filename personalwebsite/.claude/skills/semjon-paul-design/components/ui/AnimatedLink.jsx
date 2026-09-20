import React, { useState } from 'react'

/**
 * Inline text link. The underline wipes in from the left on hover; the label
 * itself never moves, so it stays usable inside running copy.
 */
export function AnimatedLink({ href, external = false, tone = 'accent', style, children, ...rest }) {
  const [hover, setHover] = useState(false)
  const color = tone === 'body' ? 'var(--text-body)' : tone === 'strong' ? 'var(--text-strong)' : 'var(--text-accent)'
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        color: hover && tone !== 'accent' ? 'var(--text-strong)' : color,
        textDecoration: 'none',
        transition: 'color var(--dur-fast) var(--ease-glide)',
        ...style,
      }}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          bottom: '-0.12em',
          height: 1,
          width: '100%',
          background: 'currentColor',
          transformOrigin: 'left',
          transform: hover ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform var(--dur-base) var(--ease-glide)',
        }}
      />
    </a>
  )
}
