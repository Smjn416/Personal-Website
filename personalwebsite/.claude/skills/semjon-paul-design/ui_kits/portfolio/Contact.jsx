const { Section, Heading, TextReveal, Field, Input, Textarea, Button, Icon, AnimatedLink } = window.SemjonPaulDesignSystem_d2b8a3

/**
 * Contact form. Validation here is a stand-in for the real React Hook Form +
 * Zod schema (see AGENTS.md §14) — same states, same messages.
 */
function Contact() {
  const [values, setValues] = React.useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = React.useState({})
  const [state, setState] = React.useState('idle')

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (values.name.trim().length < 2) next.name = 'At least two characters.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) next.email = 'Enter a valid email address.'
    if (values.message.trim().length < 10) next.message = 'At least ten characters — a few lines is plenty.'
    setErrors(next)
    if (Object.keys(next).length) return
    setState('sending')
    setTimeout(() => setState('sent'), 900)
  }

  return (
    <Section id="contact" index="03" label="Contact">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'var(--space-16)', alignItems: 'start' }}>
        <div style={{ minWidth: 0 }}>
          <Heading level={2} size="display2" style={{ maxWidth: '14ch' }}>
            <TextReveal text="Tell me what you are building" />
          </Heading>
          <p style={{ marginTop: 'var(--space-8)', fontSize: 'var(--text-body-lg)', color: 'var(--text-body)', maxWidth: 'var(--measure-narrow)' }}>
            Selected client work, collaborations and commissions. I answer
            everything within a couple of days.
          </p>
          <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--text-dim)' }}>
              <Icon name="mail" size={16} />
              <AnimatedLink href="#" tone="strong" onClick={(e) => e.preventDefault()}>hello@semjonpaul.example</AnimatedLink>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--text-dim)' }}>
              <Icon name="github" size={16} />
              <AnimatedLink href="#" tone="body" onClick={(e) => e.preventDefault()}>github.com/semjonpaul</AnimatedLink>
            </span>
          </div>
        </div>

        <div style={{
          minWidth: 0, padding: 'var(--space-8)', borderRadius: 'var(--radius-card)',
          background: 'var(--surface-card)', backdropFilter: 'var(--glass-backdrop)',
          WebkitBackdropFilter: 'var(--glass-backdrop)',
          border: '1px solid var(--border-hairline)',
          boxShadow: 'var(--shadow-lg), var(--highlight-top)',
        }}>
          {state === 'sent' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingBlock: 'var(--space-8)' }}>
              <Icon name="check" size={28} style={{ color: 'var(--signal-positive)' }} />
              <div style={{ fontSize: 'var(--text-h3)', color: 'var(--text-strong)' }}>Message sent</div>
              <p style={{ color: 'var(--text-dim)', fontSize: 'var(--text-sm)' }}>
                Thanks — you will hear back within two days.
              </p>
              <Button variant="ghost" size="sm" onClick={() => { setState('idle'); setValues({ name: '', email: '', message: '' }) }}>
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 'var(--space-5)' }}>
              <Field label="Name" htmlFor="c-name" error={errors.name} required>
                <Input id="c-name" value={values.name} onChange={set('name')} invalid={!!errors.name} placeholder="Your name" autoComplete="name" />
              </Field>
              <Field label="Email" htmlFor="c-email" error={errors.email} required>
                <Input id="c-email" type="email" value={values.email} onChange={set('email')} invalid={!!errors.email} placeholder="you@studio.com" autoComplete="email" />
              </Field>
              <Field label="Message" htmlFor="c-message" error={errors.message} hint="What are you building, and when do you need it?" required>
                <Textarea id="c-message" rows={5} value={values.message} onChange={set('message')} invalid={!!errors.message} />
              </Field>
              <Button type="submit" variant="primary" fullWidth disabled={state === 'sending'} iconRight={<Icon name="arrow-right" size={17} />}>
                {state === 'sending' ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}

Object.assign(window, { Contact })
