const { Container, AnimatedLink, Icon } = window.SemjonPaulDesignSystem_d2b8a3

function Footer() {
  return (
    <footer style={{ paddingBottom: 'var(--space-12)', paddingTop: 'var(--space-16)' }}>
      <Container>
        <div style={{ height: 1, background: 'var(--gradient-hairline)' }} />
        <div style={{
          paddingTop: 'var(--space-8)', display: 'flex', flexWrap: 'wrap',
          gap: 'var(--space-6)', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-mono)', color: 'var(--text-faint)',
        }}>
          <span>Semjon Paul — Interactive &amp; 3D</span>
          <span style={{ display: 'flex', gap: 'var(--space-6)' }}>
            <AnimatedLink href="#" tone="body" onClick={(e) => e.preventDefault()}>GitHub</AnimatedLink>
            <AnimatedLink href="#" tone="body" onClick={(e) => e.preventDefault()}>Imprint</AnimatedLink>
          </span>
          <span>© 2026</span>
        </div>
      </Container>
    </footer>
  )
}

Object.assign(window, { Footer })
