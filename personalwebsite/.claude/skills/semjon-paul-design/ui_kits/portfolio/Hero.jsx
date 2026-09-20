const { Heading, TextReveal, Button, MagneticButton, Icon } = window.SemjonPaulDesignSystem_d2b8a3

/** Full-viewport opening. Display type over the shader, nothing else. */
function Hero({ onNavigate }) {
  return (
    <section
      style={{
        minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        maxWidth: 'var(--container-max)', marginInline: 'auto',
        paddingInline: 'var(--gutter)', paddingBottom: 'var(--space-24)', paddingTop: 'var(--space-32)',
        paddingRight: 'calc(var(--gutter) + 9rem)',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        color: 'var(--text-dim)', marginBottom: 'var(--space-8)',
      }}>
        Interactive &amp; 3D — Berlin
      </div>

      <Heading level={1} size="display1" style={{ maxWidth: '18ch' }}>
        <TextReveal text="Form before information" />
      </Heading>

      <p style={{
        marginTop: 'var(--space-10)', maxWidth: 'var(--measure-narrow)',
        fontSize: 'var(--text-body-lg)', color: 'var(--text-body)',
      }}>
        I build websites where the first thing you notice is the material, and the
        second is what it is for. Four pieces below, and one shader running behind
        all of them.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', marginTop: 'var(--space-12)' }}>
        <MagneticButton>
          <Button variant="primary" size="lg" iconRight={<Icon name="arrow-right" />} onClick={() => onNavigate('work')}>
            See the work
          </Button>
        </MagneticButton>
        <Button variant="ghost" size="lg" onClick={() => onNavigate('about')}>About</Button>
      </div>

      <div style={{
        marginTop: 'var(--space-20)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)',
      }}>
        <Icon name="arrow-down" size={14} /> Scroll
      </div>
    </section>
  )
}

Object.assign(window, { Hero })
