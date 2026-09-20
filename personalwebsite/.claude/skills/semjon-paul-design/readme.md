# Semjon Paul — Design System

A design system for a single product: **Semjon Paul's personal portfolio** — an
artistic, 3D-driven personal site where the visual impression leads and the
project listing follows. Dark, cinematic, high contrast, with organic gradients
and glass surfaces.

The system is built to be consumed by one codebase: a Next.js 16 App Router
application using React 19, TypeScript, Three.js / React Three Fiber / Drei,
GSAP with ScrollTrigger, Motion, Tailwind CSS 4, Zustand, React Hook Form and
Zod.

## Sources

| Source | What it gave us |
| --- | --- |
| Local codebase folder `personalwebsite` (attached, not a URL) | The whole visual foundation. Read: `src/experience/BackgroundScene.tsx`, `src/experience/Scene.tsx`, `src/experience/Lights.tsx`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `AGENTS.md`, `package.json`. |
| `src/experience/BackgroundScene.tsx` | The shader architecture: a full-bleed plane, radial fill, value noise, cursor brightness lift, film grain, edge vignette. Its original indigo values (`#07071b` / `#151431`) were the starting point; the ground has since been retuned to warm charcoal and the noise replaced with a wind-driven fog — **the app's copy of the shader needs updating to match `components/experience/SceneBackdrop.jsx`.** |
| `src/app/layout.tsx` | Typefaces (Geist, Geist Mono via `next/font/google`) and the site title. |
| `AGENTS.md` | The component inventory (§15), the animation policy (§7–9), the Tailwind-vs-CSS-Modules split (§6), the form stack (§14), and the accessibility and performance rules. This file is the system's written brief. |

