import { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { TweaksPanel } from './components/TweaksPanel';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ResumePage } from './pages/ResumePage';
import { BlogPage } from './pages/BlogPage';
import { TWEAK_DEFAULTS } from './data';

const PAGES = ['home', 'projects', 'about', 'resume', 'blog'];

function pathToState(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0] || 'home';
  if (first === 'blog' && parts[1]) return { page: 'blog', blogSlug: parts[1], projectSlug: null };
  if (first === 'projects' && parts[1]) return { page: 'projects', projectSlug: parts[1], blogSlug: null };
  return { page: PAGES.includes(first) ? first : 'home', blogSlug: null, projectSlug: null };
}

export function App() {
  const [page, setPage]               = useState(() => pathToState(window.location.pathname).page);
  const [blogSlug, setBlogSlug]       = useState(() => pathToState(window.location.pathname).blogSlug);
  const [projectSlug, setProjectSlug] = useState(() => pathToState(window.location.pathname).projectSlug);
  const [tweaks, setTweaks]           = useState(TWEAK_DEFAULTS);
  const [tweaksVis, setTweaksVis]     = useState(false);

  const goTo = (p) => {
    window.history.pushState({}, '', p === 'home' ? '/' : `/${p}`);
    setPage(p);
    setBlogSlug(null);
    setProjectSlug(null);
  };

  const goToBlogPost = (slug) => {
    window.history.pushState({}, '', `/blog/${slug}`);
    setPage('blog');
    setBlogSlug(slug);
    setProjectSlug(null);
  };

  const goToProject = (slug) => {
    window.history.pushState({}, '', `/projects/${slug}`);
    setPage('projects');
    setProjectSlug(slug);
    setBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    if (!projectSlug) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page, projectSlug]);

  useEffect(() => {
    const onPop = () => {
      const s = pathToState(window.location.pathname);
      setPage(s.page);
      setBlogSlug(s.blogSlug);
      setProjectSlug(s.projectSlug);
    };
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
    <div>
      <Nav page={page} setPage={goTo} />
      <div key={page + (projectSlug || '') + (blogSlug || '')} className="page-animate">
        {page === 'home'     && <HomePage     setPage={goTo} tweaks={tweaks} />}
        {page === 'projects' && !projectSlug  && <ProjectsPage tweaks={tweaks} onOpenProject={goToProject} />}
        {page === 'projects' && projectSlug   && <ProjectDetailPage slug={projectSlug} onBack={() => goTo('projects')} onOpenProject={goToProject} />}
        {page === 'about'    && <AboutPage    setPage={goTo} />}
        {page === 'resume'   && <ResumePage   tweaks={tweaks} />}
        {page === 'blog'     && <BlogPage     tweaks={tweaks} slug={blogSlug} onOpenPost={goToBlogPost} onBack={() => goTo('blog')} />}
      </div>
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweaksVis} />
    </div>
  );
}
