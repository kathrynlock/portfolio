import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

export function Nav({ page, setPage }) {
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
      background: scrolled ? 'rgba(245,239,227,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,184,217,0.35)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '12px 20px' : '14px 44px',
        position: 'relative',
      }}>
        <button onClick={() => go('home')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Newsreader', serif", fontStyle: 'italic',
          fontSize: isMobile ? '18px' : '22px', fontWeight: 400, color: 'var(--text)',
          letterSpacing: '0.04em', display: 'flex', alignItems: 'center',
          gap: isMobile ? '8px' : '12px', padding: 0,
        }}>
          <img src="/assets/kl-logo.png" alt="KL" style={{
            width: isMobile ? '36px' : '46px', height: isMobile ? '36px' : '46px',
            borderRadius: '50%', objectFit: 'cover',
            boxShadow: '0 2px 10px rgba(58,47,74,0.18)',
          }} />
          <span>kate lock</span>
        </button>

        {isMobile ? (
          <>
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

            {/* Right-aligned floating dropdown */}
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: '16px',
              width: '200px',
              background: 'rgba(245,239,227,0.97)',
              backdropFilter: 'blur(16px)',
              borderRadius: '18px',
              border: '1px solid rgba(201,184,217,0.4)',
              boxShadow: '0 8px 32px rgba(58,47,74,0.14), 0 2px 8px rgba(58,47,74,0.08)',
              padding: menuOpen ? '10px' : '0 10px',
              maxHeight: menuOpen ? '320px' : '0',
              overflow: 'hidden',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
              transformOrigin: 'top right',
              transition: 'max-height 0.28s ease, opacity 0.22s ease, transform 0.22s ease, padding 0.28s ease',
              pointerEvents: menuOpen ? 'auto' : 'none',
              zIndex: 300,
            }}>
              {['home', 'projects', 'about', 'blog', 'resume'].map(p => (
                <button key={p} onClick={() => go(p)} style={{
                  display: 'block', width: '100%',
                  background: page === p ? 'rgba(201,184,217,0.35)' : 'none',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'Outfit', fontSize: '16px', fontWeight: 700,
                  color: page === p ? 'var(--text)' : 'var(--text-mid)',
                  padding: '11px 14px', borderRadius: '12px', textTransform: 'capitalize',
                }}>{p}</button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '4px' }}>
            {['home', 'projects', 'about', 'blog', 'resume'].map(p => (
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
    </nav>
  );
}
