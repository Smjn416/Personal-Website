Masked word-by-word rise — the system's only text entrance. Fires when the element scrolls into view.

```jsx
<Heading level={1} size="display1">
  <TextReveal text="Form before information" />
</Heading>
```

- Pass `text` (a plain string) for the per-word stagger; passing element children falls back to a single-block rise.
- In the Next.js app, use this for DOM copy and GSAP ScrollTrigger for anything tied to the 3D scene — never both on one element.
- Automatically renders the final state under `prefers-reduced-motion`.
