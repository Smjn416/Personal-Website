# UI kit — Portfolio website

The single product in this design system: Semjon Paul's personal portfolio.
Open `index.html` for the full click-through.

## Screens

| File | Screen | Notes |
| --- | --- | --- |
| `App.jsx` | Shell | Owns the view state, the scroll container and the active-section observer. In the real app these are App Router routes. |
| `SideIndex.jsx` | Navigation | **No app bar.** A fixed wordmark, a vertical section index on the right edge, and a status marker bottom left — three transparent text elements on the scene. |
| `Hero.jsx` | Hero | Full `100svh`, display type bottom-aligned over the shader, one magnetic primary CTA. Right padding clears the edge index. |
| `Work.jsx` | Work index | Auto-fit card grid; first card spans two columns. |
| `ProjectDetail.jsx` | Case study | Full-bleed media, prose on `--container-text`, next-project link. |
| `About.jsx` | About | Display heading beside prose plus a mono capability list. |
| `Contact.jsx` | Contact | Glass form panel with the real error, sending and sent states. |
| `Footer.jsx` | Footer | Hairline, three mono columns. |
| `content.jsx` | Data | All placeholder copy and project records. |

## What is real and what is not

**Real** — every colour, size, radius, shadow, easing and duration comes from
`styles.css`; the background is the actual `BackgroundScene` fragment shader
(via `SceneBackdrop`); every control, card, field and heading is a design-system
component, not a local reimplementation.

**Stand-in** — all copy, project names and metadata (`content.jsx`). Project
imagery is a flat radial gradient where a render or screen capture belongs; the
source repository ships no imagery. Form validation mirrors the intended Zod
schema but runs inline rather than through React Hook Form.

**Not from a source design** — the source repository contains no screens,
components or copy (`src/components/**` is empty apart from `.gitkeep` files).
These layouts are therefore a first application of the foundations, not a
recreation of an existing design. Treat them as a proposal.

## Porting to the Next.js app

- `App.jsx` → `src/app/page.tsx` (Server Component) with each section imported from `src/components/sections/`.
- `Nav.jsx`, `Contact.jsx` → `"use client"`; the rest can stay server-rendered.
- `SceneBackdrop` → keep using `src/experience/BackgroundScene.tsx` (React Three Fiber). Do not ship the raw-WebGL copy into the app.
- `TextReveal` → replace with GSAP `SplitText`/`ScrollTrigger` if you want scrubbed reveals; the IntersectionObserver version is for non-GSAP contexts.
- Contact form → React Hook Form + the Zod schema in `src/lib/contactSchema.ts`, validated again server-side.
