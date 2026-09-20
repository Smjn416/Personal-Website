import type { CSSProperties, ReactNode } from 'react'

export interface MagneticButtonProps {
  /** Fraction of the pointer offset applied as translation (default --magnet-strength, 0.18) */
  strength?: number
  /** Pixels beyond the element's own box where the pull begins */
  radius?: number
  style?: CSSProperties
  children?: ReactNode
}

export declare function MagneticButton(props: MagneticButtonProps): JSX.Element
