const { Container, Heading, Tag, Button, Icon, TextReveal, AnimatedLink } = window.SemjonPaulDesignSystem_d2b8a3

/** Case-study view: full-bleed media, then prose on the text measure. */
function ProjectDetail({ slug, onBack, onOpen }) {
  const p = window.PROJECTS.find((x) => x.slug === slug) || window.PROJECTS[0]
  const next = window.PROJECTS[(window.PROJECTS.indexOf(p) + 1) % window.PROJECTS.length]

  return (
    <article style={{ paddingTop: 'var(--space-24)', paddingBottom: 'var(--space-section)' }}>
      <Container>
        <Button variant="ghost" size="sm" iconLeft={<Icon name="arrow-right" size={15} style={{ transform: 'rotate(180deg)' }} />} onClick={onBack}>
          All work
        </Button>

        <div style={{
          marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', alignItems: 'baseline',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-dim)',
        }}>
          <span style={{ color: 'var(--text-faint)' }}>{p.index}</span>
          <span>{p.label}</span>
        </div>

        <Heading level={1} size="display2" style={{ marginTop: 'var(--space-5)', maxWidth: '22ch' }}>
          <TextReveal text={p.title} />
        </Heading>

        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
          {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
          <Tag accent>{p.year}</Tag>
        </div>
      </Container>

      <div style={{ marginTop: 'var(--space-16)', paddingInline: 'var(--gutter)' }}>
        <div style={{
          maxWidth: 'var(--container-max)', marginInline: 'auto',
          height: 'min(58vh, 520px)', borderRadius: 'var(--radius-media)',
          border: '1px solid var(--border-hairline)', boxShadow: 'var(--shadow-xl), var(--highlight-top)',
          background: 'radial-gradient(120% 110% at 32% 22%, ' + p.a + ', ' + p.b + ' 66%)',
        }} />
        <div style={{
          maxWidth: 'var(--container-max)', marginInline: 'auto', marginTop: 'var(--space-3)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)',
        }}>
          Placeholder — real capture goes here
        </div>
      </div>

      <Container width="text" style={{ marginTop: 'var(--space-16)' }}>
        {p.body.map((t, i) => (
          <p key={i} style={{
            fontSize: 'var(--text-body-lg)', color: 'var(--text-body)',
            marginBottom: 'var(--space-6)',
          }}>{t}</p>
        ))}
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--text-dim)' }}>
          Source and build notes on <AnimatedLink href="#" onClick={(e) => e.preventDefault()}>GitHub</AnimatedLink>.
        </p>
      </Container>

      <Container style={{ marginTop: 'var(--space-24)' }}>
        <div style={{ height: 1, background: 'var(--gradient-hairline)' }} />
        <button
          onClick={() => onOpen(next.slug)}
          style={{
            width: '100%', background: 'none', border: 0, cursor: 'pointer', textAlign: 'left',
            paddingTop: 'var(--space-8)', display: 'flex', alignItems: 'baseline',
            justifyContent: 'space-between', gap: 'var(--space-6)',
          }}
        >
          <span>
            <span style={{
              display: 'block', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)',
            }}>Next</span>
            <span style={{
              display: 'block', marginTop: 'var(--space-3)', fontSize: 'var(--text-h2)',
              fontWeight: 'var(--weight-light)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-strong)',
            }}>{next.title}</span>
          </span>
          <Icon name="arrow-right" size={28} style={{ color: 'var(--text-accent)' }} />
        </button>
      </Container>
    </article>
  )
}

Object.assign(window, { ProjectDetail })
