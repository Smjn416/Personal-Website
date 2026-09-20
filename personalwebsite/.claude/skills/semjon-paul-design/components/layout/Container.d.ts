import type { CSSProperties, ElementType, ReactNode } from 'react'

export interface ContainerProps {
  /** wide = --container-max (88rem), text = --container-text (44rem), full = no cap */
  width?: 'wide' | 'text' | 'full'
  as?: ElementType
  style?: CSSProperties
  children?: ReactNode
}

export declare function Container(props: ContainerProps): JSX.Element
