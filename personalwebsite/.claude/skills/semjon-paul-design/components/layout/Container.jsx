import React from 'react'

const WIDTHS = {
  wide: 'var(--container-max)',
  text: 'var(--container-text)',
  full: '100%',
}

/**
 * Horizontal page frame: max-width plus the fluid gutter.
 * Every DOM section sits inside one of these.
 */
export function Container({ width = 'wide', as = 'div', style, children, ...rest }) {
  const Tag = as
  return (
    <Tag
      style={{
        width: '100%',
        maxWidth: WIDTHS[width] ?? WIDTHS.wide,
        marginInline: 'auto',
        paddingInline: 'var(--gutter)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
