import type { CSSProperties, ReactNode } from 'react'

export interface FieldProps {
  label?: string
  /** Must match the control's id so the label is associated */
  htmlFor?: string
  /** Helper text, replaced by `error` when validation fails */
  hint?: string
  /** Validation message from Zod / React Hook Form */
  error?: string
  required?: boolean
  style?: CSSProperties
  children?: ReactNode
}

export declare function Field(props: FieldProps): JSX.Element
