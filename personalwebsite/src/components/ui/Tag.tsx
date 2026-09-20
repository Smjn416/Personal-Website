import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type TagProps = {
  /** Argon wash and border — use for the one tag that matters (usually the year) */
  accent?: boolean
  className?: string
  children?: ReactNode
}

/** Small mono pill for stacks, years and disciplines. Non-interactive. */
export function Tag({ accent = false, className, children }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-[0.7rem] py-[0.3rem] font-mono text-xs leading-[1.2] tracking-[var(--tracking-mono)]',
        accent ? 'border-edge-accent bg-accent-wash text-accent' : 'border-soft bg-transparent text-dim',
        className
      )}
    >
      {children}
    </span>
  )
}
