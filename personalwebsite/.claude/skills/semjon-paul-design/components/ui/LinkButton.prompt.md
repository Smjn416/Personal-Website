Anchor with Button's exact styling — for navigation and outbound links.

```jsx
<LinkButton href="/work/caustics" variant="secondary" size="md">Case study</LinkButton>
<LinkButton href="https://github.com/…" external variant="ghost">GitHub</LinkButton>
```

- Defaults to `secondary` because the primary Flare fill belongs to the page's one real action.
- In the Next.js app, wrap `next/link` around it or pass the resolved `href`.
