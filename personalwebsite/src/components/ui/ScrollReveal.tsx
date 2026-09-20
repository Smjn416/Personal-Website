'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type ScrollRevealProps = {
  /** Selector for the elements to animate in, scoped to this wrapper */
  target: string
  children: ReactNode
}

/** The one entrance: rise and fade, staggered, gated on scroll position. */
export function ScrollReveal({ target, children }: ScrollRevealProps) {
  const root = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(target, { y: 0, opacity: 1 })
        return
      }

      gsap.from(target, {
        y: '2.5rem',
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    },
    { scope: root, dependencies: [reducedMotion] }
  )

  return <div ref={root}>{children}</div>
}
