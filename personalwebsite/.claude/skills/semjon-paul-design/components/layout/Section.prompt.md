Vertical rhythm unit — owns section padding, the top hairline and the mono index label that opens each portfolio section.

```jsx
<Section id="work" index="01" label="Selected work">
  <ProjectGrid />
</Section>
```

- `tight` halves the vertical padding; `bleed` drops the Container for full-width media.
- `hairline={false}` on the first section after the hero, so the fold stays clean.
