# Using this design system in Claude Code

Two things live here: a **skill** Claude Code reads for design guidance, and
**two files you copy into the app**.

---

## 1. Install as a Claude Code skill

Download this whole project, then drop it into your repository:

```
personalwebsite/
  .claude/
    skills/
      semjon-paul-design/     ← the downloaded folder, renamed
        SKILL.md
        readme.md
        styles.css
        tokens/
        components/
        guidelines/
        ui_kits/
        templates/
        integration/
```

`SKILL.md` already carries the Agent Skills front matter, so Claude Code picks
it up automatically. From then on:

```
> use the semjon-paul-design skill and build the work index section
```

Claude Code reads `readme.md` for the rules (colour roles, the content voice,
the motion contract, the no-app-bar navigation), `tokens/` for exact values, and
`components/*/​*.prompt.md` for how each primitive is meant to be used.

You can also just say *"follow the design system in .claude/skills"* — the skill
description tells it when to reach for this.

### Committing it

Commit the folder. It is text, it versions cleanly, and it means every developer
and every Claude Code session in the repo works from the same values. When the
design changes here, re-download and replace the folder.

---

## 2. Copy two files into the app

### `tailwind-theme.css` → `src/app/tailwind-theme.css`

Maps every token to a Tailwind 4 utility, so `bg-page`, `text-accent`,
`rounded-card`, `text-display-1`, `ease-glide` and `shadow-glow` all work as
class names.

Then replace `src/app/globals.css` with:

```css
@import "tailwindcss";

/* The design system. Tokens, fonts, resets and the page ground. */
@import "../../.claude/skills/semjon-paul-design/styles.css";

/* Token → Tailwind utility mapping. Must come after styles.css. */
@import "./tailwind-theme.css";
```

Adjust the first path to wherever you put the skill folder. If you would rather
not import out of `.claude/`, copy `styles.css` and `tokens/` into
`src/styles/ds/` and point at that instead — but then remember to re-copy when
the system changes.

Your current `globals.css` sets `--background`/`--foreground` and a
`font-family: Arial` fallback on `body`. All three go away; the design system's
`tokens/base.css` owns the page ground and the Geist stack.

**Keep `next/font/google` in `layout.tsx` as it is.** It sets
`--font-geist-sans` and `--font-geist-mono`, and the theme file reads those
first, falling back to the CDN copy only outside the app. That means the app
self-hosts its fonts and the design system still previews correctly.

### `background-scene.tsx.txt` → `src/experience/BackgroundScene.tsx`

(The `.txt` suffix keeps this design system's component bundler from trying to
compile app source that imports `three` and `@react-three/fiber`. Drop the
suffix when you copy the file in.)

Replaces the existing file. Same component name, same mount point, so
`src/app/page.tsx` needs no change. What is new:

- the warm-charcoal ground instead of indigo
- the wind-driven fog
- `dpr` capped at 1.5 (the fog costs real fragment work)
- `prefers-reduced-motion` honoured — one static frame, no mousemove listener

---

## What to expect, and what not to

**The `.jsx` components in `components/` are reference implementations, not a
package.** They are plain JSX with inline styles so they render in a browser
with no build step — which is what makes the specimen cards and UI kit work.
Do not import them into the Next.js app.

When you ask Claude Code to build something, it should **read** the relevant
`.jsx` and `.prompt.md` to learn the exact structure, states and values, then
write a proper TypeScript component using Tailwind classes and your own
conventions from `AGENTS.md`. The `.d.ts` files are the props contracts — those
are worth matching.

**The UI kit layouts are a proposal, not a spec.** `ui_kits/portfolio/` applies
the foundations to five screens, but your repo had no screens to recreate, so
treat the layouts as a starting point and the token usage as the rule.

**All copy is placeholder.** `ui_kits/portfolio/content.jsx` is stand-in
material written to the voice in `readme.md`. Replace it.

---

## A first prompt that works

```
Use the semjon-paul-design skill.

Build src/components/sections/Work.tsx — the work index from
ui_kits/portfolio/Work.jsx, as a Server Component.

- Recreate it in TypeScript with Tailwind classes from tailwind-theme.css,
  not inline styles.
- Cards come from a new src/components/ui/Card.tsx; match the props
  contract in components/surfaces/Card.d.ts.
- Card hover state is client-side — keep the hover logic in a small
  "use client" wrapper, not the whole section.
- Entrance animation with GSAP ScrollTrigger per guidelines/motion.md,
  using useGSAP with a scope. Do not use the TextReveal component.
- Project data typed and imported from src/lib/projects.ts for now.
```

Being specific about *which* screen, *which* component contract and *which*
animation tool is what keeps the output consistent with the system.
