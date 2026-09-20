# Motion

The complete motion contract. §7–9 of the codebase's `AGENTS.md` set the policy;
this file gives the values and the patterns.

## The division of labour

| Tool | Use it for |
| --- | --- |
| **GSAP + ScrollTrigger** | Timelines, pinned sections, scrubbed sequences, anything tied to scroll position, anything driving the 3D scene. |
| **Motion** | UI transitions: menu open/close, modal enter/exit, card state, layout shifts. |
| **CSS transitions** | Hover, focus and press on a single element. Every component in this system does its own micro-states this way, in inline styles. |
| **`TextReveal`** | Word-by-word entrance where GSAP is not already in the tree (specimen cards, templates, non-app contexts). |

Never drive the same element with GSAP and Motion at once.

## Tokens

```
--ease-glide  cubic-bezier(0.65, 0, 0.35, 1)   GSAP power2.inOut   default
--ease-out    cubic-bezier(0.22, 1, 0.36, 1)   GSAP power3.out     entrances
--ease-in     cubic-bezier(0.55, 0, 1, 0.45)   GSAP power2.in      exits

--dur-instant   90ms    press feedback
--dur-fast     180ms    hover, focus
--dur-base     320ms    state changes, card hover
--dur-slow     520ms    overlays, menus, magnet return
--dur-reveal   900ms    text reveals
--dur-scene   1400ms    camera moves

--stagger-tight  0.04s    dense lists
--stagger-base   0.07s    default
--stagger-loose  0.12s    large display words

--reveal-distance     2.5rem
--reveal-distance-lg  5rem
--hover-lift          -2px
--press-scale         0.985
--magnet-strength     0.18
```

## The one entrance

Rise and fade. Nothing else enters.

```
from: { y: var(--reveal-distance), opacity: 0 }
to:   { y: 0, opacity: 1 }
duration: var(--dur-reveal)
ease: var(--ease-out)
stagger: var(--stagger-base)
```

For display headings, mask each word in an `overflow: hidden` line box and
translate from `110%` so words slide up from behind their own baseline — that is
what `TextReveal` does, and what `SplitText` + `ScrollTrigger` should do in the
app.

## GSAP pattern

Always scoped, always cleaned up. Per §9:

```tsx
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function WorkIndex() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      gsap.from('.card', {
        y: '2.5rem',
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    },
    { scope: root }
  )

  return <section ref={root}>{/* … */}</section>
}
```

`useGSAP` with a `scope` handles teardown. Never `gsap.to` inside a bare
`useEffect` without reverting the context.

## Scroll-driven 3D

The scene and the DOM read the same scroll progress, and only one of them owns
it. Put progress in the Zustand store (§13: `scrollProgress`), write it from a
single ScrollTrigger, and let the `useFrame` loop read it.

Do not create a ScrollTrigger per 3D component, and do not animate camera
properties from more than one place.

## What never animates

`width`, `height`, `top`, `left`, `margin`, `padding`, `filter`, `box-shadow`.
Only `transform` and `opacity`. The one tolerated exception is `background-color`
on hover at `--dur-fast`, which is cheap enough at this scale.

No bounce, no elastic, no back, no spring. No parallax on text. No scroll-jacking
— the reader can always scroll past a pinned section, and mobile never pins
(§16, §19).

## Reduced motion

`tokens/base.css` collapses all durations under
`@media (prefers-reduced-motion: reduce)`. On top of that:

- `TextReveal` renders its final state on mount, with no observer.
- `MagneticButton` no-ops the pointer tracking.
- `SceneBackdrop` draws one frame and stops the animation loop.
- In the app, gate ScrollTrigger setup on `useReducedMotion()` and jump timelines to their end state.

A reduced-motion visitor should see the finished composition immediately, not a
static page missing its content.
