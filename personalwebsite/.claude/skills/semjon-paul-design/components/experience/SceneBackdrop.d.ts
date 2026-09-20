import type { CSSProperties } from 'react'

export interface SceneBackdropProps {
  /** position: fixed (default) so it stays behind the whole scroll; false = absolute within a parent */
  fixed?: boolean
  /** Track the cursor for the subtle brightness lift (default true) */
  interactive?: boolean
  style?: CSSProperties
}

export declare function SceneBackdrop(props: SceneBackdropProps): JSX.Element
