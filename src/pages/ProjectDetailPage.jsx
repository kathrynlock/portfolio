import { useEffect, useRef, useMemo } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { PROJECTS } from '../utils/content';

/* ── INLINE MARKDOWN ───────────────────────────────────────────── */
function renderInline(text) {
  const parts = [];
  let i = 0;
  let buf = '';
  let key = 0;
  const flush = () => { if (buf) { parts.push(buf); buf = ''; } };

  while (i < text.length) {
    if (text[i] === '*' && text[i + 1] === '*') {
      flush();
      const end = text.indexOf('**', i + 2);
      if (end !== -1) { parts.push(<strong key={key++}>{text.slice(i + 2, end)}</strong>); i = end + 2; continue; }
    }
    if (text[i] === '*' && text[i + 1] !== '*') {
      flush();
      const end = text.indexOf('*', i + 1);
      if (end !== -1) { parts.push(<em key={key++}>{text.slice(i + 1, end)}</em>); i = end + 1; continue; }
    }
    if (text[i] === '[' && text[i + 1] !== '!') {
      const closeB = text.indexOf(']', i);
      if (closeB !== -1 && text[closeB + 1] === '(') {
        const closeP = text.indexOf(')', closeB + 2);
        if (closeP !== -1) {
          flush();
          parts.push(
            <a key={key++} href={text.slice(closeB + 2, closeP)} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--lavender-mid)', textDecoration: 'underline' }}>
              {text.slice(i + 1, closeB)}
            </a>
          );
          i = closeP + 1;
          continue;
        }
      }
    }
    buf += text[i++];
  }
  flush();
  return parts.length === 0 ? '' : parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
}

/* ── BLOCK RENDERER ────────────────────────────────────────────── */
const IMG_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const VIDEO_EXT = /\.(mp4|webm|ogg|mov)$/i;

function youtubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function YouTubeEmbed({ id, isMobile }) {
  return (
    <div style={{ margin: '40px 0' }}>
      <div style={{
        borderRadius: '20px', overflow: 'hidden',
        border: '2px solid rgba(255,255,255,0.9)',
        boxShadow: '6px 6px 0 rgba(58,47,74,0.08)',
        position: 'relative', paddingBottom: isMobile ? '177%' : '56.25%', height: 0,
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
}

function ProjectBody({ body, color, isMobile }) {
  const blocks = (body || '').split(/\n\n+/).filter(b => b.trim());
  const firstParagraphDone = { current: false };

  return (
    <div>
      {blocks.map((block, i) => {
        // h2
        if (/^## /.test(block)) {
          return (
            <h2 key={i} style={{
              fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontWeight: 400,
              fontSize: isMobile ? '28px' : '36px', color: 'var(--text)',
              marginTop: '52px', marginBottom: '16px', lineHeight: 1.15,
            }}>
              {block.slice(3)}
            </h2>
          );
        }
        // h3
        if (/^### /.test(block)) {
          return (
            <h3 key={i} style={{
              fontFamily: 'Outfit', fontWeight: 800, fontSize: '11px',
              letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--lavender-mid)', marginTop: '36px', marginBottom: '10px',
            }}>
              {block.slice(4)}
            </h3>
          );
        }
        // blockquote
        if (/^> /.test(block)) {
          return (
            <blockquote key={i} style={{
              margin: '44px 0 44px -20px', padding: '4px 0 4px 28px',
              borderLeft: '3px solid var(--lavender-mid)',
              fontFamily: "'Newsreader', serif", fontStyle: 'italic',
              fontSize: isMobile ? '24px' : '30px', lineHeight: 1.35, color: 'var(--text)',
            }}>
              {block.slice(2)}
            </blockquote>
          );
        }

        // YouTube / Vimeo bare URL on its own line
        if (/^https?:\/\//.test(block.trim()) && !block.includes('\n')) {
          const ytId = youtubeId(block.trim());
          if (ytId) return <YouTubeEmbed key={i} id={ytId} isMobile={isMobile} />;
        }

        // image/video detection — each line may be ![alt](url)
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        const imgMatches = lines.map(l => l.match(IMG_RE));
        const allImages = imgMatches.every(m => m !== null);

        if (allImages && lines.length === 1) {
          const [, alt, src] = imgMatches[0];
          if (VIDEO_EXT.test(src)) {
            return (
              <div key={i} style={{ margin: '40px 0' }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.9)', boxShadow: '6px 6px 0 rgba(58,47,74,0.08)' }}>
                  <video src={src} controls style={{ width: '100%', display: 'block', background: '#000' }} />
                </div>
                {alt && <p style={{ marginTop: '10px', fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600, textAlign: 'center', letterSpacing: '0.5px' }}>{alt}</p>}
              </div>
            );
          }
          return (
            <figure key={i} style={{ margin: '40px 0' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.9)', boxShadow: '6px 6px 0 rgba(58,47,74,0.08)' }}>
                <img src={src} alt={alt} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
              </div>
              {alt && <figcaption style={{ marginTop: '10px', fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600, textAlign: 'center', letterSpacing: '0.5px' }}>{alt}</figcaption>}
            </figure>
          );
        }

        if (allImages && lines.length > 1) {
          const images = imgMatches.map(m => ({ alt: m[1], src: m[2] }));
          const cols = Math.min(images.length, isMobile ? 2 : 3);
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '12px', margin: '40px 0' }}>
              {images.map(({ alt, src }, j) => (
                <div key={j} style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.9)', boxShadow: '4px 4px 0 rgba(58,47,74,0.06)' }}>
                  <img src={src} alt={alt} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          );
        }

        // first paragraph gets the drop cap
        if (!firstParagraphDone.current && !/^[#>!]/.test(block) && !allImages) {
          firstParagraphDone.current = true;
          const text = block.replace(/\n/g, ' ');
          return (
            <p key={i} style={{ fontFamily: "'EB Garamond', serif", fontSize: isMobile ? '17px' : '19px', lineHeight: 1.78, color: 'var(--text)', marginBottom: '24px' }}>
              <span style={{
                float: 'left', fontFamily: "'Newsreader', serif", fontWeight: 500,
                fontSize: isMobile ? '60px' : '76px', lineHeight: 0.85,
                padding: '8px 12px 0 0', color: color || 'var(--lavender-mid)',
              }}>{text.charAt(0)}</span>
              {renderInline(text.slice(1))}
            </p>
          );
        }

        // regular paragraph
        const text = block.replace(/\n/g, ' ');
        return (
          <p key={i} style={{ fontFamily: "'EB Garamond', serif", fontSize: isMobile ? '17px' : '19px', lineHeight: 1.78, color: 'var(--text)', marginBottom: '24px' }}>
            {renderInline(text)}
          </p>
        );
      })}
    </div>
  );
}

/* ── HERO ──────────────────────────────────────────────────────── */
function HeroBlock({ project }) {
  if (project.hero) {
    return (
      <div style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '52px', border: '2px solid rgba(255,255,255,0.9)', boxShadow: '8px 8px 0 rgba(58,47,74,0.1)' }}>
        <img src={project.hero} alt={project.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }
  return (
    <div style={{
      borderRadius: '24px', overflow: 'hidden', marginBottom: '52px',
      border: '2px solid rgba(255,255,255,0.9)', boxShadow: '8px 8px 0 rgba(58,47,74,0.1)',
      background: project.color, height: '280px', position: 'relative',
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="proj-hero-pat" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <rect width="22" height="22" fill="transparent" />
            <rect x="0" y="0" width="5" height="5" fill="rgba(255,255,255,0.26)" />
            <rect x="11" y="11" width="5" height="5" fill="rgba(255,255,255,0.26)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#proj-hero-pat)" />
      </svg>
    </div>
  );
}

/* ── RELATED PROJECTS ──────────────────────────────────────────── */
function RelatedProjects({ current, onOpen }) {
  const related = useMemo(() =>
    PROJECTS.filter(p => p.slug !== current.slug && p.tag === current.tag).slice(0, 3),
    [current.slug, current.tag]
  );
  const others = useMemo(() =>
    related.length > 0 ? related : PROJECTS.filter(p => p.slug !== current.slug).slice(0, 3),
    [related, current.slug]
  );
  if (others.length === 0) return null;

  return (
    <div style={{ marginTop: '80px' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '11px', color: 'var(--lavender-mid)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
        MORE PROJECTS
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(others.length, 3)}, 1fr)`, gap: '16px' }}>
        {others.map(p => (
          <div key={p.slug} className="lift" onClick={() => onOpen(p)} style={{
            background: 'white', borderRadius: '20px', overflow: 'hidden',
            border: '1.5px solid rgba(255,255,255,0.9)',
            boxShadow: '4px 4px 0 rgba(58,47,74,0.08)', cursor: 'pointer',
          }}>
            <div style={{ height: '80px', background: p.color, position: 'relative' }}>
              <svg width="100%" height="80" style={{ position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`rel-pat-${p.slug}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                    <rect width="14" height="14" fill="transparent" />
                    <rect x="0" y="0" width="3" height="3" fill="rgba(255,255,255,0.22)" />
                    <rect x="7" y="7" width="3" height="3" fill="rgba(255,255,255,0.22)" />
                  </pattern>
                </defs>
                <rect width="100%" height="80" fill={`url(#rel-pat-${p.slug})`} />
              </svg>
            </div>
            <div style={{ padding: '16px 18px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '9px', color: 'var(--lavender-mid)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{p.tag} · {p.year}</div>
              <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '20px', color: 'var(--text)', lineHeight: 1.2, marginBottom: '6px' }}>{p.title}</div>
              <div style={{ fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-mid)', lineHeight: 1.5 }}>{p.brief}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MAIN PAGE ─────────────────────────────────────────────────── */
export function ProjectDetailPage({ slug, onBack, onOpenProject }) {
  const isMobile = useIsMobile();
  const articleRef = useRef(null);
  const project = PROJECTS.find(p => p.slug === slug) ?? null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '48px', color: 'var(--lavender-mid)', marginBottom: '16px' }}>project not found</div>
          <button onClick={onBack} style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--lavender-mid)', background: 'none', border: 'none', cursor: 'pointer' }}>← back to projects</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={articleRef} style={{ minHeight: '100vh', paddingTop: '90px', background: 'var(--bg)' }}>
      <article style={{ maxWidth: '780px', margin: '0 auto', padding: isMobile ? '30px 24px 80px' : '30px 24px 120px' }}>

        {/* Back */}
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Outfit', fontSize: '12px', fontWeight: 800,
          color: 'var(--lavender-mid)', letterSpacing: '1.8px', textTransform: 'uppercase',
          padding: 0, marginBottom: '44px', display: 'inline-flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '18px', textTransform: 'none' }}>←</span>
          back to projects
        </button>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span style={{
            background: project.color, color: project.dark || 'var(--text)',
            borderRadius: '20px', padding: '4px 14px',
            fontFamily: 'Outfit', fontWeight: 800, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase',
          }}>{project.tag}</span>
          <span style={{ fontFamily: 'Outfit', fontSize: '11px', fontWeight: 700, color: 'var(--text-light)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{project.year}</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontWeight: 400,
          fontSize: isMobile ? '48px' : '68px', color: 'var(--text)',
          lineHeight: 1.04, marginBottom: '20px', letterSpacing: '0.005em',
        }}>{project.title}</h1>

        {/* Brief */}
        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: isMobile ? '19px' : '22px',
          color: 'var(--text-mid)', lineHeight: 1.55, fontStyle: 'italic', marginBottom: '28px',
        }}>{project.desc || project.brief}</p>

        {/* Skills + links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: project.link || project.github ? '18px' : '44px' }}>
          {(project.skills || []).map(s => (
            <span key={s} style={{
              background: project.color, color: project.dark || 'var(--text)',
              borderRadius: '24px', padding: '6px 16px',
              fontSize: '12px', fontFamily: 'Outfit', fontWeight: 800,
            }}>{s}</span>
          ))}
        </div>

        {(project.link || project.github) && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '44px' }}>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'Outfit', fontWeight: 800, fontSize: '13px', letterSpacing: '1.2px', textTransform: 'uppercase',
                background: 'var(--text)', color: 'white', borderRadius: '32px',
                padding: '12px 24px', textDecoration: 'none', boxShadow: '4px 4px 0 rgba(58,47,74,0.15)',
              }}>
                view project →
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'Outfit', fontWeight: 800, fontSize: '13px', letterSpacing: '1.2px', textTransform: 'uppercase',
                background: 'white', color: 'var(--text)', borderRadius: '32px',
                padding: '12px 24px', textDecoration: 'none',
                border: '2px solid rgba(138,115,151,0.3)',
                boxShadow: '4px 4px 0 rgba(58,47,74,0.08)',
              }}>
                github
              </a>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(138,115,151,0.3), transparent)', marginBottom: '48px' }} />

        {/* Body */}
        <ProjectBody body={project.body} color={project.dark} isMobile={isMobile} />

        {/* End ornament */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '64px 0 56px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(138,115,151,0.4), transparent)' }} />
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '22px', color: 'var(--lavender-mid)' }}>✻</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(138,115,151,0.4), transparent)' }} />
        </div>

        {/* Related */}
        <RelatedProjects current={project} onOpen={(p) => onOpenProject(p.slug)} />
      </article>
    </div>
  );
}
