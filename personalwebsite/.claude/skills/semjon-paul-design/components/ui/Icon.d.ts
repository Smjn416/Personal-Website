import type { CSSProperties } from 'react'

export interface IconProps {
  /** Lucide icon slug, kebab-case — e.g. "arrow-right", "arrow-up-right", "x", "menu" */
  name: string
  /** Square size in px (default 20) */
  size?: number
  style?: CSSProperties
}

export declare function Icon(props: IconProps): JSX.Element
