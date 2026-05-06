// Shared UI components

const { useState, useEffect, useRef } = React;

// ─── HOOK: screen width ────────────────────────────────────
function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < bp);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [bp]);
  return mobile;
}

// ─── NAV ──────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (p) => { setPage(p); setMenuOpen(false); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled || menuOpen ? 'rgba(245,239,227,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled || menuOpen ? '1px solid rgba(201,184,217,0.35)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '12px 20px' : '14px 44px',
      }}>
        <button onClick={() => go('home')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
          fontSize: isMobile ? '18px' : '22px', fontWeight: 400, color: 'var(--text)',
          letterSpacing: '0.04em', display: 'flex', alignItems: 'center',
          gap: isMobile ? '8px' : '12px', padding: 0,
        }}>
          <img src="assets/kl-logo.png" alt="KL" style={{
            width: isMobile ? '36px' : '46px', height: isMobile ? '36px' : '46px',
            borderRadius: '50%', objectFit: 'cover',
            boxShadow: '0 2px 10px rgba(58,47,74,0.18)',
          }} />
          <span>kate lock</span>
        </button>

        {isMobile ? (
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px', display: 'flex', flexDirection: 'column',
            gap: '5px', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px',
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '2px',
                background: 'var(--text)', borderRadius: '2px',
                transition: 'all 0.25s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'none'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '4px' }}>
            {['home', 'projects', 'about', 'resume'].map(p => (
              <button key={p} className="nav-btn" onClick={() => go(p)} style={{
                background: page === p ? 'rgba(201,184,217,0.4)' : 'none',
                border: 'none', cursor: 'pointer',
                fontFamily: 'Outfit', fontSize: '15px', fontWeight: 700,
                color: page === p ? 'var(--text)' : 'var(--text-mid)',
                padding: '8px 20px', textTransform: 'capitalize', letterSpacing: '0.2px',
              }}>{p}</button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && (
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '280px' : '0',
          transition: 'max-height 0.3s ease',
        }}>
          <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['home', 'projects', 'about', 'resume'].map(p => (
              <button key={p} onClick={() => go(p)} style={{
                background: page === p ? 'rgba(201,184,217,0.35)' : 'none',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'Outfit', fontSize: '18px', fontWeight: 700,
                color: page === p ? 'var(--text)' : 'var(--text-mid)',
                padding: '12px 16px', borderRadius: '14px', textTransform: 'capitalize',
              }}>{p}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── DIVIDER ──────────────────────────────────────────────
function Divider() {
  const isMobile = useIsMobile();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: isMobile ? '0 24px' : '0 60px', margin: '8px 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,184,217,0.6), transparent)' }} />
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: 'var(--lavender-mid)', opacity: 0.7 }}>&#10022;</span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,184,217,0.6), transparent)' }} />
    </div>
  );
}

// ─── THOUGHT BUBBLE ───────────────────────────────────────
// posStyle only applies on desktop; on mobile the parent stacks them in a column
function ThoughtBubble({ thought, delay, floatAnim, posStyle }) {
  const [vis, setVis] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const bgColors     = ['var(--lavender-light)', 'var(--yellow)', 'var(--blue-light)'];
  const shadowColors = ['rgba(138,115,151,0.55)', 'rgba(180,160,100,0.35)', '#aeba98'];
  const bg     = bgColors[delay / 500 % 3 | 0];
  const shadow = shadowColors[delay / 500 % 3 | 0];

  const wrapStyle = isMobile
    ? { width: '100%', opacity: vis ? 1 : 0, transition: 'opacity 0.9s ease', cursor: 'pointer' }
    : { ...posStyle, opacity: vis ? 1 : 0, transition: 'opacity 0.9s ease', animation: vis ? `${floatAnim} ${3.5 + (delay % 500) * 0.002}s ease-in-out infinite` : 'none', cursor: 'pointer' };

  return (
    <div onClick={() => setFlipped(f => !f)} title="click to reveal" style={wrapStyle}>
      <div style={{
        background: bg, border: '2px solid rgba(255,255,255,0.9)',
        boxShadow: `5px 5px 0px ${shadow}`,
        padding: '18px 20px', borderRadius: '20px', position: 'relative',
        opacity: flipped ? 0 : 1, transition: 'opacity 0.2s ease',
        display: flipped ? 'none' : 'block',
      }}>
        <p style={{ fontFamily: 'Outfit', fontSize: isMobile ? '14px' : '15px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.55, textAlign: 'center' }}>
          {thought.q}
        </p>
        {!isMobile && (
          <>
            <div style={{ position: 'absolute', bottom: '-13px', left: '22px', width: '12px', height: '12px', background: bg, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.8)' }} />
            <div style={{ position: 'absolute', bottom: '-22px', left: '30px', width: '7px', height: '7px', background: bg, borderRadius: '50%', opacity: 0.8 }} />
          </>
        )}
      </div>
      <div style={{
        background: 'var(--text)', border: '2px solid rgba(255,255,255,0.15)',
        boxShadow: '5px 5px 0px rgba(58,47,74,0.2)',
        padding: '18px 20px', borderRadius: '20px',
        display: flipped ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
        opacity: flipped ? 1 : 0, transition: 'opacity 0.25s ease 0.15s',
      }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: isMobile ? '17px' : '19px', color: 'white', lineHeight: 1.5, textAlign: 'center' }}>
          {thought.a}
        </p>
      </div>
    </div>
  );
}

// ─── HOME CAROUSEL ────────────────────────────────────────
function HomeCarousel({ setPage }) {
  const [idx, setIdx] = useState(0);
  const isMobile = useIsMobile();
  const preview = PROJECTS.slice(0, 4);
  const cardW = isMobile ? Math.min(window.innerWidth - 48, 340) : 290;
  const gap = 20;

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % preview.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div style={{ overflow: 'hidden', borderRadius: '16px' }}>
        <div style={{
          display: 'flex', gap: `${gap}px`,
          transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
          transform: `translateX(${-(idx * (cardW + gap))}px)`,
        }}>
          {preview.map((p, i) => (
            <div key={p.id} className="lift" onClick={() => setPage('projects')} style={{
              minWidth: `${cardW}px`, height: isMobile ? '230px' : '280px',
              background: 'white', borderRadius: '22px',
              border: '2px solid rgba(255,255,255,0.85)',
              boxShadow: i === idx ? '8px 8px 0px rgba(58,47,74,0.13)' : '4px 4px 0px rgba(58,47,74,0.07)',
              transform: i === idx ? 'scale(1.03)' : 'scale(0.97)',
              transition: 'all 0.5s ease',
              display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
            }}>
              <div style={{ height: '80px', background: p.color, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <svg width="100%" height="80" style={{ position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`cpat-${p.id}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                      <rect width="14" height="14" fill="transparent" />
                      <rect x="0" y="0" width="4" height="4" fill="rgba(255,255,255,0.22)" />
                      <rect x="7" y="7" width="4" height="4" fill="rgba(255,255,255,0.22)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="80" fill={`url(#cpat-${p.id})`} />
                </svg>
                <div style={{ position: 'absolute', top: '10px', left: '14px', fontFamily: 'Outfit', fontSize: '9px', fontWeight: 800, color: 'rgba(58,47,74,0.45)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{p.tag}</div>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '19px', color: 'var(--text)', lineHeight: 1.2, marginBottom: '5px' }}>{p.title}</div>
                  <div style={{ fontFamily: 'Outfit', fontSize: '11px', color: 'var(--text-mid)', lineHeight: 1.4, marginBottom: '8px' }}>{p.brief}</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {p.skills.slice(0, 3).map(s => (
                    <span key={s} style={{ background: p.color, color: 'var(--text)', borderRadius: '20px', padding: '3px 10px', fontSize: '10px', fontFamily: 'Outfit', fontWeight: 700 }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '18px', justifyContent: 'center' }}>
        {preview.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? '26px' : '8px', height: '8px',
            borderRadius: '4px', border: 'none', cursor: 'pointer',
            background: i === idx ? 'var(--lavender-mid)' : '#DDD8EE',
            transition: 'all 0.3s ease', padding: 0,
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────
function ProjectCard({ p, onClick }) {
  const [active, setActive] = useState(false);
  const isMobile = useIsMobile();

  // Desktop: hover shows back, click opens modal
  // Mobile: first tap reveals back, second tap opens modal
  const handleClick = () => {
    if (isMobile) {
      if (active) { onClick(p); setActive(false); }
      else setActive(true);
    } else {
      onClick(p);
    }
  };

  return (
    <div
      style={{ height: '320px', cursor: 'pointer', position: 'relative', borderRadius: '24px', overflow: 'hidden' }}
      onMouseEnter={() => !isMobile && setActive(true)}
      onMouseLeave={() => !isMobile && setActive(false)}
      onClick={handleClick}
    >
      <div style={{
        position: 'absolute', inset: 0, background: 'white',
        border: '2.5px solid rgba(255,255,255,0.9)',
        boxShadow: '6px 6px 0px rgba(58,47,74,0.09)',
        borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        opacity: active ? 0 : 1, transform: active ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents: active ? 'none' : 'auto',
      }}>
        <div style={{ height: '110px', background: p.color, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          <svg width="100%" height="110" style={{ position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`pat-${p.id}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <rect width="16" height="16" fill="transparent" />
                <rect x="0" y="0" width="4" height="4" fill="rgba(255,255,255,0.25)" />
                <rect x="8" y="8" width="4" height="4" fill="rgba(255,255,255,0.25)" />
              </pattern>
            </defs>
            <rect width="100%" height="110" fill={`url(#pat-${p.id})`} />
          </svg>
          <div style={{ position: 'absolute', bottom: '12px', left: '18px', fontFamily: 'Outfit', fontWeight: 800, fontSize: '8px', color: 'rgba(58,47,74,0.4)', letterSpacing: '1px' }}>{p.year}</div>
        </div>
        <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '7px', color: 'rgba(58,47,74,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{p.tag}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', color: 'var(--text)', lineHeight: 1.2, marginBottom: '8px' }}>{p.title}</h3>
          </div>
          <p style={{ fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-mid)', lineHeight: 1.55 }}>{p.brief}</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', inset: 0, background: 'var(--text)',
        borderRadius: '24px', boxShadow: '6px 6px 0px rgba(58,47,74,0.25)',
        padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        opacity: active ? 1 : 0, transform: active ? 'scale(1)' : 'scale(1.03)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents: active ? 'auto' : 'none',
      }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '22px', color: p.color, marginBottom: '12px' }}>{p.title}</div>
          <p style={{ fontFamily: 'Outfit', fontSize: '13.5px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.75 }}>{p.desc}</p>
        </div>
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {p.skills.map(s => (
              <span key={s} style={{ background: 'rgba(255,255,255,0.12)', color: 'white', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontFamily: 'Outfit', fontWeight: 700 }}>{s}</span>
            ))}
          </div>
          {isMobile
            ? <div style={{ fontFamily: 'Outfit', fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px' }}>tap again to read more</div>
            : <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '15px', color: 'rgba(255,255,255,0.35)' }}>{p.year}</div>
          }
        </div>
      </div>
    </div>
  );
}

// ─── PHOTO STACK ──────────────────────────────────────────
function PhotoStack() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const isMobile = useIsMobile();
  const size   = isMobile ? 240 : 300;
  const photoH = isMobile ? 176 : 240;

  const photos = [
    { label: 'crafting session', bg: '#EFE7CE', note: 'making something' },
    { label: 'coffee + ideas',   bg: '#DDE3D2', note: 'my natural habitat' },
    { label: 'campus life',      bg: '#C2CDB8', note: 'burnt orange forever' },
    { label: 'design day',       bg: '#EAE5F2', note: 'thinking in systems' },
  ];

  const advance = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(c => (c + 1) % photos.length); setAnimating(false); }, 190);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div onClick={advance} style={{ position: 'relative', width: `${size}px`, height: `${size + 40}px`, cursor: 'pointer' }} title="click to cycle photos">
        {photos.map((photo, i) => {
          const offset = (i - current + photos.length) % photos.length;
          const rot = [-3, 2, -1.5, 1][i % 4];
          const zIndex = photos.length - offset;
          const translateY = offset === 0 ? (animating ? -10 : 0) : offset * 4;
          const translateX = offset === 0 ? 0 : offset % 2 === 0 ? -5 : 5;
          const scale = offset === 0 ? (animating ? 0.95 : 1) : 1 - offset * 0.02;

          return (
            <div key={i} style={{
              position: 'absolute', inset: 0, zIndex,
              opacity: offset > 2 ? 0 : 1,
              transform: `rotate(${rot}deg) translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`,
              transition: 'transform 0.18s cubic-bezier(0.4,0,0.2,1), opacity 0.18s ease',
            }}>
              <div style={{
                background: 'white', borderRadius: '4px', padding: '10px 10px 36px',
                boxShadow: offset === 0 ? '8px 8px 24px rgba(58,47,74,0.18), 0 2px 8px rgba(58,47,74,0.08)' : '4px 4px 12px rgba(58,47,74,0.1)',
                height: '100%',
              }}>
                <div style={{ background: photo.bg, height: `${photoH}px`, borderRadius: '2px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`ppat-${i}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect width="20" height="20" fill="transparent" />
                        <rect x="0" y="0" width="4" height="4" fill="rgba(58,47,74,0.06)" />
                        <rect x="10" y="10" width="4" height="4" fill="rgba(58,47,74,0.06)" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#ppat-${i})`} />
                  </svg>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '9px', color: 'rgba(58,47,74,0.3)', textAlign: 'center', zIndex: 1, lineHeight: 2 }}>
                    [ photo ]<br />{photo.label}
                  </div>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '15px', color: 'var(--text-mid)', textAlign: 'center', marginTop: '8px' }}>
                  {photo.note}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {photos.map((_, i) => (
          <div key={i} style={{
            width: i === current ? '20px' : '6px', height: '6px', borderRadius: '3px',
            background: i === current ? 'var(--lavender-mid)' : 'var(--lavender-light)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '7px', color: 'var(--text-light)', letterSpacing: '1px' }}>
        click to flip through
      </div>
    </div>
  );
}

// ─── TWEAKS PANEL ─────────────────────────────────────────
function TweaksPanel({ tweaks, setTweaks, visible }) {
  const isMobile = useIsMobile();
  const options = [
    { key: 'accentColor', label: 'Accent', type: 'options', opts: [
      { label: 'Lavender', val: '#D4C5F0' },
      { label: 'Blue',     val: '#7BA7D9' },
      { label: 'Pink',     val: '#FFB6D0' },
      { label: 'Mint',     val: '#7FD9B8' },
    ]},
    { key: 'heroSize',     label: 'Hero size', type: 'slider', min: 60, max: 100, step: 2 },
    { key: 'showSparkles', label: 'Sparkles',  type: 'toggle' },
  ];

  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', bottom: isMobile ? '16px' : '24px', right: isMobile ? '16px' : '24px', zIndex: 500,
      background: 'white', borderRadius: '24px', padding: '24px',
      boxShadow: '0 12px 48px rgba(58,47,74,0.18)',
      width: isMobile ? 'calc(100% - 32px)' : '240px',
      border: '2px solid var(--lavender)',
    }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '20px', color: 'var(--text)', marginBottom: '20px' }}>Tweaks</div>
      {options.map(o => (
        <div key={o.key} style={{ marginBottom: '18px' }}>
          <div style={{ fontFamily: 'Outfit', fontSize: '12px', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{o.label}</div>
          {o.type === 'options' && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {o.opts.map(opt => (
                <button key={opt.val} onClick={() => {
                  const next = { ...tweaks, [o.key]: opt.val };
                  setTweaks(next);
                  document.documentElement.style.setProperty('--lavender', opt.val);
                  document.documentElement.style.setProperty('--lavender-mid', opt.val);
                }} style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  border: `3px solid ${tweaks[o.key] === opt.val ? 'var(--text)' : 'transparent'}`,
                  background: opt.val, cursor: 'pointer', padding: 0,
                }} />
              ))}
            </div>
          )}
          {o.type === 'slider' && (
            <input type="range" min={o.min} max={o.max} step={o.step} value={tweaks[o.key]}
              onChange={e => setTweaks({ ...tweaks, [o.key]: +e.target.value })}
              style={{ width: '100%', accentColor: 'var(--lavender-mid)' }}
            />
          )}
          {o.type === 'toggle' && (
            <button onClick={() => setTweaks({ ...tweaks, [o.key]: !tweaks[o.key] })} style={{
              fontFamily: 'Outfit', fontSize: '13px', fontWeight: 700,
              background: tweaks[o.key] ? 'var(--text)' : 'var(--lavender-light)',
              color: tweaks[o.key] ? 'white' : 'var(--text-mid)',
              border: 'none', borderRadius: '20px', padding: '6px 18px', cursor: 'pointer',
            }}>{tweaks[o.key] ? 'on' : 'off'}</button>
          )}
        </div>
      ))}
    </div>
  );
}
