import type { CSSProperties, ElementType, ReactNode } from 'react'

export interface TextRevealProps {
  /** Plain string to split per word. Prefer this over children for the word stagger. */
  text?: string
  as?: ElementType
  /** Seconds before the first word moves */
  delay?: number
  /** Seconds between words (default matches --stagger-base) */
  stagger?: number
  /** Replay whenever the element re-enters the viewport */
  once?: boolean
  style?: CSSProperties
  children?: ReactNode
}

export declare function TextReveal(props: TextRevealProps): JSX.Element
