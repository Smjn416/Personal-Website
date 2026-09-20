import React, { useState } from 'react'

/**
 * The portfolio's one card: translucent ink over the 3D scene, hairline edge,
 * 1px top highlight, --radius-card. Hover lifts and warms the border.
 * `href` turns the whole card into a link.
 */
export function Card({
  href,
  external = false,
  variant = 'glass',
  index,
  label,
  title,
  meta,
  media,
  interactive,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false)
  const isLink = Boolean(href)
  const lift = (interactive ?? isLink) && hover
  const Tag = isLink ? 'a' : 'div'

  const surface = variant === 'solid'
    ? { background: lift ? 'var(--ink-700)' : 'var(--ink-850)' }
    : variant === 'outline'
      ? { background: 'transparent' }
      : {
          background: lift ? 'var(--surface-card-hover)' : 'var(--surface-card)',
          backdropFilter: 'var(--glass-backdrop)',
          WebkitBackdropFilter: 'var(--glass-backdrop)',
        }

  return (
    <Tag
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 'var(--radius-card)',
        border: `1px solid ${lift ? 'var(--border-accent)' : 'var(--border-hairline)'}`,
        boxShadow: lift ? 'var(--shadow-lg), var(--highlight-top)' : 'var(--shadow-md), var(--highlight-top)',
        transform: lift ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-glide), border-color var(--dur-base) var(--ease-glide), box-shadow var(--dur-base) var(--ease-glide), background-color var(--dur-base) var(--ease-glide)',
        ...surface,
        ...style,
      }}
      {...rest}
    >
      {media && (
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--ink-900)' }}>
          <div style={{
            transform: lift ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform var(--dur-slow) var(--ease-glide)',
          }}>{media}</div>
        </div>
      )}
      {(index || label || title || meta || children) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', padding: 'var(--space-6)' }}>
          {(index || label) && (
            <div style={{
              display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline',
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
              color: lift ? 'var(--text-accent)' : 'var(--text-dim)',
              transition: 'color var(--dur-base) var(--ease-glide)',
            }}>
              {index && <span style={{ color: 'var(--text-faint)' }}>{index}</span>}
              {label && <span>{label}</span>}
            </div>
          )}
          {title && (
            <h3 style={{
              margin: 0, fontSize: 'var(--text-h3)', fontWeight: 'var(--weight-medium)',
              letterSpacing: 'var(--tracking-heading)', lineHeight: 'var(--leading-snug)',
              color: 'var(--text-strong)',
            }}>{title}</h3>
          )}
          {children && <div style={{ color: 'var(--text-dim)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)' }}>{children}</div>}
          {meta && (
            <div style={{
              marginTop: 'var(--space-2)', fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-mono)',
              color: 'var(--text-faint)',
            }}>{meta}</div>
          )}
        </div>
      )}
    </Tag>
  )
}
