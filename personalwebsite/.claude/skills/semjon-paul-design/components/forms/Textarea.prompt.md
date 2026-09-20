Multi-line field, identical surface to Input. Used once, in the contact form.

```jsx
<Field label="Message" htmlFor="message" error={errors.message?.message}>
  <Textarea id="message" rows={6} invalid={!!errors.message} {...register('message')} />
</Field>
```

- `resize: vertical` only — horizontal resize breaks the measure.
