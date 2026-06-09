<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AGENTS.md

## Project Context

This project is a high-end interactive web experience built with:

* Next.js
* TypeScript
* React
* Three.js
* React Three Fiber
* Drei
* GSAP
* ScrollTrigger
* Motion
* Tailwind CSS
* CSS Modules where needed
* Zustand
* React Hook Form
* Zod
* Blender / GLB asset workflow
* gltf-transform
* KTX2 / Meshopt / Draco optimization
* Vercel deployment
* GitHub version control

The goal is to build a performant, visually polished, animation-heavy, 3D-driven website with clean architecture, strong maintainability, and senior-level code quality.

---

# Core Development Rules

## 1. Use Senior-Level TypeScript

* Always use TypeScript.
* Avoid `any` unless absolutely necessary.
* Prefer explicit types for public APIs, component props, Zustand stores, form schemas, and utility functions.
* Use `unknown` instead of `any` when handling uncertain data.
* Use discriminated unions for complex UI states.
* Keep types close to where they are used unless they are shared across multiple modules.
* Avoid overly complex generic abstractions unless they clearly reduce duplication.

Good:

```ts
type HeroSectionProps = {
  title: string
  subtitle?: string
  modelPath: string
}
```

Bad:

```ts
const HeroSection = (props: any) => {}
```

---

## 2. Prefer Clean, Small Components

* Components should do one thing well.
* Split large components into smaller presentational and logic components.
* Keep files readable and focused.
* Avoid components longer than necessary.
* Extract repeated logic into hooks or utility functions.
* Avoid deeply nested JSX.
* Prefer composition over large prop-heavy components.

Recommended structure:

```txt
src/
  app/
  components/
    layout/
    ui/
    sections/
  experience/
    Scene.tsx
    CameraRig.tsx
    Lights.tsx
    models/
    shaders/
  hooks/
  lib/
  store/
  types/
```

---

## 3. Respect Server and Client Component Boundaries

Next.js App Router should be used correctly.

* Server Components are the default.
* Use Client Components only when needed.
* Add `"use client"` only for components using:

  * state
  * effects
  * browser APIs
  * event listeners
  * GSAP
  * Motion
  * React Three Fiber
  * Zustand client state
  * forms

Do not turn an entire page into a Client Component unless necessary.

Preferred:

```tsx
// app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { ProjectGrid } from '@/components/sections/ProjectGrid'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectGrid />
    </>
  )
}
```

Then isolate interactive parts:

```tsx
'use client'

export function HeroScene() {
  return <Canvas>{/* 3D scene */}</Canvas>
}
```

---

## 4. Keep 3D Code Separate from Regular UI

Do not mix normal website components and Three.js scene logic in the same file.

Use:

```txt
src/components/
  sections/
  ui/
  layout/

src/experience/
  Scene.tsx
  CameraRig.tsx
  Lights.tsx
  models/
  effects/
  shaders/
```

Rules:

* `components/` is for DOM UI.
* `experience/` is for WebGL, Three.js, React Three Fiber, shaders, cameras, lights, controls, and 3D models.
* 3D components should be reusable and isolated.
* Avoid placing heavy 3D logic inside page files.

---

# Design Implementation Rules

## 5. Design Must Be Implemented Precisely

* Match spacing, typography, layout, animation timing, and interaction details carefully.
* Do not approximate design details unless explicitly requested.
* Use consistent spacing scales.
* Use responsive design from the beginning.
* Prioritize visual polish and motion quality.
* Avoid generic UI that looks like a template.
* Each section should have a clear visual hierarchy.

Design implementation priorities:

1. Layout accuracy
2. Typography quality
3. Spacing consistency
4. Animation smoothness
5. Responsive behavior
6. Performance
7. Accessibility

---

## 6. Use Tailwind for Layout, CSS Modules for Complex Effects

Tailwind should be used for:

* layout
* spacing
* typography
* responsive design
* flex/grid
* common visual styles

CSS Modules or custom CSS should be used for:

* complex masks
* custom gradients
* advanced hover effects
* noise overlays
* blend modes
* custom cursor effects
* shader-like visual treatments
* animation-specific class structures

Avoid huge unreadable Tailwind class chains. Extract components or use helper utilities when needed.

---

## 7. Animation Must Feel Intentional

Use animation to support the design, not to decorate randomly.

Animation rules:

* Animations should have purpose.
* Avoid excessive motion.
* Use consistent durations and easing.
* Prefer smooth transitions over flashy effects.
* Respect performance.
* Avoid layout-shifting animations.
* Animate `transform` and `opacity` whenever possible.
* Avoid animating expensive properties like `width`, `height`, `top`, `left`, `filter`, and `box-shadow` unless necessary.

Recommended:

```txt
opacity
transform
translate
scale
rotate
```

Avoid when possible:

```txt
width
height
top
left
margin
padding
filter
box-shadow
```

---

# GSAP and Motion Rules

## 8. Use GSAP for Timeline and Scroll-Based Animation

