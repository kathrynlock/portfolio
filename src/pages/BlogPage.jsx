import { useState, useEffect, useRef, useMemo } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { PATTERN_DEFS, patternKeyFor } from '../utils/patterns';
import { BLOG_POSTS } from '../utils/content';

/* ── DATA ──────────────────────────────────────────────────────── */
const BLOG_TAGS = ['Journal', 'Behind the Scenes', 'Photography', 'Crafts', 'Sweet Treats', 'School Life', 'Lists', 'Notes'];

const TAG_COLOR = {
  'Journal':           { bg: 'var(--lavender-light)', dark: 'var(--lavender-mid)' },
  'Behind the Scenes': { bg: 'var(--yellow)',          dark: '#8B7A2E' },
  'Photography':       { bg: 'var(--blue-light)',      dark: 'var(--moss)' },
  'Crafts':            { bg: '#E5D2CE',                dark: '#8B5C56' },
  'Sweet Treats':      { bg: 'var(--pink)',            dark: 'var(--pink-mid)' },
  'School Life':       { bg: 'var(--mint)',            dark: 'var(--moss)' },
  'Lists':             { bg: 'var(--yellow)',          dark: '#8B7A2E' },
  'Notes':             { bg: 'var(--lavender-light)',  dark: 'var(--lavender-mid)' },
};

/* ── HELPERS ───────────────────────────────────────────────────── */
function formatDate(iso) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Shows a real image if `src` is provided, otherwise falls back to the
 * SVG pattern placeholder. Add `hero: /blog/my-image.jpg` to a post's
 * frontmatter to use a real photo.
 */
