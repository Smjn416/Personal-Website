import type { CSSProperties, ReactNode } from 'react'

export interface CardProps {
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
  children?: ReactNode
}

export declare function Card(props: CardProps): JSX.Element
