Lucide icon as a CSS mask over `currentColor` — inherits text colour, no bundler needed.

```jsx
<Button variant="primary" iconRight={<Icon name="arrow-right" />}>View the work</Button>
<Icon name="arrow-up-right" size={16} />
```

- The working set is small on purpose: `arrow-right`, `arrow-up-right`, `arrow-down`, `menu`, `x`, `mail`, `github`, `plus`.
- Substitution: the source repo ships no icon set, so this is Lucide, not a house set. Swap `CDN` for a local sprite if one is ever designed.
- In the Next.js app prefer `lucide-react` for tree-shaking; keep the same slugs.