function HeroImage({ src, color, h = 200, patternId, tag, variedPatterns }) {
  if (src) {
    return (
      <div style={{ height: `${h}px`, width: '100%', overflow: 'hidden' }}>
        <img
          src={src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }
  const key = variedPatterns ? patternKeyFor(tag) : null;
  const def = key && PATTERN_DEFS[key];
  return (
    <div style={{ background: color, height: `${h}px`, width: '100%', position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height={h} style={{ position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {def ? def.render(patternId) : (
            <pattern id={patternId} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <rect width="18" height="18" fill="transparent"/>
              <rect x="0" y="0" width="4" height="4" fill="rgba(255,255,255,0.28)"/>
              <rect x="9" y="9" width="4" height="4" fill="rgba(255,255,255,0.28)"/>
            </pattern>
          )}
        </defs>
        <rect width="100%" height={h} fill={`url(#${patternId})`}/>
      </svg>
      <div style={{ position: 'absolute', bottom: '10px', right: '14px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '8px', color: 'rgba(58,47,74,0.4)', letterSpacing: '1.2px' }}>[ hero image ]</div>
    </div>
  );
}

function TagChip({ tag, size = 'md' }) {
  const c = TAG_COLOR[tag] || TAG_COLOR['Notes'];
  const sizes = { sm: { pad: '3px 9px', fs: 9 }, md: { pad: '4px 12px', fs: 10 }, lg: { pad: '6px 16px', fs: 12 } }[size];
  return (
    <span style={{
      background: c.bg, color: c.dark,
      borderRadius: '20px', padding: sizes.pad,
      fontFamily: 'Outfit', fontWeight: 800,
      fontSize: `${sizes.fs}px`, letterSpacing: '0.8px', textTransform: 'uppercase',
      whiteSpace: 'nowrap', display: 'inline-block',
    }}>{tag}</span>
  );
}

/* ── WASHI TAPE ────────────────────────────────────────────────── */
const TAPES = [
  { pos: { top: '-12px', left: '50%', x: '-50%' },   rot: -2,  w: 88,  h: 22, bg: 'rgba(201,184,217,0.72)', border: 'rgba(138,115,151,0.25)', pattern: null },
  { pos: { top: '-10px', left: '-14px', x: '0' },    rot: -32, w: 96,  h: 20, bg: 'rgba(239,231,206,0.85)', border: 'rgba(180,160,100,0.3)', pattern: 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(180,150,80,0.28) 6px 8px)' },
  { pos: { top: '-10px', right: '-14px', x: '0' },   rot: 30,  w: 96,  h: 20, bg: 'rgba(194,205,184,0.85)', border: 'rgba(93,110,79,0.25)',  pattern: 'radial-gradient(circle, rgba(93,110,79,0.35) 1.4px, transparent 1.6px) 0 0 / 8px 8px' },
  { pos: { top: '-13px', left: '50%', x: '-50%' },   rot: 3,   w: 100, h: 24, bg: 'rgba(212,181,176,0.78)', border: 'rgba(184,138,133,0.3)', pattern: null },
  { pos: { top: '-11px', left: '18px', x: '0' },     rot: -14, w: 92,  h: 21, bg: 'rgba(221,227,210,0.85)', border: 'rgba(93,110,79,0.22)',  pattern: 'repeating-linear-gradient(90deg, transparent 0 7px, rgba(93,110,79,0.22) 7px 8px)' },
  { pos: { top: '-12px', left: '50%', x: '-50%' },   rot: -5,  w: 85,  h: 22, bg: 'rgba(232,224,236,0.78)', border: 'rgba(104,94,123,0.3)',  pattern: 'repeating-linear-gradient(0deg, transparent 0 4px, rgba(104,94,123,0.22) 4px 6px)' },
  { pos: { top: '-11px', right: '16px', x: '0' },    rot: 12,  w: 94,  h: 20, bg: 'rgba(248,239,213,0.88)', border: 'rgba(180,160,100,0.28)', pattern: 'conic-gradient(from 0deg at 50% 50%, rgba(180,150,80,0.22) 0 25%, transparent 0 50%, rgba(180,150,80,0.22) 0 75%, transparent 0) 0 0 / 10px 10px' },
  { pos: { top: '-10px', left: '-10px', x: '0' },    rot: -26, w: 100, h: 21, bg: 'rgba(221,227,210,0.82)', border: 'rgba(93,110,79,0.22)',  pattern: 'radial-gradient(circle at 25% 50%, rgba(93,110,79,0.32) 1.2px, transparent 1.5px), radial-gradient(circle at 75% 50%, rgba(184,138,133,0.4) 1.2px, transparent 1.5px)', patternSize: '14px 14px' },
];

function PolaroidTape({ tape }) {
  return (
    <div style={{
      position: 'absolute',
      top: tape.pos.top, left: tape.pos.left, right: tape.pos.right,
      transform: `translateX(${tape.pos.x}) rotate(${tape.rot}deg)`,
      width: `${tape.w}px`, height: `${tape.h}px`,
      background: tape.bg,
      backgroundImage: tape.pattern || 'none',
      backgroundSize: tape.patternSize || 'auto',
      border: `1px solid ${tape.border}`,
      boxShadow: '0 1px 3px rgba(58,47,74,0.1), inset 0 0 12px rgba(255,255,255,0.15)',
      zIndex: 2, pointerEvents: 'none',
    }}/>
  );
}

/* ── POLAROID LAYOUT ───────────────────────────────────────────── */
function LayoutPolaroid({ posts, onOpen, variedPatterns }) {
  const rotations = [-2.2, 1.5, -1, 2.8, -2.4, 0.8, -1.8, 2.0, -1.2, 1.7];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '42px 26px', padding: '30px 8px',
    }}>
      {posts.map((p, i) => {
        const rot = rotations[i % rotations.length];
        const tape = TAPES[i % TAPES.length];
        const secondTape = (i % 3 === 0) ? TAPES[(i + 4) % TAPES.length] : null;
        return (
          <article
            key={p.slug}
            onClick={() => onOpen(p)}
            style={{
              background: 'white', padding: '14px 14px 22px',
              borderRadius: '4px',
              boxShadow: '6px 8px 24px rgba(58,47,74,0.14), 0 1px 4px rgba(58,47,74,0.06)',
              transform: `rotate(${rot}deg)`, cursor: 'pointer',
              transition: 'transform 0.28s ease, box-shadow 0.28s ease',
              position: 'relative',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0deg) translateY(-6px) scale(1.03)'; e.currentTarget.style.boxShadow = '10px 14px 32px rgba(58,47,74,0.22), 0 2px 8px rgba(58,47,74,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${rot}deg)`; e.currentTarget.style.boxShadow = '6px 8px 24px rgba(58,47,74,0.14), 0 1px 4px rgba(58,47,74,0.06)'; }}
          >
            <PolaroidTape tape={tape}/>
            {secondTape && <PolaroidTape tape={secondTape}/>}
            <HeroImage
              src={p.hero}
              color={p.heroColor}
              h={170}
              patternId={`pol-${p.slug}`}
              tag={p.tags?.[0]}
              variedPatterns={variedPatterns}
            />
            <div style={{ padding: '16px 4px 0' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '8.5px', color: 'var(--lavender-mid)', letterSpacing: '1.8px', marginBottom: '8px' }}>
                {formatDate(p.date).toUpperCase()}
              </div>
              <h3 style={{
                fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontWeight: 400,
                fontSize: '22px', color: 'var(--text)', lineHeight: 1.18, marginBottom: '10px',
              }}>{p.title}</h3>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {p.tags.map(t => <TagChip key={t} tag={t} size="sm"/>)}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ── LIST LAYOUT (mobile) ──────────────────────────────────────── */
function LayoutList({ posts, onOpen }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {posts.map((p, i) => (
        <li
          key={p.slug}
          onClick={() => onOpen(p)}
          style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: '12px', alignItems: 'center',
            padding: '20px 4px',
            borderTop: i === 0 ? '1px solid rgba(138,115,151,0.3)' : 'none',
            borderBottom: '1px solid rgba(138,115,151,0.3)',
            cursor: 'pointer',
          }}
        >
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '9px', color: 'var(--lavender-mid)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
              {formatDate(p.date)} · {p.readMins} min
            </div>
            <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '22px', color: 'var(--text)', lineHeight: 1.2, marginBottom: '6px' }}>{p.title}</div>
            <div style={{ fontFamily: "'EB Garamond', serif", fontSize: '14px', color: 'var(--text-mid)', fontStyle: 'italic', lineHeight: 1.4, marginBottom: '8px' }}>{p.excerpt}</div>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {p.tags.map(t => <TagChip key={t} tag={t} size="sm"/>)}
            </div>
          </div>
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '22px', color: 'var(--lavender-mid)', flexShrink: 0 }}>→</span>
        </li>
      ))}
    </ul>
  );
}

/* ── BLOG INDEX ────────────────────────────────────────────────── */
function BlogIndex({ openPost, variedPatterns }) {
  const isMobile = useIsMobile();
  const [query, setQuery]         = useState('');
  const [activeTag, setActiveTag] = useState('all');

  // BLOG_POSTS is already sorted newest-first by the content loader
  const filtered = useMemo(() => {
    return BLOG_POSTS.filter(p => {
      const matchTag = activeTag === 'all' || p.tags.includes(activeTag);
      const q = query.trim().toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q);
      return matchTag && matchQ;
    });
  }, [query, activeTag]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px' }}>
      <section style={{ padding: isMobile ? '40px 24px 36px' : '60px 60px 36px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '52px' : '68px', color: 'var(--text)', lineHeight: 1, marginBottom: '10px' }}>
            some thoughts
          </h1>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: isMobile ? '17px' : '19px', color: 'var(--text-mid)', lineHeight: 1.55, fontStyle: 'italic', maxWidth: '52ch' }}>
            Essentially my notes app but slightly more polished.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: 'white', borderRadius: '30px', padding: '12px 20px',
            border: '1.5px solid rgba(138,115,151,0.3)',
            boxShadow: '4px 4px 0px rgba(138,115,151,0.18)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="var(--lavender-mid)" strokeWidth="1.6"/>
              <path d="M11 11L14 14" stroke="var(--lavender-mid)" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="search posts, tags, ideas…"
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontFamily: "'EB Garamond', serif", fontStyle: query ? 'normal' : 'italic',
                fontSize: '16px', color: 'var(--text)', flex: 1,
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-light)', fontFamily: 'Outfit', fontWeight: 700, fontSize: '12px',
              }}>clear</button>
            )}
          </label>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['all', ...BLOG_TAGS].map(t => {
              const isActive = activeTag === t;
              return (
                <button key={t} onClick={() => setActiveTag(t)} style={{
                  fontFamily: 'Outfit', fontSize: '11px', fontWeight: 800,
                  background: isActive ? 'var(--text)' : 'white',
                  color: isActive ? 'white' : 'var(--text-mid)',
                  border: `1.5px solid ${isActive ? 'var(--text)' : 'rgba(138,115,151,0.3)'}`,
                  borderRadius: '20px', padding: '7px 14px',
                  cursor: 'pointer', letterSpacing: '1.2px', textTransform: 'uppercase',
                  transition: 'all 0.18s ease',
                }}>{t}</button>
              );
            })}
          </div>
        </div>

        <div style={{ fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          {activeTag !== 'all' && <span> · in {activeTag}</span>}
          {query && <span> · matching "{query}"</span>}
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', border: '2px dashed rgba(138,115,151,0.3)' }}>
            <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '32px', color: 'var(--lavender-mid)', marginBottom: '10px' }}>nothing here yet</div>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '17px', color: 'var(--text-mid)', fontStyle: 'italic' }}>Try a different search or tag.</p>
          </div>
        ) : isMobile ? (
          <LayoutList posts={filtered} onOpen={openPost}/>
        ) : (
          <LayoutPolaroid posts={filtered} onOpen={openPost} variedPatterns={variedPatterns}/>
        )}
      </section>
    </div>
  );
}

/* ── BLOG POST BODY ────────────────────────────────────────────── */
/**
 * Renders the markdown body (plain paragraphs separated by blank lines).
 * - First paragraph gets the drop-cap treatment.
 * - The pull-quote (from frontmatter) is inserted after the second paragraph.
 */
function PostBody({ body, pull }) {
  const paragraphs = (body || '').split(/\n\n+/).filter(p => p.trim());
  const [first, ...rest] = paragraphs;
  const splitAt = Math.min(2, rest.length);

  return (
    <div style={{ fontFamily: "'EB Garamond', serif", fontSize: '19px', lineHeight: 1.78, color: 'var(--text)' }}>
      {/* Lead paragraph with drop cap */}
      {first && (
        <p style={{ marginBottom: '24px' }}>
          <span style={{
            float: 'left', fontFamily: "'Newsreader', serif", fontWeight: 500,
            fontSize: '76px', lineHeight: 0.85, padding: '8px 14px 0 0',
            color: 'var(--lavender-mid)',
          }}>{first.charAt(0)}</span>
          {first.slice(1)}
        </p>
      )}

      {/* First few body paragraphs */}
      {rest.slice(0, splitAt).map((para, i) => (
        <p key={i} style={{ marginBottom: '22px' }}>{para}</p>
      ))}

      {/* Pull quote from frontmatter */}
      {pull && (
        <blockquote style={{
          margin: '40px 0 40px -20px', padding: '4px 0 4px 28px',
          borderLeft: '3px solid var(--lavender-mid)',
          fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontWeight: 400,
          fontSize: '30px', lineHeight: 1.3, color: 'var(--text)',
        }}>
          &ldquo;{pull}&rdquo;
        </blockquote>
      )}

      {/* Remaining paragraphs */}
      {rest.slice(splitAt).map((para, i) => (
        <p key={i + splitAt} style={{ marginBottom: '22px' }}>{para}</p>
      ))}
    </div>
  );
}

/* ── BLOG POST PAGE ────────────────────────────────────────────── */
function BlogPostPage({ post, openPost, back, variedPatterns }) {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -el.getBoundingClientRect().top;
      setProgress(total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [post.slug]);

  const related = useMemo(() =>
    BLOG_POSTS.filter(p => p.slug !== post.slug && p.tags.some(t => post.tags.includes(t))).slice(0, 3),
    [post.slug]
  );

  return (
    <div ref={articleRef} style={{ minHeight: '100vh', paddingTop: '90px', background: 'var(--bg)' }}>
      {/* reading progress bar */}
      <div style={{ position: 'fixed', top: '72px', left: 0, right: 0, height: '3px', background: 'rgba(201,184,217,0.2)', zIndex: 150 }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: 'var(--lavender-mid)', transition: 'width 0.08s linear' }}/>
      </div>

      <article style={{ maxWidth: '780px', margin: '0 auto', padding: '30px 24px 100px' }}>
        <button onClick={back} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Outfit', fontSize: '12px', fontWeight: 800,
          color: 'var(--lavender-mid)', letterSpacing: '1.8px', textTransform: 'uppercase',
          padding: '0', marginBottom: '40px', display: 'inline-flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '18px', textTransform: 'none' }}>←</span>
          back to all entries
        </button>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '18px' }}>
          {post.tags.map(t => <TagChip key={t} tag={t} size="md"/>)}
          <span style={{ color: 'var(--text-light)' }}>·</span>
          <span style={{ fontFamily: 'Outfit', fontSize: '11px', fontWeight: 700, color: 'var(--text-light)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{formatDate(post.date)}</span>
          <span style={{ color: 'var(--text-light)' }}>·</span>
          <span style={{ fontFamily: 'Outfit', fontSize: '11px', fontWeight: 700, color: 'var(--text-light)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{post.readMins} min read</span>
        </div>

        <h1 style={{
          fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontWeight: 400,
          fontSize: '62px', color: 'var(--text)', lineHeight: 1.04, marginBottom: '18px',
          letterSpacing: '0.005em',
        }}>{post.title}</h1>

        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: '22px', color: 'var(--text-mid)',
          lineHeight: 1.55, fontStyle: 'italic', marginBottom: '36px',
        }}>{post.excerpt}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '30px', marginBottom: '40px', borderBottom: '1px solid rgba(138,115,151,0.25)' }}>
          <img src="/assets/kl-logo.png" alt="KL" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(58,47,74,0.18)' }}/>
          <div>
            <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '19px', color: 'var(--text)' }}>kate lock</div>
            <div style={{ fontFamily: 'Outfit', fontSize: '11px', fontWeight: 600, color: 'var(--text-light)', letterSpacing: '0.5px' }}>writing from austin, tx</div>
          </div>
        </div>

        <div style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '48px', border: '2px solid rgba(255,255,255,0.9)', boxShadow: '6px 6px 0px rgba(58,47,74,0.08)' }}>
          <HeroImage
            src={post.hero}
            color={post.heroColor}
            h={360}
            patternId={`post-hero-${post.slug}`}
            tag={post.tags?.[0]}
            variedPatterns={variedPatterns}
          />
        </div>

        <PostBody body={post.body} pull={post.pull} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '56px 0 48px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(138,115,151,0.4), transparent)' }}/>
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '22px', color: 'var(--lavender-mid)' }}>✻</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(138,115,151,0.4), transparent)' }}/>
        </div>

        {related.length > 0 && (
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '11px', color: 'var(--lavender-mid)', letterSpacing: '2px', marginBottom: '18px' }}>RELATED ENTRIES</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(related.length, 3)}, 1fr)`, gap: '16px' }}>
              {related.map(r => (
                <div key={r.slug} className="lift" onClick={() => openPost(r)} style={{
                  background: 'white', borderRadius: '18px', padding: '18px 20px',
                  border: '1.5px solid rgba(255,255,255,0.9)',
                  boxShadow: '4px 4px 0px rgba(58,47,74,0.08)', cursor: 'pointer',
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '9px', color: 'var(--lavender-mid)', letterSpacing: '1.2px', marginBottom: '8px' }}>{formatDate(r.date).toUpperCase()}</div>
                  <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '20px', color: 'var(--text)', lineHeight: 1.22, marginBottom: '10px' }}>{r.title}</div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {r.tags.slice(0, 2).map(t => <TagChip key={t} tag={t} size="sm"/>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

/* ── ROUTER (controlled by App via slug prop) ───────────────────── */
export function BlogPage({ tweaks, slug, onOpenPost, onBack }) {
  const selectedPost = slug ? (BLOG_POSTS.find(p => p.slug === slug) ?? null) : null;

  useEffect(() => {
    if (slug) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const variedPatterns = !!tweaks?.variedPatterns;

  if (selectedPost) {
    return (
      <BlogPostPage
        post={selectedPost}
        openPost={(p) => onOpenPost(p.slug)}
        back={onBack}
        variedPatterns={variedPatterns}
      />
    );
  }
  return <BlogIndex openPost={(p) => onOpenPost(p.slug)} variedPatterns={variedPatterns}/>;
}
