import React from 'react'

/**
 * Lucide icon rendered as a CSS mask over currentColor, so icons inherit text
 * colour and need no bundler. `name` is any Lucide icon slug, kebab-case.
 *
 * NOTE: no icon set exists in the source repository — Lucide (1.5px stroke,
 * rounded caps) is a substitution chosen to match the system's hairline weight.
 */
const CDN = 'https://unpkg.com/lucide-static@latest/icons/'

export function Icon({ name, size = 20, style, ...rest }) {
  const url = `url("${CDN}${name}.svg")`
  return (
    <span
      aria-hidden="true"
      data-icon={name}
      style={{
        display: 'inline-block',
        flexShrink: 0,
        width: size,
        height: size,
        background: 'currentColor',
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        ...style,
      }}
      {...rest}
    />
  )
}