Use GSAP for:

* complex timelines
* ScrollTrigger
* pinned sections
* scroll-driven 3D sequences
* scrubbed animation
* advanced sequencing

Use Motion for:

* UI transitions
* buttons
* menus
* cards
* modal transitions
* small interaction states

Do not use GSAP and Motion for the same element at the same time unless there is a clear reason.

---

## 9. Clean Up GSAP Animations

Always clean up GSAP animations and ScrollTriggers.

Use scoped GSAP contexts or proper cleanup in effects.

Good:

```tsx
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function AnimatedSection() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      gsap.from('.headline', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    },
    { scope: root }
  )

  return (
    <section ref={root}>
      <h2 className="headline">Design with depth.</h2>
    </section>
  )
}
```

Bad:

```tsx
useEffect(() => {
  gsap.to('.headline', { opacity: 1 })
}, [])
```

---

# Three.js / React Three Fiber Rules

## 10. Keep WebGL Performance First

3D performance is critical.

Rules:

* Keep models optimized.
* Avoid unnecessary lights.
* Avoid excessive real-time shadows.
* Use baked lighting where possible.
* Use compressed textures.
* Use optimized GLB files.
* Use instancing for repeated objects.
* Avoid huge geometry counts.
* Avoid unnecessary `useFrame` updates.
* Do not create new objects inside `useFrame`.
* Use memoization where appropriate.
* Lazy-load heavy scenes.
* Provide reduced-quality fallbacks for mobile.

---

## 11. Use React Three Fiber Correctly

* Use `Canvas` only inside Client Components.
* Keep scene setup modular.
* Separate camera, lighting, models, controls, and effects.
* Use Drei helpers where they improve clarity.
* Avoid overusing Drei if raw Three.js is cleaner.
* Use `Suspense` for async model loading.
* Use `useGLTF` for GLB models.
* Preload important models when useful.
* Avoid loading large 3D assets before they are needed.

Example structure:

```tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import { HeroModel } from './models/HeroModel'
import { CameraRig } from './CameraRig'
import { Lights } from './Lights'

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <Suspense fallback={null}>
        <Lights />
        <CameraRig />
        <HeroModel />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
```

---

## 12. Asset Optimization Is Mandatory

All 3D assets must be optimized before production.

Asset rules:

* Prefer `.glb` over large unoptimized `.gltf` folders.
* Compress geometry with Meshopt or Draco where appropriate.
* Compress textures with KTX2 when possible.
* Resize oversized textures.
* Remove unused meshes, cameras, lights, animations, and materials.
* Use baked textures when possible.
* Keep mobile performance in mind.
* Do not commit huge raw Blender files unless necessary.
* Store source `.blend` files separately if they are very large.

Recommended asset workflow:

```txt
Blender
→ export .glb
→ optimize with gltf-transform
→ test in browser
→ commit optimized asset
```

Example:

```bash
gltf-transform optimize input.glb output.glb
```

---

# State Management Rules

## 13. Use Zustand Only for Shared Client State

Use Zustand for:

* navigation state
* menu state
* active section
* scroll progress
* audio state
* performance mode
* scene state shared across components

Do not use Zustand for everything.

Prefer local state when state is only used by one component.

Good:

```ts
type UIStore = {
  isMenuOpen: boolean
  setMenuOpen: (value: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (value) => set({ isMenuOpen: value }),
}))
```

Bad:

```ts
export const useStore = create((set) => ({
  everything: {},
}))
```

---

# Forms and Validation Rules

## 14. Use React Hook Form and Zod

All forms should use:

* React Hook Form for form state
* Zod for validation
* typed schemas
* clear error messages
* accessible labels
* proper disabled/loading states

Schema first:

```ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export type ContactFormValues = z.infer<typeof contactSchema>
```

Rules:

* Never trust client-side validation only.
* Validate again on the server.
* Keep form UX polished.
* Show loading state during submit.
* Show success and error states clearly.

---

# Styling and UI Rules

## 15. Maintain a Strong Design System

Define and reuse:

* typography scale
* spacing scale
* color tokens
* motion tokens
* z-index layers
* breakpoints
* reusable UI primitives

Avoid one-off styling everywhere.

Recommended UI primitives:

```txt
Button
LinkButton
Container
Section
Heading
TextReveal
MagneticButton
AnimatedLink
```

---

## 16. Responsive Design Is Mandatory

Every section must work on:

* desktop
* laptop
* tablet
* mobile

Rules:

* Design mobile intentionally, not as an afterthought.
* Reduce heavy 3D effects on smaller devices.
* Avoid tiny text.
* Ensure touch targets are large enough.
* Avoid scroll-jacking on mobile.
* Test real viewport sizes.
* Provide fallbacks for weak devices.

---

# Performance Rules

## 17. Performance Is a Feature

Always consider:

* JavaScript bundle size
* 3D asset size
* texture size
* font loading
* image optimization
* LCP
* CLS
* INP
* mobile GPU performance

Rules:

