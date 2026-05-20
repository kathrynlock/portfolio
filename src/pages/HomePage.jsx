import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { Divider } from '../components/Divider';
import { ThoughtBubble } from '../components/ThoughtBubble';
import { HomeCarousel } from '../components/HomeCarousel';
import { MoodBoard } from '../components/MoodBoard';
import { THOUGHTS } from '../data';

export function HomePage({ setPage, tweaks }) {
  const [vis, setVis] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  const pad = isMobile ? '80px 24px 48px' : '90px 60px 60px';

  return (
    <div>
      <section style={{ minHeight: '100vh', padding: pad, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-80px', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(201,184,217,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
          {isMobile ? (
            <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '11px', color: 'var(--blue)', marginBottom: '16px', letterSpacing: '0.18em', opacity: 0.85, textTransform: 'uppercase' }}>
                ECE + Business · UT Austin
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: '28px', color: 'var(--text-mid)', lineHeight: 1, letterSpacing: '0.005em', marginBottom: '8px', transform: 'rotate(-3deg)', transformOrigin: 'left bottom', display: 'inline-block' }}>
                  hi, i'm
                </div>
                <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '88px', fontWeight: 400, color: 'var(--lavender-mid)', lineHeight: 0.85, letterSpacing: '-0.01em' }}>
                  kate
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
                questions on my mind, recently
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {THOUGHTS.map((t, i) => (
                  <ThoughtBubble key={i} thought={t} delay={(i + 1) * 500} floatAnim="float" posStyle={{}} />
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '11px', color: 'var(--blue)', marginBottom: '24px', letterSpacing: '0.18em', opacity: 0.85, textTransform: 'uppercase' }}>
                  ECE + Business · UT Austin
                </div>
                <div style={{ marginBottom: '22px' }}>
                  <div style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: '42px', color: 'var(--text-mid)', lineHeight: 1, letterSpacing: '0.005em', marginBottom: '14px', transform: 'rotate(-3deg)', transformOrigin: 'left bottom', display: 'inline-block' }}>
                    hi, i'm
                  </div>
                  <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '168px', fontWeight: 400, color: 'var(--lavender-mid)', lineHeight: 0.9, letterSpacing: '-0.01em' }}>
                    kate
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

              <div style={{ position: 'relative', height: '480px', opacity: vis ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
                <div style={{ position: 'absolute', top: 0, left: '10px', fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '16px', color: 'var(--text-light)', letterSpacing: '0.3px' }}>
                  questions on my mind, recently
                </div>
                <ThoughtBubble thought={THOUGHTS[0]} delay={500}  floatAnim="float"  posStyle={{ position: 'absolute', top: '50px',   left: '10px',  width: '250px' }} />
                <ThoughtBubble thought={THOUGHTS[1]} delay={1000} floatAnim="floatB" posStyle={{ position: 'absolute', top: '185px',  right: '0px',  width: '260px' }} />
                <ThoughtBubble thought={THOUGHTS[2]} delay={1600} floatAnim="floatC" posStyle={{ position: 'absolute', bottom: '40px', left: '50px', width: '265px' }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '9px', color: 'var(--lavender-mid)', opacity: 0.5, lineHeight: 1.8, textAlign: 'right', pointerEvents: 'none' }}>
                  click bubbles<br />to reveal
                </div>
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
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '13px', color: 'var(--lavender-mid)', letterSpacing: '2px', marginBottom: '12px', opacity: 0.8 }}>SELECTED WORK</div>
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

      <Divider />

      <MoodBoard />
    </div>
  );
}
