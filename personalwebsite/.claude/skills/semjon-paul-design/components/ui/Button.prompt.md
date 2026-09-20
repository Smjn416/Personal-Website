Pill control — one primary per view, glass `secondary` beside it, `ghost` for tertiary actions.

```jsx
<Button variant="primary" size="lg" iconRight={<Icon name="arrow-right" />}>
  View the work
</Button>
```

- Radius is always `--radius-control` (pill); never square a button off.
- Hover lifts `--hover-lift`, press scales to `--press-scale`, both on `--dur-fast`/`--ease-glide`.
- For a cursor-tracking hero CTA, wrap it in `<MagneticButton>`.
