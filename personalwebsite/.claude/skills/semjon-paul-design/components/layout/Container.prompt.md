Horizontal page frame — caps width and applies the fluid `--gutter`; wrap every section's content in one.

```jsx
<Container width="text">
  <p>Long-form copy sits on the 44rem measure.</p>
</Container>
```

- `width="wide"` (default) for grids and full layouts, `"text"` for prose, `"full"` for edge-to-edge media.
- Never nest two Containers; use `width="full"` on the outer one if you need a bleed.
