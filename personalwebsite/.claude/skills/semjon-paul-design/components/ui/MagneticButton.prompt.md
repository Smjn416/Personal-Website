Cursor-magnet wrapper — pulls its child toward the pointer, then glides back. Reserve it for the hero CTA and at most one other moment per page.

```jsx
<MagneticButton>
  <Button variant="primary" size="lg">Enter</Button>
</MagneticButton>
```

- Wraps anything, but the pull only reads well on pill controls and small circular elements.
- No-ops under `prefers-reduced-motion`; skip it entirely on touch viewports.
