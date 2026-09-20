import type { CSSProperties, TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  invalid?: boolean
  rows?: number
  style?: CSSProperties
}

export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>
