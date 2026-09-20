import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react'

export interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style' | 'href'> {
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  /** Opens in a new tab with rel="noreferrer noopener" */
  external?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  style?: CSSProperties
  children?: ReactNode
}

export declare function LinkButton(props: LinkButtonProps): JSX.Element
