import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /** primary = Argon fill, secondary = glass pane, ghost = text only */
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  style?: CSSProperties
  children?: ReactNode
}

export declare function Button(props: ButtonProps): JSX.Element
