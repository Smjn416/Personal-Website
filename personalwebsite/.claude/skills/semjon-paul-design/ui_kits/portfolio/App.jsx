const { SceneBackdrop } = window.SemjonPaulDesignSystem_d2b8a3

/**
 * Click-through shell. Home is one scrolling page (Hero → Work → About →
 * Contact); selecting a project swaps to the case-study view. In the real
 * Next.js app these are App Router routes, not local state.
 */
function App() {
  const [view, setView] = React.useState({ name: 'home', slug: null })
  const [active, setActive] = React.useState('')
  const scrollerRef = React.useRef(null)

  const scrollToId = (id) => {
    const scroller = scrollerRef.current
    const el = document.getElementById(id)
    if (!scroller || !el) return
    const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 24
    scroller.scrollTo({ top, behavior: 'smooth' })
  }

  const navigate = (id) => {
    if (id === 'home') { setView({ name: 'home', slug: null }); scrollerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); return }
    if (view.name !== 'home') {
      setView({ name: 'home', slug: null })
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)))
      return
    }
    scrollToId(id)
  }

  const open = (slug) => {
    setView({ name: 'project', slug })
    scrollerRef.current?.scrollTo({ top: 0 })
  }

  React.useEffect(() => {
    if (view.name !== 'home') { setActive(''); return }
    const ids = window.NAV.map((n) => n.id)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { root: scrollerRef.current, threshold: 0.35 }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [view.name])

  return (
    <React.Fragment>
      <SceneBackdrop />
      <window.SideIndex onNavigate={navigate} active={active} />
      <div
        ref={scrollerRef}
        style={{ position: 'relative', zIndex: 'var(--z-content)', height: '100%', overflowY: 'auto' }}
      >
        {view.name === 'home' ? (
          <React.Fragment>
            <window.Hero onNavigate={navigate} />
            <window.Work onOpen={open} />
            <window.About />
            <window.Contact />
            <window.Footer />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <window.ProjectDetail slug={view.slug} onBack={() => setView({ name: 'home', slug: null })} onOpen={open} />
            <window.Footer />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