**No Figma file, brand guidelines, logo, imagery or existing screens were
provided.** `src/components/layout/`, `src/components/sections/` and
`src/components/ui/` contain only `.gitkeep` files; `src/experience/models/`,
`effects/` and `shaders/` are empty. Everything visual beyond the shader
colours and the typefaces was designed here, and is a proposal rather than a
recreation. The `public/` folder holds only the default Next.js starter SVGs
(`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) — none are
brand assets, so none were copied in.

## Index

| File / folder | What it is |
| --- | --- |
| `styles.css` | The one stylesheet consumers link. `@import` lines only. |
| `tokens/` | All custom properties: `fonts`, `colors`, `typography`, `spacing`, `radii`, `elevation`, `glass`, `motion`, `layers`, plus `base.css` (resets and the page ground). |
| `components/` | The reusable primitives, grouped by concern. |
| `ui_kits/portfolio/` | Full click-through recreation of the portfolio — open `index.html`. See its own `README.md` for what is real and what is placeholder. |
| `guidelines/cards/` | Foundation specimen cards; these populate the Design System tab. |
| `guidelines/motion.md` | The full motion contract: GSAP vs Motion, ScrollTrigger patterns, cleanup, reduced motion. |
| `templates/page/` | A starting page template (`Page.dc.html`) composing the system end to end. |
| `thumbnail.html` | The homepage tile. |
| `SKILL.md` | Agent Skills front matter plus the production-code rules — this is what Claude Code reads first. |
| `integration/` | Everything needed to consume the system in the Next.js app: install steps (`README.md`), the Tailwind 4 token mapping (`tailwind-theme.css`), and the current R3F ground (`background-scene.tsx.txt`). |

## Components

Grouped by concern. §15 of `AGENTS.md` names the intended inventory — `Button`,
`LinkButton`, `Container`, `Section`, `Heading`, `TextReveal`, `MagneticButton`,
`AnimatedLink` — and all eight are built exactly as listed.

**`components/layout/`** — `Container`, `Section`
**`components/typography/`** — `Heading`, `TextReveal`
**`components/ui/`** — `Button`, `LinkButton`, `MagneticButton`, `AnimatedLink`, `Icon`
**`components/forms/`** — `Field`, `Input`, `Textarea`
**`components/surfaces/`** — `Card`, `Tag`
**`components/experience/`** — `SceneBackdrop`

### Intentional additions

Five components go beyond §15's list, each because a scoped requirement has no
counterpart there:

- `Field`, `Input`, `Textarea` — §14 mandates React Hook Form + Zod forms; the contact form needs labelled, error-capable controls.
- `Card`, `Tag` — the work index is the site's second screen and has no primitive for it. `Card` is the only surface component; there is no separate `ProjectCard`.
- `Icon` — a wrapper over a substituted icon set (see **Iconography**), so the substitution lives in one file.
- `SceneBackdrop` — the `BackgroundScene` shader reimplemented in raw WebGL, so specimen cards, UI kits and templates render the real ground without pulling in React Three Fiber. The Next.js app keeps using its own R3F version.

Not built, deliberately: no Dialog, Toast, Tooltip, Tabs, Select, Switch,
Checkbox, Radio, Avatar or Breadcrumb. The product is a five-section portfolio
with one form; none of those have a place in it, and inventing them would put
components in the picker that the site will never use.

---

## Content fundamentals

The voice is a working practitioner describing what they made and why, in plain
declarative sentences. It assumes the reader is competent and does not sell.

**Person.** First person singular for anything about the practice — "I build
websites where…", "I have spent six years…". Third person or no subject at all
for project descriptions — "The brief was a single frame from a photograph",
not "I was briefed". Never "we": there is no studio.

**Sentence shape.** One idea per sentence, ordinary length. Concrete nouns over
abstractions: "forty thousand particles on one draw call", not "high-performance
particle systems". Specific numbers wherever they exist — frame rates, instance
counts, years, resolutions. A technical constraint stated plainly is the strongest
sentence available.

**What it does not do.** No superlatives ("stunning", "cutting-edge",
"immersive"). No metadiscourse ("here's why that matters"). No rhetorical
questions in body copy — the one exception is a project's opening premise, and
only where it was the actual brief ("What does light do when it passes through
something that does not exist?"). No "this, not that" constructions. No exclamation
marks.

**Casing.** Sentence case everywhere: headings, buttons, labels. The only
uppercase is the mono label style (`.ds-label`), which is a graphic device, not
writing — it carries section indices and one- or two-word category names
("SELECTED WORK", "CASE STUDY", "01"). Never a full sentence in uppercase.

**Headings.** Display headings are short, complete, and slightly declarative:
"Form before information", "A shader is a material", "Tell me what you are
building". Under ten words, no colons, no subtitle line.

**Labels and buttons.** Verb-first and specific: "See the work", "Send message",
"All work". Never "Learn more", "Click here", "Submit", "Get started".

**Numerals.** Mono, always. Section indices are two-digit and zero-padded
(`01`, `02`). Years are bare (`2026`). Ranges use an en dash.

**Metadata lines.** Discipline, then medium, then year, separated by a middle
dot: `Real-time GLSL · 2026`, `Three.js · 2025`. Mono, `--text-xs`,
`--text-faint`.

**Form copy.** Error messages are one clause, lowercase after the first word,
ending in a period, and say what to do: "At least two characters.", "Enter a
valid email address.", "At least ten characters — a few lines is plenty."
Hints are questions the reader can actually answer: "What are you building, and
when do you need it?"

**No emoji.** Not in UI, not in copy, not in commit messages. The mono label
and the Lucide icon set cover everything emoji would be doing.

**German note.** The portfolio copy is English. If a German version is added,
keep the same register — `du` rather than `Sie`, sentence case, and no
compound-noun inflation.

---

## Visual foundations

### The ground

Everything sits on one surface: the `SceneBackdrop` shader. A radial fill from
`#1e181b` at the centre to `#050405` at the corners, a **wind-driven fog**, film
grain at about 1%, and a vignette that pulls the corners down to 38% brightness.
The cursor lifts local brightness by 12% within a small radius — barely
perceptible, and deliberately so.

**The fog.** Value noise sampled on coordinates stretched 4:1 on the vertical
axis, so it reads as horizontal streaks rather than clouds. A slow second noise
field domain-warps those streaks, which is what keeps the drift from looking
like a flat scroll. The whole field moves at `0.026` units per second
horizontally with a slight downward bias, and a finer, faster layer inside the
dense parts gives the fog its texture. The densest parts take a faint warm cast
from the accent red at `--fog-opacity` (0.28) — calibrated by measurement: the fog lifts local brightness by about 7 of 28 levels, which reads as structure rather than as a graphic. Above roughly 0.45 it stops being air and becomes an effect.

The fog is tuned to sit near the threshold of visibility: it should register as
the air in the room, not as an effect. **If you can name it as an effect on
first glance, turn `--fog-opacity` down.** The band mask keeps it out of the
very top and bottom of the frame so text always has clean ground under it.

This is not a decorative background behind a page; it is the page's material.
Nothing in the system uses an opaque light surface, and there is no light mode.
`--gradient-scene` is the CSS approximation for contexts without WebGL, and
`SceneBackdrop` is the real shader.

### Colour

Five families, and they do not mix.

**Ink** (`--ink-990` … `--ink-400`) is the ground: a near-neutral **warm
charcoal**, from `#050405` at the corners to `#1e181b` at the centre. It was
retuned from the original indigo-navy specifically so a bright red could be the
primary colour — red on indigo makes two hues compete for the same attention,
while red on warm charcoal leaves the red as the only chroma in the frame.
Everything structural is ink.

**Paper** (`--paper-100` … `--paper-700`) is text and hairlines, warmed to match
the ground. Four roles: `--text-strong` (#f7f1ef) for headings, `--text-body`
(#cfc2bf) for paragraphs, `--text-dim` (#8f7f7c) for labels and secondary copy,
`--text-faint` (#5c4f50) for metadata. Never invent a fifth.

**Flare** (`--flare-100` … `--flare-600`, accent `#ff4438`) is the primary: a
bright, slightly orange-leaning red. It carries every interactive state — link
colour, focus ring, primary fill, hover borders, the active section marker —
and nothing else. Because it is the loudest colour available, the rule is one
Flare *area* per viewport: a filled button, or an active marker, not both
competing. `--flare-300` (#ff7a6a) is the text tint; the full `--flare-400`
is reserved for fills and rules, where its weight is an asset rather than a
legibility problem.

**Verdigris** (`--verdigris-200` … `--verdigris-400`, `#4e9e9e`) is the cool
counterpoint — a muted teal, the split complement of the red, desaturated
enough that it never reads as a second brand colour. It exists to stop the
palette going entirely warm. Used for status ("available for work"),
informational marks, and at most one data accent. Never interactive.

**Sand** (`--sand-200`, `--sand-300`, `#c9a882`) is the warm neutral: figure
numerals, large quiet areas, placeholder media. Also never interactive.

Maximum one Verdigris element and one Sand element per viewport. Used more than
that, the palette stops being cinematic and starts being a theme.

**Semantic signals.** `--signal-positive` (#6fbf8f) and `--signal-warning`
(#e5b045) are straightforward. `--signal-danger` is **crimson-pink** (#ff4d6d)
rather than the brand red, deliberately: if errors used `--accent`, an invalid
field would look like a highlighted one. Errors always carry a message and an
icon as well, so hue is never the only cue — per §19, nothing in this system
communicates by colour alone.

Contrast: `--text-strong` and `--text-body` both clear 4.5:1 on `--bg-page`.
`--text-dim` clears it at `--text-sm` and above. `--text-faint` is for mono
metadata at `--text-xs` only. `--text-on-accent` is `--ink-990` on the
`--flare-400` fill, which clears 4.5:1 comfortably.

### Type

Two faces: **Geist** and **Geist Mono**, as the app already loads them.

Three registers, and they never swap roles:

- **Display** (`--text-display-1`, `--text-display-2`) — Geist **Light** (300), tracking `-0.035em`, leading `0.92`. Fluid from 3.25rem to 10.5rem. This is where the portfolio's character lives: very large, very light, very tight. One display element per section, maximum.
- **Headings** (`--text-h1` … `--text-h3`) — Geist **Medium** (500), tracking `-0.02em`, leading `1.08`–`1.25`.
- **Body** — Geist **Regular** (400), leading `1.6`, capped at `--measure-body` (62ch). Lead paragraphs use `--text-body-lg` on `--measure-narrow` (38ch).

**Mono** carries labels, section indices, years, stacks, metadata and code. The
label style is `--text-label` (0.6875rem) with `+0.18em` tracking, uppercase,
`--text-dim`. Mono never sets body copy.

Nothing is italic. Nothing is bold beyond 600. There is no semibold heading.

### Spacing and layout

4px base scale, doubling above `--space-6`. Section rhythm is fluid and
generous: `--space-section` is `clamp(5rem, 12vw, 12rem)` — on a large display
that is nearly 200px of air above and below each section, which is what makes
the scroll feel paced rather than dense.

`--container-max` is 88rem for grids, `--container-text` 44rem for prose.
`--gutter` is `clamp(1.25rem, 4vw, 3rem)`. Sections open with a top hairline
(`--gradient-hairline`, which fades at both ends rather than running edge to
edge) and a mono index label.

Grids are `repeat(auto-fit, minmax(min(300px, 100%), 1fr))` so they collapse
without media queries. The work index gives its first card two columns; that
asymmetry is the only layout flourish in the system.

**There is no app bar.** The site has no top chrome at all — no bar, no panel,
no backdrop, nothing spanning the viewport width. Navigation is three fixed
*text* elements sitting directly on the scene: the wordmark at the top left, a
vertical section index down the right edge (mono numerals with a short rule
that grows from 12px to 28px on the active section, in Flare), and a status
marker at the bottom left with a Verdigris dot. Content sections reserve
`calc(var(--gutter) + 9rem)` of right padding so the index never collides with
type. See `guidelines/cards/brand-navigation.html` and
`ui_kits/portfolio/SideIndex.jsx`.

Fixed elements are therefore: those three markers (`--z-nav`) and the
`SceneBackdrop` (`--z-scene`). All content sits at `--z-content` or above.
Nothing is pinned mid-scroll — §19 of `AGENTS.md` forbids trapping the reader
in a custom scroll.

### Corners, borders, shadows

Radii are generous and consistent with the organic side of the brief:
`--radius-card` 1.375rem, `--radius-field` 0.875rem, `--radius-control` is a
full pill. Nothing in the system is square except hairlines and the media edge
of a full-bleed block.

Borders are all 1px and all derived from paper at low alpha:
`--border-hairline` (8%) at rest, `--border-soft` (14%) for fields and glass,
`--border-strong` (26%) on hover, `--border-accent` (Flare at 55%) for focus and
active cards. There is no 2px border anywhere, and no coloured left-border accent.

Shadows cast in `rgba(4,4,16,·)` — the void colour, never pure black — and they
are wide and soft: `--shadow-lg` is `0 24px 60px -18px`. Because the page is
already dark, a shadow alone does not read as elevation, so every raised surface
also carries `--highlight-top`: a 1px inset white line at 10% along its top
edge. That pair — deep soft cast plus top highlight — is what makes a surface
look lifted here.

`--glow-accent` and `--glow-accent-soft` are the only coloured shadows, and only
on focus and primary hover.

### Glass and transparency

Glass is the system's one decorative surface: `--glass-bg` (ink at ~52% alpha),
`backdrop-filter: blur(18px) saturate(1.4)`, a 12% paper hairline, and the top
highlight. Used for the nav bar, cards floating over the scene, the contact form
panel, and overlays.

Glass is only ever used where the shader is genuinely behind it — glass over an
opaque panel is a lie the eye catches. Body copy never sits directly on glass at
partial opacity; text is always full-opacity paper on top of it. Blur is capped
at 32px (`--glass-blur-strong`); above that it costs real frames on mobile GPUs.

### Imagery

There is no imagery in the sources. Where a render or screen capture belongs,
the UI kit shows a flat radial gradient and labels it as a placeholder.

When real imagery arrives, it should be dark and warm-neutral, matching the
scene: charcoals and warm greys, one red or sand highlight at most, visible
grain rather than clean digital gradients. Media blocks get `--radius-media` and
sit on `--ink-900` so a loading image does not flash light. No photography of
people, no stock, no full-colour saturated screenshots. Avoid imagery with
large cool-blue areas — it fights the ground rather than sitting in it.

### Motion

One easing family. `--ease-glide` (`cubic-bezier(0.65,0,0.35,1)` / GSAP
`power2.inOut`) is the default — symmetric, gliding, no overshoot.
`--ease-out` (`power3.out`) for entrances, `--ease-in` for exits. Nothing in
this system bounces, springs or overshoots; the 3D scene supplies the drama and
the UI stays calm.

Six durations: `--dur-instant` 90ms (press), `--dur-fast` 180ms (hover, focus),
`--dur-base` 320ms (state changes), `--dur-slow` 520ms (overlays, menus),
`--dur-reveal` 900ms (text), `--dur-scene` 1400ms (camera moves).

**Entrance.** Exactly one: rise `--reveal-distance` (2.5rem) and fade, over
`--dur-reveal` with `--ease-out`, staggered `--stagger-base` (0.07s). `TextReveal`
does it word by word behind an overflow mask, so words slide up from behind
their own baseline.

**Hover.** Lift `--hover-lift` (−2px) and brighten. Cards also take their border
to `--border-accent` and scale their media 3%. One hover effect per element —
never a lift plus a glow plus a colour change.

**Press.** Scale to `--press-scale` (0.985). No colour flash, no ripple.

**Focus.** 2px Flare outline at 2px offset, plus `--glow-accent-soft` on fields.
Always visible; never removed.

**Magnetism.** `MagneticButton` pulls its child toward the cursor by
`--magnet-strength` (0.18) of the pointer offset, and glides back over
`--dur-slow`. Reserved for the hero CTA.

Only `transform` and `opacity` are animated. Never `width`, `height`, `top`,
`left`, `margin`, `padding`, `filter` or `box-shadow` — per §7 of `AGENTS.md`.
Every animation honours `prefers-reduced-motion`; `base.css` collapses
durations globally, and `TextReveal`, `MagneticButton` and `SceneBackdrop` each
render their resting state directly.

See `guidelines/motion.md` for the GSAP-vs-Motion division and the cleanup
patterns.

---

## Iconography

**There is no icon system in the sources.** The repository ships five default
Next.js starter SVGs in `public/` and nothing else. No icon font, no sprite, no
`Icon` component, no `lucide-react` or `@heroicons` dependency in
`package.json`.

**Substitution — please confirm or replace.** The system uses **Lucide**, loaded
from the `lucide-static` CDN and applied as a CSS mask over `currentColor` by the
`Icon` component. Lucide was chosen because its 1.5px rounded stroke matches the
system's hairline borders and light display type; a filled or heavier set would
fight them. This is a substitution, not a house set, and it is isolated in
`components/ui/Icon.jsx` so swapping it is a one-file change.

**Usage rules.**

- Icons are functional, never decorative. They mark direction (`arrow-right`, `arrow-up-right`, `arrow-down`), state (`x`, `menu`, `check`) or a channel (`mail`, `github`). There are no illustrative icons and no icon beside a section heading.
- The working set is deliberately about eight glyphs. If a seventh direction arrow seems necessary, the layout is the problem.
- Icons inherit text colour through `currentColor` and are sized 15–20px inline, 28px for the standalone next-project arrow. They never carry their own colour.
- Always `aria-hidden` — the adjacent label is the accessible name. An icon-only control needs an explicit `aria-label`.
- **No emoji**, anywhere. **No unicode characters as icons** — with one exception: the middle dot (`·`) as a metadata separator and the en dash in ranges, both of which are punctuation, not iconography.
- In the Next.js app, prefer `lucide-react` for tree-shaking and keep the same slugs.

**No logo mark exists.** The brand is the name, set in Geist Light at
`-0.03em` tracking. Do not draw, generate or approximate a monogram or symbol —
render "Semjon Paul" as type wherever a mark would go. See
`guidelines/cards/brand-wordmark.html`.

---

## Known gaps

- **Fonts are loaded from the Google Fonts CDN**, not from local binaries, because the repository has none to copy (the app uses `next/font/google`). If self-hosted Geist files are added, replace the `@import` in `tokens/fonts.css` with real `@font-face` rules.
- **No imagery, no logo, no icon set** — all three are substitutions or omissions, flagged above.
- **The UI kit layouts are a proposal, not a recreation**, because the source has no screens.
- **All copy in the UI kit is placeholder.** The tone follows the content rules above, but none of it is Semjon's writing.
- **The app's shader is out of date.** `src/experience/BackgroundScene.tsx` still runs the original indigo fill with plain drifting noise. The updated React Three Fiber version is ready at `integration/background-scene.tsx.txt` — copy it over.

---

Consumers link one file:

```html
<link rel="stylesheet" href="styles.css">
```