* Lazy-load heavy 3D scenes.
* Use dynamic imports when useful.
* Avoid loading all assets on first paint.
* Use optimized images.
* Use font display strategies.
* Avoid blocking the main thread.
* Avoid unnecessary re-renders.
* Keep the first screen fast.

---

## 18. Do Not Overuse Client Components

Client Components increase JavaScript sent to the browser.

Use them only for:

* WebGL
* animation
* interactions
* browser APIs
* forms
* Zustand state
* event-driven UI

Keep static content as Server Components whenever possible.

---

# Accessibility Rules

## 19. Accessibility Is Required

Even for a visual 3D website, accessibility matters.

Rules:

* Use semantic HTML.
* Use proper heading hierarchy.
* Use descriptive links.
* Use accessible form labels.
* Support keyboard navigation.
* Ensure visible focus states.
* Avoid trapping users in custom scroll experiences.
* Respect `prefers-reduced-motion`.
* Provide fallbacks for animation-heavy content.
* Do not rely on color alone to communicate meaning.

For motion-heavy sections:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto;
  }
}
```

---

# SEO and Metadata Rules

## 20. Use Next.js Metadata Properly

Every important page should include:

* title
* description
* Open Graph metadata
* Twitter metadata where appropriate
* canonical URL where needed
* structured content hierarchy

Use Server Components for content that should be indexed.

Do not hide all meaningful text inside canvas.

The 3D scene should enhance the page, not replace semantic content.

---

# Code Quality Rules

## 21. Keep Code Predictable

* Prefer clear code over clever code.
* Avoid premature abstraction.
* Avoid magic numbers.
* Name things clearly.
* Keep side effects isolated.
* Keep rendering logic readable.
* Keep business logic out of JSX.
* Remove dead code.
* Remove unused imports.
* Keep comments useful and rare.

Good comments explain why, not what.

---

## 22. Naming Conventions

Use clear and consistent names.

Components:

```txt
HeroSection
ProjectGrid
SceneCanvas
CameraRig
ContactForm
```

Hooks:

```txt
useScrollProgress
useReducedMotion
useViewportSize
useSceneStore
```

Utilities:

```txt
formatDate
cn
clamp
mapRange
```

Files:

```txt
HeroSection.tsx
SceneCanvas.tsx
useScrollProgress.ts
contactSchema.ts
```

---

## 23. Import Rules

* Use absolute imports with `@/`.
* Keep imports ordered.
* Do not create circular imports.
* Avoid barrel files if they make dependencies unclear.
* Avoid importing heavy 3D modules into Server Components.

Preferred:

```ts
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/store/useUIStore'
```

---

# Git and GitHub Rules

## 24. Use Clean Commits

Commit messages should be clear and specific.

Good:

```txt
feat: add animated hero scene
fix: optimize mobile canvas performance
refactor: split camera rig from scene
chore: optimize hero GLB asset
```

Bad:

```txt
update
fix stuff
changes
final
```

---

## 25. Keep Main Branch Deployable

* `main` should always be deployable.
* Do not commit broken builds.
* Run lint and build before merging.
* Use feature branches for larger changes.

Recommended:

```bash
npm run lint
npm run build
```

before pushing important changes.

---

# Vercel Deployment Rules

## 26. Production Must Build Cleanly

Before deployment:

* TypeScript must pass.
* ESLint must pass.
* Build must succeed.
* No console spam.
* No broken assets.
* No missing environment variables.
* No oversized accidental files.

Vercel deployment should use:

```txt
Framework: Next.js
Build Command: next build
Output: default Next.js output
```

---

## 27. Environment Variables

* Never commit secrets.
* Use `.env.local` for local development.
* Use Vercel Environment Variables for production.
* Prefix only public variables with `NEXT_PUBLIC_`.
* Treat all `NEXT_PUBLIC_` variables as visible to users.

---

# Security Rules

## 28. Basic Security Expectations

* Never expose secrets in client code.
* Validate server inputs with Zod.
* Sanitize external content.
* Avoid unsafe HTML.
* Use `dangerouslySetInnerHTML` only when absolutely necessary.
* Keep dependencies updated.
* Do not trust form data from the browser.

---

# Final Implementation Principles

## 29. Build for Craft and Maintainability

Every implementation should be:

* performant
* accessible
* responsive
* visually polished
* maintainable
* typed
* modular
* deployable
* easy to reason about

Do not choose quick hacks when a clean solution is reasonable.

---

## 30. Default Decision Rules

When unsure:

* Prefer Server Components over Client Components.
* Prefer composition over abstraction.
* Prefer optimized assets over raw assets.
* Prefer simple state over global state.
* Prefer semantic HTML over div-only structures.
* Prefer transform/opacity animations over layout animations.
* Prefer readable code over clever code.
* Prefer fewer dependencies over unnecessary packages.
* Prefer performance and accessibility over visual excess.

The website should feel premium, but the codebase must remain clean, stable, and scalable.





<!-- END:nextjs-agent-rules -->
