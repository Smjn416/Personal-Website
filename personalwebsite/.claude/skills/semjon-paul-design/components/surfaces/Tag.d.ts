import type { CSSProperties, ReactNode } from 'react'

export interface TagProps {
  /** Argon wash and border — use for the one tag that matters (usually the year) */
  accent?: boolean
  style?: CSSProperties
  children?: ReactNode
}

export declare function Tag(props: TagProps): JSX.Element
