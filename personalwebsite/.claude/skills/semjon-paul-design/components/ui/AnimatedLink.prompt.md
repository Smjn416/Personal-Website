Inline link with a left-to-right underline wipe. The default for every text link, in copy and in the nav.

```jsx
<p>Written up in <AnimatedLink href="/notes/caustics">the process notes</AnimatedLink>.</p>
<AnimatedLink href="mailto:hi@example.com" tone="strong">hi@example.com</AnimatedLink>
```

- `tone="body"` or `"strong"` when the link sits in a paragraph and Flare would be too loud.
- The label never shifts on hover — only the rule animates.
