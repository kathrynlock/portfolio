import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { Divider } from '../components/Divider';
import { HeroPhotoGrid } from '../components/HeroPhotoGrid';
import { HomeCarousel } from '../components/HomeCarousel';

export function HomePage({ setPage, tweaks }) {
  const [vis, setVis] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  const pad = isMobile ? '80px 24px 48px' : '90px 60px 60px';

  return (
    <div>
      <section style={{ minHeight: '100vh', padding: pad, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
<div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
          {isMobile ? (
            <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: '28px', color: 'var(--text-mid)', lineHeight: 1, letterSpacing: '0.005em', marginBottom: '8px', transform: 'rotate(-3deg)', transformOrigin: 'left bottom', display: 'inline-block' }}>
                  hi, i'm
                </div>
                <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '88px', fontWeight: 400, color: 'var(--lavender-mid)', lineHeight: 0.85, letterSpacing: '-0.01em' }}>
                  kate
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '11px', color: 'var(--blue)', marginBottom: '16px', letterSpacing: '0.18em', opacity: 0.85, textTransform: 'uppercase' }}>
                  ECE + Business · UT Austin
                </div>
              </div>
              <div style={{ background: 'white', borderRadius: '16px', padding: '14px 18px', border: '1.5px solid rgba(138,115,151,0.3)', boxShadow: '4px 4px 0px rgba(138,115,151,0.2)', marginBottom: '28px', display: 'inline-block' }}>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.7 }}>
                  probably crafting, eating a sweet treat,<br />or daydreaming about my next project
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <button className="lift" onClick={() => setPage('projects')} style={{
                  fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '18px', fontWeight: 600,
                  background: 'var(--text)', color: 'white', border: 'none',
                  borderRadius: '32px', padding: '13px 28px', cursor: 'pointer',
                  boxShadow: '4px 4px 0px rgba(58,47,74,0.2)',
                }}>see my work</button>
                <button className="lift" onClick={() => setPage('about')} style={{
                  fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '18px', fontWeight: 500,
                  background: 'white', color: 'var(--text-mid)',
                  border: '2px solid var(--lavender)', borderRadius: '32px',
                  padding: '13px 28px', cursor: 'pointer',
                }}>about me</button>
              </div>

              <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '15px', color: 'var(--text-light)', marginBottom: '16px' }}>
                lately through my lens
              </div>
              <HeroPhotoGrid />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '0.75fr 1.25fr', gap: '40px', alignItems: 'center' }}>
              <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)' }}>
                <div style={{ marginBottom: '22px' }}>
                  <div style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: '42px', color: 'var(--text-mid)', lineHeight: 1, letterSpacing: '0.005em', marginBottom: '14px', transform: 'rotate(-3deg)', transformOrigin: 'left bottom', display: 'inline-block' }}>
                    hi, i'm
                  </div>
                  <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '168px', fontWeight: 400, color: 'var(--lavender-mid)', lineHeight: 0.9, letterSpacing: '-0.01em' }}>
                    kate
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '11px', color: 'var(--blue)', marginBottom: '24px', letterSpacing: '0.18em', opacity: 0.85, textTransform: 'uppercase' }}>
                    ECE + Business · UT Austin
                  </div>
                </div>
                <div style={{ background: 'white', borderRadius: '18px', padding: '16px 22px', border: '1.5px solid rgba(138,115,151,0.3)', boxShadow: '5px 5px 0px rgba(138,115,151,0.2)', marginBottom: '36px', display: 'inline-block' }}>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.7, letterSpacing: '0.2px' }}>
                    probably crafting, eating a sweet treat,<br />or daydreaming about my next project
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button className="lift" onClick={() => setPage('projects')} style={{
                    fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '19px', fontWeight: 600,
                    background: 'var(--text)', color: 'white', border: 'none',
                    borderRadius: '32px', padding: '15px 32px', cursor: 'pointer',
                    boxShadow: '5px 5px 0px rgba(58,47,74,0.2)',
                  }}>see my work</button>
                  <button className="lift" onClick={() => setPage('about')} style={{
                    fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '19px', fontWeight: 500,
                    background: 'white', color: 'var(--text-mid)',
                    border: '2.5px solid var(--lavender)', borderRadius: '32px',
                    padding: '15px 32px', cursor: 'pointer',
                  }}>about me</button>
                </div>
              </div>

              <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 1s ease 0.3s', marginLeft: '-32px' }}>
                <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '16px', color: 'var(--text-light)', letterSpacing: '0.3px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>lately through my lens</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '10px', fontWeight: 500, color: 'var(--lavender-mid)', opacity: 0.55 }}>click to shuffle ↻</span>
                </div>
                <HeroPhotoGrid />
              </div>
            </div>
          )}
        </div>
      </section>

      <Divider />

      <section style={{ background: 'var(--white)', padding: isMobile ? '48px 24px' : '72px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '36px' : '48px', color: 'var(--text)', lineHeight: 1 }}>things i've made</h2>
            </div>
            <button onClick={() => setPage('projects')} style={{
              fontFamily: 'Outfit', fontSize: '13px', fontWeight: 800,
              color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer',
              textDecoration: 'underline', textUnderlineOffset: '5px',
            }}>see all projects</button>
          </div>
          <HomeCarousel setPage={setPage} />
        </div>
      </section>

    </div>
  );
}
