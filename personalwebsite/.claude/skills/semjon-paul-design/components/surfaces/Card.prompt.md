The portfolio's one card — translucent ink over the 3D scene, hairline edge, top highlight.

```jsx
<Card
  href="/work/caustics"
  index="01"
  label="Case study"
  title="Caustics on a still surface"
  meta="Real-time GLSL · 2026"
  media={<img src="/work/caustics.jpg" alt="" />}
>
  Light through a surface that does not exist.
</Card>
```

- `glass` over the WebGL background; `solid` only when the card sits on an opaque panel; `outline` for dense lists.
- Hover lifts 4px, warms the border to `--border-accent` and scales media 3% — do not add a second hover effect on top.
