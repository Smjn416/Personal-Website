The brand's ground — the exact `BackgroundScene` fragment shader in raw WebGL, for use outside React Three Fiber.

```jsx
<SceneBackdrop />
<main style={{ position: 'relative', zIndex: 'var(--z-content)' }}>…</main>
```

- Mount once, at the root, behind everything. Content must sit at `--z-content` or above.
- In the Next.js app, use `src/experience/BackgroundScene.tsx` instead — same shader, R3F-based. Keep the two in sync if the shader changes.
- Renders a static frame under `prefers-reduced-motion`; falls back to `--gradient-scene` where WebGL is unavailable.
