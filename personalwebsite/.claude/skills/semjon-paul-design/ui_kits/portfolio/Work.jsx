const { Section, Card, Tag, TextReveal } = window.SemjonPaulDesignSystem_d2b8a3

/** The work index: one glass card per piece, first card double-width. */
function Work({ onOpen }) {
  return (
    <Section id="work" index="01" label="Selected work">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'var(--space-6)' }}>
        {window.PROJECTS.map((p, i) => (
          <Card
            key={p.slug}
            href="#"
            onClick={(e) => { e.preventDefault(); onOpen(p.slug) }}
            index={p.index}
            label={p.label}
            title={p.title}
            meta={p.meta}
            style={i === 0 ? { gridColumn: 'span 2', minWidth: 0 } : { minWidth: 0 }}
            media={
              <div style={{
                height: i === 0 ? 300 : 180,
                background: 'radial-gradient(130% 110% at 28% 18%, ' + p.a + ', ' + p.b + ' 68%)',
              }} />
            }
          >
            {p.blurb}
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
              {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
              <Tag accent>{p.year}</Tag>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

Object.assign(window, { Work })
