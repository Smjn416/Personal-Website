---
name: semjon-paul-design
description: Use this skill to generate well-branded interfaces and assets for Semjon Paul's interactive 3D portfolio, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for protoyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Working in the Next.js app

This system is consumed by one codebase: a Next.js 16 App Router app (React 19,
TypeScript, Three.js / React Three Fiber, GSAP + ScrollTrigger, Motion,
Tailwind CSS 4, Zustand, React Hook Form, Zod). That repo's `AGENTS.md` governs
code style and takes precedence on engineering questions; this skill governs
design.

Read `integration/README.md` first — it covers installation, the Tailwind 4
token mapping, and what the reference components are and are not.

Key rules when writing production code:

- `components/**/*.jsx` are **reference implementations**, not a package. Never import them into the app. Read them for structure, states and exact values, then write TypeScript components using Tailwind classes from `integration/tailwind-theme.css`.
- The sibling `.d.ts` files are the props contracts. Match them.
- `components/**/*.prompt.md` says when and how to use each primitive. Read the one for anything you touch.
- Styling goes through the tokens. Never a raw hex in app code.
- Motion follows `guidelines/motion.md`: GSAP + ScrollTrigger for scroll and timelines, Motion for UI transitions, CSS transitions for single-element hover/focus/press. One easing family. Only `transform` and `opacity`.
- There is **no app bar**. Navigation is three fixed text elements on the scene — see `guidelines/cards/brand-navigation.html` and `ui_kits/portfolio/SideIndex.jsx`.
- `integration/background-scene.tsx.txt` is the current React Three Fiber ground. Copy it to `src/experience/BackgroundScene.tsx` (dropping the `.txt`); it replaces the file already there.

Known gaps, all documented at the end of `readme.md`: no logo (the name is set
in type — do not invent a mark), Lucide is a substituted icon set, and all UI
kit copy is placeholder.
