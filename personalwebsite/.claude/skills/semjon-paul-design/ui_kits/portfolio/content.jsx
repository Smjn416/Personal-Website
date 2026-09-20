/* Placeholder content. No copy, imagery or project data exists in the source
   repository — everything here is stand-in material shaped to the brand's tone
   so the layouts can be judged. Replace wholesale. */

const PROJECTS = [
  {
    slug: 'caustics',
    index: '01',
    label: 'Case study',
    title: 'Caustics on a still surface',
    blurb: 'Light through a surface that does not exist.',
    meta: 'Real-time GLSL · 2026',
    year: '2026',
    stack: ['Three.js', 'GLSL', 'R3F'],
    a: 'var(--flare-400)',
    b: 'var(--ink-900)',
    body: [
      'The brief was a single frame from a photograph: sunlight landing on the floor of a shallow pool. Recreating it in real time meant giving up on physical accuracy and finding the two or three cues the eye actually reads — the bright filaments where wavefronts converge, and the slow drift between them.',
      'The final version runs a pair of animated value-noise fields through a refraction approximation in the fragment shader. No ray marching, no light probes, one draw call. On a 2019 laptop it holds sixty frames a second at full resolution.',
    ],
  },
  {
    slug: 'dust',
    index: '02',
    label: 'Experiment',
    title: 'Instanced dust',
    blurb: 'Forty thousand particles on one draw call.',
    meta: 'Three.js · 2025',
    year: '2025',
    stack: ['Three.js', 'Instancing'],
    a: 'var(--sand-300)',
    b: 'var(--ink-900)',
    body: [
      'A study in how little motion is needed before a volume of particles reads as air rather than as geometry. Position is computed entirely on the GPU from an index and a time uniform; the CPU never touches a particle.',
      'The interesting constraint turned out to be colour. At forty thousand instances, anything more saturated than a two-percent warm tint collapses into a haze.',
    ],
  },
  {
    slug: 'easing',
    index: '03',
    label: 'Writing',
    title: 'On easing',
    blurb: 'Why one easing family beats five.',
    meta: 'Notes · 2025',
    year: '2025',
    stack: ['Essay'],
    a: 'var(--paper-400)',
    b: 'var(--ink-900)',
    body: [
      'Most sites that feel expensive are not using better animation than the ones that do not. They are using less of it, and the same curve every time.',
      'This note works through the argument with a handful of side-by-side comparisons, and ends with the two-value easing set this portfolio runs on.',
    ],
  },
  {
    slug: 'volume',
    index: '04',
    label: 'Case study',
    title: 'A room with no walls',
    blurb: 'Volumetric fog as the only architecture.',
    meta: 'WebGL · 2024',
    year: '2024',
    stack: ['WebGL', 'Raymarching'],
    a: 'var(--verdigris-300)',
    b: 'var(--ink-800)',
    body: [
      'An installation piece where the entire sense of enclosure comes from scattering. There is no floor, no ceiling and no wall mesh in the scene — only a density function and a light.',
      'Raymarching at a quarter resolution with a temporal blur turned out to be indistinguishable from the full-resolution version, and four times faster.',
    ],
  },
]

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

Object.assign(window, { PROJECTS, NAV })
