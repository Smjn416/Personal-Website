import type { CSSProperties, ReactNode } from 'react'

export interface SectionProps {
  id?: string
  /** Uppercase mono label shown beside the index, e.g. "Selected work" */
  label?: string
  /** Two-digit section index, e.g. "01" */
  index?: string
  /** Use --space-section-tight instead of --space-section */
  tight?: boolean
  /** Skip the inner Container so children can run edge-to-edge */
  bleed?: boolean
  /** Top hairline rule (default true) */
  hairline?: boolean
  width?: 'wide' | 'text' | 'full'
  style?: CSSProperties
  children?: ReactNode
}

export declare function Section(props: SectionProps): JSX.Element
