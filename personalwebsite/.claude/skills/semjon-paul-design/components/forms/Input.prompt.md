Single-line field — sunken surface, `--radius-field`, Flare focus ring. Forwards its ref for React Hook Form's `register`.

```jsx
<Field label="Name" htmlFor="name" error={errors.name?.message}>
  <Input id="name" placeholder="Your name" invalid={!!errors.name} {...register('name')} />
</Field>
```

- Fields are the only surfaces that go *darker* than the page; everything else lifts.
- Focus shows both the Flare border and `--glow-accent-soft`. Never remove the ring.
