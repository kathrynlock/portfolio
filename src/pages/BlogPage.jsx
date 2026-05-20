import { useState, useEffect, useRef, useMemo } from 'react';
import { PATTERN_DEFS, patternKeyFor } from '../utils/patterns';

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

export const BLOG_POSTS = [
  {
    id: 1, slug: 'slow-mornings-slower-mail',
    title: 'On Slow Mornings and Slower Mail',
    date: '2026-04-22', readMins: 5,
    tags: ['Journal'],
    heroColor: 'var(--lavender-light)',
    excerpt: 'There is a particular kind of joy in writing a letter you know will take six days to arrive.',
    lead: 'I bought a new fountain pen last month and I have been writing letters again. Real ones. To my grandmother, mostly, and a friend I miss in Seattle, and one to my future self that I have been instructed not to open until December.',
    pull: 'A letter is the only message you cannot edit after you send it. That is the whole point.',
  },
  {
    id: 2, slug: 'building-this-site',
    title: 'Building This Site (Behind the Scenes)',
    date: '2026-03-30', readMins: 8,
    tags: ['Behind the Scenes', 'Notes'],
    heroColor: 'var(--yellow)',
    excerpt: 'Notes on color palettes, paper grain, and the small choices that make a portfolio feel like a place.',
    lead: 'I rebuilt this site four times before I let myself ship it. Here is what each version got wrong, what the final one finally got right, and the strange satisfaction of a paper-grain SVG noise filter at 6% opacity.',
    pull: 'Most of design is just choosing what to leave out, then leaving out more.',
  },
  {
    id: 3, slug: 'why-i-write-on-paper',
    title: 'Why I Still Write Things on Paper',
    date: '2026-03-11', readMins: 4,
    tags: ['Journal', 'Notes'],
    heroColor: 'var(--blue-light)',
    excerpt: 'A small defense of notebooks, in an age where every idea wants a citation and a Notion page.',
    lead: 'My phone holds infinite scratch space, and yet the best ideas I have had this semester live in a 4×6 Field Notes book in my backpack. There is something about the friction of a pen that lets a thought finish itself.',
    pull: 'A notebook will never autocorrect your intuition into someone else’s sentence.',
  },
  {
    id: 4, slug: 'a-year-of-film',
    title: 'A Year of Film Photography',
    date: '2026-02-18', readMins: 7,
    tags: ['Photography'],
    heroColor: '#E5D2CE',
    excerpt: 'Twelve rolls, three cameras, one very confused CVS clerk. What I learned shooting only film for a year.',
    lead: 'In January I put my digital camera in a drawer and made myself a rule: only film for one year. I expected to learn about light. I ended up learning about waiting, which turns out to be the actual skill.',
    pull: 'You only really see a moment twice — once when you take the photo, and again when the prints come back in a yellow envelope.',
  },
  {
    id: 5, slug: 'the-case-for-tiny-crafts',
    title: 'The Case for Tiny Crafts',
    date: '2026-01-27', readMins: 6,
    tags: ['Crafts'],
    heroColor: 'var(--mint)',
    excerpt: 'Embroidery hoops, three-inch zines, miniature gardens. Why I keep gravitating toward projects that fit in my palm.',
    lead: 'I started a 3-inch embroidery hoop two weeks ago and finished it last night, which is the fastest I have finished anything creative in months. There is a thesis in there about scope.',
    pull: 'A finished tiny thing teaches you more than an abandoned grand thing.',
  },
  {
    id: 6, slug: 'austin-bakery-list',
    title: 'Bakery Hopping in Austin (a running list)',
    date: '2025-12-14', readMins: 3,
    tags: ['Sweet Treats', 'Lists'],
    heroColor: 'var(--pink)',
    excerpt: 'A working ranked list of every pastry I’ve tried in Austin since freshman orientation. Updated whenever I find a new one.',
    lead: 'I keep a Note on my phone titled "Sweet Treat Survey" and it currently has 47 entries. I am moving it here so my friends will stop texting me for recommendations and so I can finally retire the screenshot.',
    pull: 'The croissant is the test. Everything else is extra credit.',
  },
  {
    id: 7, slug: 'four-years-on-etsy',
    title: 'What I Learned Selling on Etsy for 4 Years',
    date: '2025-11-02', readMins: 9,
    tags: ['Behind the Scenes', 'Journal'],
    heroColor: 'var(--yellow)',
    excerpt: 'A thousand sales, a hundred mistakes, and the strange grief of closing a shop you started in high school.',
    lead: 'I closed WithLoveKKate this spring after four years. I want to write about it before the details fade — the packing-tape muscle memory, the post office friendships, the time a custom order went missing in Vermont.',
    pull: 'A small business is mostly the part where you walk to the post office.',
  },
  {
    id: 8, slug: 'soldering-at-midnight',
    title: 'Soldering Circuits at Midnight',
    date: '2025-10-08', readMins: 5,
    tags: ['School Life', 'Behind the Scenes'],
    heroColor: 'var(--blue-light)',
    excerpt: 'The ECE lab at 11:43pm, three burnt fingertips, and an LED that finally, mercifully, blinked.',
    lead: 'It is a specific feeling to be alone in an engineering lab at midnight with a multimeter that disagrees with your assumptions. Everyone I know has had a version of this night. Here is mine, lovingly annotated.',
    pull: 'A circuit will tell you exactly what is wrong if you are humble enough to ask twice.',
  },
  {
    id: 9, slug: 'things-im-trying',
    title: 'Things I’m Trying in 2026',
    date: '2025-09-19', readMins: 4,
    tags: ['Lists', 'Notes'],
    heroColor: 'var(--lavender-light)',
    excerpt: 'Less a resolutions post, more a permission slip. Twelve small experiments, in no particular order.',
    lead: 'I do not really do resolutions. But I do keep a running list of small experiments — things I would like to try for a month or a week or just once — and I revisit it every few months to see what stuck.',
    pull: 'The good experiments are the ones you forget you started.',
  },
  {
    id: 10, slug: 'reading-list-spring',
    title: 'Reading List: Spring',
    date: '2025-08-05', readMins: 3,
    tags: ['Lists'],
    heroColor: 'var(--mint)',
    excerpt: 'Six books, two essay collections, and one extremely strange novella I cannot stop recommending.',
    lead: 'I keep a seasonal reading list mostly so I can prove to myself, at the end of the year, that I read more than I think I did. Here is the spring batch, with notes.',
    pull: 'A book finished badly still teaches you what you do not want to read.',
  },
];

