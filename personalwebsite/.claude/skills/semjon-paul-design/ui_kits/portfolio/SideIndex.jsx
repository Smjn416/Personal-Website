const { Icon } = window.SemjonPaulDesignSystem_d2b8a3

/**
 * The navigation, such as it is. There is no app bar: the wordmark sits
 * directly on the scene at the top left, and the section index runs down the
 * right edge as mono numerals with a short rule. Both are fixed, both are
 * transparent, neither draws a surface.
 */
function SideIndex({ onNavigate, active }) {
  return (
    <React.Fragment>
      <button
        onClick={() => onNavigate('home')}
        style={{
          position: 'fixed', top: 'var(--space-8)', left: 'var(--gutter)', zIndex: 'var(--z-nav)',
          background: 'none', border: 0, padding: 0, cursor: 'pointer',
          fontSize: '1.0625rem', fontWeight: 'var(--weight-medium)',
          letterSpacing: '-0.02em', color: 'var(--text-strong)',
          mixBlendMode: 'normal',
        }}
      >
        Semjon&nbsp;Paul
      </button>

      <nav
        aria-label="Sections"
        style={{
          position: 'fixed', top: '50%', right: 'var(--gutter)', transform: 'translateY(-50%)',
          zIndex: 'var(--z-nav)', display: 'flex', flexDirection: 'column',
          alignItems: 'flex-end', gap: 'var(--space-5)',
        }}
      >
        {window.NAV.map((n) => {
          const on = active === n.id
          return (
            <button
              key={n.id}
              onClick={() => onNavigate(n.id)}
              aria-current={on ? 'true' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                background: 'none', border: 0, padding: 0, cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
                letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
                color: on ? 'var(--accent)' : 'var(--text-faint)',
                transition: 'color var(--dur-base) var(--ease-glide)',
              }}
            >
              <span style={{
                display: 'inline-block', width: on ? 28 : 12, height: 1,
                background: 'currentColor',
                transition: 'width var(--dur-base) var(--ease-glide)',
              }} />
              {n.label}
            </button>
          )
        })}
      </nav>

      <a
        href="#contact"
        onClick={(e) => { e.preventDefault(); onNavigate('contact') }}
        style={{
          position: 'fixed', bottom: 'var(--space-8)', left: 'var(--gutter)', zIndex: 'var(--z-nav)',
          display: 'flex', alignItems: 'center', gap: 'var(--space-3)', textDecoration: 'none',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
          color: 'var(--text-dim)',
        }}
      >
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--verdigris-300)', flexShrink: 0,
        }} />
        Available for work
      </a>
    </React.Fragment>
  )
}

Object.assign(window, { SideIndex })
