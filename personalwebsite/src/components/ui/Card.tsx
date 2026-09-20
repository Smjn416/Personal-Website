'use client'

import { useState, type CSSProperties, type MouseEventHandler, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type CardProps = {
  /** Makes the whole card an anchor */
  href?: string
  external?: boolean
  /** glass = translucent ink over the scene (default), solid = opaque, outline = hairline only */
  variant?: 'glass' | 'solid' | 'outline'
  /** Two-digit index, e.g. "01" */
  index?: string
  /** Uppercase mono label above the title */
  label?: string
  title?: ReactNode
  /** Mono metadata line at the bottom, e.g. "Real-time GLSL · 2026" */
  meta?: ReactNode
  /** Media block above the text; scales 3% on hover */
  media?: ReactNode
  /** Force hover lift on/off (defaults to true when href is set) */
  interactive?: boolean
  style?: CSSProperties
  className?: string
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>
}

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
  className,
  children,
  onClick,
}: CardProps) {
  const [hover, setHover] = useState(false)
  const isLink = Boolean(href)
  const lift = (interactive ?? isLink) && hover

  const surfaceClasses =
    variant === 'solid'
      ? lift
        ? 'bg-ink-700'
        : 'bg-ink-850'
      : variant === 'outline'
        ? 'bg-transparent'
        : cn(
            lift ? 'bg-[var(--surface-card-hover)]' : 'bg-[var(--surface-card)]',
            '[backdrop-filter:var(--glass-backdrop)] [-webkit-backdrop-filter:var(--glass-backdrop)]'
          )

  const rootClassName = cn(
    'relative flex flex-col overflow-hidden rounded-card border text-inherit no-underline',
    'transition-[transform,border-color,background-color,box-shadow] duration-[var(--dur-base)] ease-glide',
    lift ? 'border-edge-accent -translate-y-1' : 'border-hairline translate-y-0',
    lift
      ? '[box-shadow:var(--shadow-lg),var(--highlight-top)]'
      : '[box-shadow:var(--shadow-md),var(--highlight-top)]',
    surfaceClasses,
    className
  )

  const content = (
    <>
      {media && (
        <div className="relative overflow-hidden bg-ink-900">
          <div
            className={cn(
              'transition-transform duration-[var(--dur-slow)] ease-glide',
              lift ? 'scale-[1.03]' : 'scale-100'
            )}
          >
            {media}
          </div>
        </div>
      )}
      {(index || label || title || meta || children) && (
        <div className="flex flex-col gap-2 p-6">
          {(index || label) && (
            <div
              className={cn(
                'flex items-baseline gap-3 font-mono text-label uppercase transition-colors duration-[var(--dur-base)] ease-glide',
                lift ? 'text-accent' : 'text-dim'
              )}
            >
              {index && <span className="text-faint">{index}</span>}
              {label && <span>{label}</span>}
            </div>
          )}
          {title && <h3 className="m-0 text-h3 font-medium text-strong">{title}</h3>}
          {children && (
            <div className="text-sm leading-[var(--leading-body)] text-dim">{children}</div>
          )}
          {meta && (
            <div className="mt-2 font-mono text-xs tracking-[var(--tracking-mono)] text-faint">
              {meta}
            </div>
          )}
        </div>
      )}
    </>
  )

  if (isLink) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
        className={rootClassName}
        style={style}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={rootClassName}
      style={style}
    >
      {content}
    </div>
  )
}
