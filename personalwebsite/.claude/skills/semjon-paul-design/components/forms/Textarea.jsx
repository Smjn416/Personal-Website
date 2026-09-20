import React, { useState, forwardRef } from 'react'
import { fieldSurface } from './Input'

/** Multi-line field. Matches Input exactly, with a fixed row count. */
export const Textarea = forwardRef(function Textarea({ invalid = false, rows = 5, style, onFocus, onBlur, ...rest }, ref) {
  const [focus, setFocus] = useState(false)
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      onFocus={(e) => { setFocus(true); onFocus?.(e) }}
      onBlur={(e) => { setFocus(false); onBlur?.(e) }}
      style={{ ...fieldSurface(focus, invalid), resize: 'vertical', minHeight: '6rem', ...style }}
      {...rest}
    />
  )
})