const BLOG_BODY = [
  'I have been thinking about this for a while, and I am still not sure I have arrived anywhere conclusive. That is partly the point of writing it down — to find out what I think by watching the sentence finish itself.',
  'The first time I noticed this was probably in middle school, though I could not have named it then. It was the feeling of paying attention to something that did not require my attention, and finding that the attention itself was the thing I wanted.',
  'There is a quote I keep coming back to, written by someone whose name I have written in three different notebooks and lost each time. It goes something like: the small thing, attended to, is no longer small.',
  'I think this is also why I keep gravitating toward analog formats. Not out of nostalgia — I do not actually want to live in a previous decade — but because the limits feel honest. A pen runs out of ink. A roll of film has 36 frames. You cannot scroll a letter.',
  'My friend Ana, who is much wiser than me about most things, says that constraints are a love language. She means it in the relationship sense, but I think it works for objects too. The way a notebook says: you only have this much room, so make it count.',
  'I do not know how to end this neatly, so I will not try. The next post will probably contradict half of what I just said. That feels right. A blog is not a proof, it is a place to keep changing your mind in public.',
];

/* ── HELPERS ───────────────────────────────────────────────────── */
function formatDate(iso) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function HeroPattern({ color, h = 200, id, tag, variedPatterns }) {
  const key = variedPatterns ? patternKeyFor(tag) : null;
  const def = key && PATTERN_DEFS[key];
  return (
    <div style={{ background: color, height: `${h}px`, width: '100%', position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height={h} style={{ position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {def ? def.render(id) : (
            <pattern id={id} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <rect width="18" height="18" fill="transparent"/>
              <rect x="0" y="0" width="4" height="4" fill="rgba(255,255,255,0.28)"/>
              <rect x="9" y="9" width="4" height="4" fill="rgba(255,255,255,0.28)"/>
            </pattern>
          )}
        </defs>
        <rect width="100%" height={h} fill={`url(#${id})`}/>
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
            key={p.id}
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
            <HeroPattern color={p.heroColor} h={170} id={`pol-${p.id}`} tag={p.tags?.[0]} variedPatterns={variedPatterns}/>
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

/* ── BLOG INDEX ────────────────────────────────────────────────── */
function BlogIndex({ openPost, variedPatterns }) {
  const [query, setQuery]       = useState('');
  const [activeTag, setActiveTag] = useState('all');

  const sorted   = useMemo(() => [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)), []);
  const filtered = useMemo(() => {
    return sorted.filter(p => {
      const matchTag = activeTag === 'all' || p.tags.includes(activeTag);
      const q = query.trim().toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q);
      return matchTag && matchQ;
    });
  }, [sorted, query, activeTag]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px' }}>
      <section style={{ padding: '60px 60px 36px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '68px', color: 'var(--text)', lineHeight: 1, marginBottom: '10px' }}>
            some thoughts
          </h1>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '19px', color: 'var(--text-mid)', lineHeight: 1.55, fontStyle: 'italic', maxWidth: '52ch' }}>
            Essentially my notes app but slightly more polished. 
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'center', marginBottom: '44px' }}>
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

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
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

        <div style={{ fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '32px' }}>
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          {activeTag !== 'all' && <span> · in {activeTag}</span>}
          {query && <span> · matching "{query}"</span>}
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', border: '2px dashed rgba(138,115,151,0.3)' }}>
            <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '32px', color: 'var(--lavender-mid)', marginBottom: '10px' }}>nothing here yet</div>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '17px', color: 'var(--text-mid)', fontStyle: 'italic' }}>Try a different search or tag.</p>
          </div>
        ) : (
          <LayoutPolaroid posts={filtered} onOpen={openPost} variedPatterns={variedPatterns}/>
        )}
      </section>
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
  }, [post.id]);

  const related = useMemo(() =>
    BLOG_POSTS.filter(p => p.id !== post.id && p.tags.some(t => post.tags.includes(t))).slice(0, 3),
    [post.id]
  );

  return (
    <div ref={articleRef} style={{ minHeight: '100vh', paddingTop: '90px', background: 'var(--bg)' }}>
      {/* reading progress bar */}
      <div style={{ position: 'fixed', top: '72px', left: 0, right: 0, height: '3px', background: 'rgba(201,184,217,0.2)', zIndex: 150 }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: 'var(--lavender-mid)', transition: 'width 0.08s linear' }}/>
      </div>

      <article style={{ maxWidth: '780px', margin: '0 auto', padding: '30px 40px 100px' }}>
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
          <HeroPattern color={post.heroColor} h={360} id={`post-hero-${post.id}`} tag={post.tags?.[0]} variedPatterns={variedPatterns}/>
        </div>

        <div style={{ fontFamily: "'EB Garamond', serif", fontSize: '19px', lineHeight: 1.78, color: 'var(--text)' }}>
          <p style={{ marginBottom: '24px' }}>
            <span style={{
              float: 'left', fontFamily: "'Newsreader', serif", fontWeight: 500,
              fontSize: '76px', lineHeight: 0.85, padding: '8px 14px 0 0',
              color: 'var(--lavender-mid)',
            }}>{post.lead.charAt(0)}</span>
            {post.lead.slice(1)}
          </p>

          {BLOG_BODY.slice(0, 2).map((para, i) => (
            <p key={i} style={{ marginBottom: '22px' }}>{para}</p>
          ))}

          <blockquote style={{
            margin: '40px 0 40px -20px', padding: '4px 0 4px 28px',
            borderLeft: '3px solid var(--lavender-mid)',
            fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontWeight: 400,
            fontSize: '30px', lineHeight: 1.3, color: 'var(--text)',
          }}>
            "{post.pull}"
          </blockquote>

          {BLOG_BODY.slice(2).map((para, i) => (
            <p key={i} style={{ marginBottom: '22px' }}>{para}</p>
          ))}
        </div>

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
                <div key={r.id} className="lift" onClick={() => openPost(r)} style={{
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
