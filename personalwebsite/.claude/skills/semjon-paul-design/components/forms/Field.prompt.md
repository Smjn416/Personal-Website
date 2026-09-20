Label + hint + error wrapper. Every control in a form goes inside one.

```jsx
<Field label="Email" htmlFor="email" error={errors.email?.message} required>
  <Input id="email" type="email" invalid={!!errors.email} {...register('email')} />
</Field>
```

- `error` replaces `hint` when present; pass the message from the Zod schema directly.
- Always set both `htmlFor` and the control's `id` — the uppercase mono label is the only label the design has.
