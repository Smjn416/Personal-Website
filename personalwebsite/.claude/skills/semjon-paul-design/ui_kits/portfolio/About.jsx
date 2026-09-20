const { Section, Heading, TextReveal, Tag, AnimatedLink } = window.SemjonPaulDesignSystem_d2b8a3

/** Prose on the text measure, plus a mono capability list. */
function About() {
  return (
    <Section id="about" index="02" label="About">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'var(--space-16)', alignItems: 'start' }}>
        <div style={{ minWidth: 0 }}>
          <Heading level={2} size="display2" style={{ maxWidth: '16ch' }}>
            <TextReveal text="A shader is a material" />
          </Heading>
        </div>

        <div style={{ minWidth: 0, maxWidth: 'var(--measure-body)' }}>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-body)' }}>
            I have spent six years moving between motion design and front-end
            engineering, and the work I care about sits exactly on that line:
            interfaces that behave like objects rather than documents.
          </p>
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--text-dim)', marginTop: 'var(--space-5)' }}>
            Most of what I make runs in a browser at sixty frames a second. That
            constraint decides almost everything — which is the part I enjoy.
            Currently taking on selected client work alongside my own pieces.
          </p>

          <div style={{ height: 1, background: 'var(--gradient-hairline)', marginBlock: 'var(--space-10)' }} />

          <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
            {[
              ['Engineering', ['Next.js', 'TypeScript', 'React', 'Three.js', 'R3F', 'GLSL']],
              ['Motion', ['GSAP', 'ScrollTrigger', 'Motion']],
              ['Pipeline', ['Blender', 'gltf-transform', 'KTX2', 'Draco']],
            ].map(([group, items]) => (
              <div key={group} style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'baseline' }}>
                <div style={{
                  minWidth: 110, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
                  letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)',
                }}>{group}</div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {items.map((i) => <Tag key={i}>{i}</Tag>)}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 'var(--text-body)', color: 'var(--text-dim)', marginTop: 'var(--space-10)' }}>
            Occasional notes at <AnimatedLink href="#" onClick={(e) => e.preventDefault()}>/notes</AnimatedLink>.
          </p>
        </div>
      </div>
    </Section>
  )
}

Object.assign(window, { About })
