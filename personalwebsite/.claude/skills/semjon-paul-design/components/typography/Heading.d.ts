import type { CSSProperties, ReactNode } from 'react'

export interface HeadingProps {
  /** Semantic heading level (renders h1–h6) and, unless `size` is set, the visual size */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Visual size, decoupled from the semantic level */
  size?: 'display1' | 'display2' | 1 | 2 | 3
  tone?: 'strong' | 'dim' | 'accent'
  style?: CSSProperties
  children?: ReactNode
}

export declare function Heading(props: HeadingProps): JSX.Element
