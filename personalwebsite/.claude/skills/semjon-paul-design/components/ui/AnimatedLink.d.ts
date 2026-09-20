import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react'

export interface AnimatedLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style' | 'href'> {
  href: string
  external?: boolean
  /** accent = Argon (default), body/strong for links inside running copy */
  tone?: 'accent' | 'body' | 'strong'
  style?: CSSProperties
  children?: ReactNode
}

export declare function AnimatedLink(props: AnimatedLinkProps): JSX.Element
