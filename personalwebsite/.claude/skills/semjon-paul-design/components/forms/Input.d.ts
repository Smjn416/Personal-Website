import type { CSSProperties, InputHTMLAttributes } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  /** Red border and aria-invalid — drive from the form's error state */
  invalid?: boolean
  style?: CSSProperties
}

export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>
