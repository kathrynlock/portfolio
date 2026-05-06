// ─── ROUTING HELPERS ──────────────────────────────────────
const PAGES = ['home', 'projects', 'about', 'resume'];

function pathToPage(pathname) {
  const slug = pathname.replace(/^\//, '') || 'home';
  return PAGES.includes(slug) ? slug : 'home';
}

function navigateTo(page, setPage) {
  const path = page === 'home' ? '/' : `/${page}`;
  window.history.pushState({ page }, '', path);
  setPage(page);
}

// ─── APP ──────────────────────────────────────────────────
function App() {
  const [page, setPage]           = useState(() => pathToPage(window.location.pathname));
  const [tweaks, setTweaks]       = useState(TWEAK_DEFAULTS);
  const [tweaksVis, setTweaksVis] = useState(false);

  // Wrap setPage so every navigation updates the URL
  const goTo = (p) => navigateTo(p, setPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPop = (e) => setPage(pathToPage(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const handler = e => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksVis(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVis(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    document.querySelectorAll('.hero-title').forEach(el => { el.style.fontSize = tweaks.heroSize + 'px'; });
  }, [tweaks.heroSize]);

  return (
    <div key={page} className="page-animate">
      <Nav page={page} setPage={goTo} />
      {page === 'home'     && <HomePage     setPage={goTo} />}
      {page === 'projects' && <ProjectsPage />}
      {page === 'about'    && <AboutPage    />}
      {page === 'resume'   && <ResumePage   />}
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweaksVis} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
