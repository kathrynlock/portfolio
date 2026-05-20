import { useIsMobile } from '../hooks/useIsMobile';
import { Divider } from '../components/Divider';
import { PhotoStack } from '../components/PhotoStack';

export function AboutPage({ setPage }) {
  const isMobile = useIsMobile();

  const skills = [
    { area: 'Design',    bg: 'var(--lavender-light)', items: ['Figma', 'User Research', 'Prototyping', 'Wireframing', 'Usability Testing'] },
    { area: 'Tech',      bg: 'var(--yellow)',          items: ['React', 'Python', 'HTML / CSS', 'Arduino', 'SQL'] },
    { area: 'Interests', bg: 'var(--blue-light)',      items: ['Product Strategy', 'HCI', 'Branding', 'Analog Tech', 'Design Systems'] },
  ];
  const facts = [
    { e: '01', t: 'My craft supply collection deserves its own storage unit — and yes, I use all of it.' },
    { e: '02', t: 'I rate coffee shops by pastry quality first. Espresso is secondary.' },
    { e: '03', t: 'I shoot film because waiting for photos is part of the joy.' },
    { e: '04', t: 'My best ideas arrive at 11pm. My sleep schedule is aware and suffering.' },
  ];

  const pad = isMobile ? '40px 24px 0' : '60px 60px 0';

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px' }}>
      <section style={{ padding: pad, maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '64px',
          alignItems: 'center', marginBottom: isMobile ? '48px' : '80px',
        }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '12px', color: 'var(--blue)', marginBottom: '14px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>hi, nice to meet you</div>
            <h1 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '44px' : '60px', color: 'var(--text)', lineHeight: 1.05, marginBottom: '28px' }}>
              i'm kate,<br />
              <span style={{ color: 'var(--lavender-mid)', fontFamily: "'Newsreader', serif", fontSize: isMobile ? '58px' : '80px', fontWeight: 400 }}>a curious</span><br />
              creator
            </h1>
            <p style={{ fontFamily: 'Outfit', fontSize: isMobile ? '15px' : '17px', color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '18px' }}>
              I'm studying ECE and Business at UT Austin, but my real curriculum is figuring out how to make technology feel less like a tool and more like a friend.
            </p>
            <p style={{ fontFamily: 'Outfit', fontSize: isMobile ? '15px' : '17px', color: 'var(--text-mid)', lineHeight: 1.85 }}>
              I'm obsessed with the intersection of product, design, and human experience. I believe the best tech sparks joy, reduces friction, and — if you're lucky — makes you smile.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: isMobile ? '0' : '20px' }}>
            <PhotoStack />
          </div>
        </div>
      </section>

      <Divider />

      <section style={{ padding: isMobile ? '48px 24px' : '80px 60px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '38px' : '50px', color: 'var(--text)', marginBottom: '40px' }}>what i work with</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '22px' }}>
          {skills.map(s => (
            <div key={s.area} className="lift" style={{
              background: s.bg, borderRadius: '26px', padding: isMobile ? '26px 24px' : '30px 28px',
              border: '2.5px solid rgba(255,255,255,0.9)',
              boxShadow: '6px 6px 0px rgba(58,47,74,0.07)',
            }}>
              <h3 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '26px', color: 'var(--text)', marginBottom: '18px' }}>{s.area}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {s.items.map(item => (
                  <div key={item} style={{ fontFamily: 'Outfit', fontSize: '15px', color: 'var(--text-mid)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--lavender-mid)', fontSize: '12px' }}>&#9670;</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: isMobile ? '0 24px 56px' : '0 60px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '38px' : '50px', color: 'var(--text)', marginBottom: '28px' }}>fun facts</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: '14px' }}>
          {facts.map((f, i) => (
            <div key={i} className="lift" style={{
              background: 'white', borderRadius: '20px', padding: '22px 20px',
              display: 'flex', alignItems: 'center', gap: '16px',
              border: '2px solid var(--lavender-light)',
              boxShadow: '5px 5px 0px rgba(201,184,217,0.4)',
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '9px', color: 'var(--lavender-mid)', flexShrink: 0, width: '28px', textAlign: 'center' }}>{f.e}</div>
              <p style={{ fontFamily: 'Outfit', fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.65 }}>{f.t}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: isMobile ? '0 24px 72px' : '0 60px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          background: 'var(--text)', borderRadius: isMobile ? '28px' : '36px',
          padding: isMobile ? '40px 28px' : '56px 52px',
          textAlign: 'center', boxShadow: '14px 14px 0px rgba(201,184,217,0.4)',
          position: 'relative', overflow: 'hidden',
        }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '40px' : '52px', color: 'white', marginBottom: '14px' }}>let's chat!</h2>
          <p style={{ fontFamily: 'Outfit', fontSize: isMobile ? '15px' : '18px', color: 'rgba(255,255,255,0.65)', marginBottom: '38px' }}>
            Always down to talk products, design, or trade sweet treat recommendations.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'email me',  bg: 'var(--lavender)',   href: 'mailto:klock@utexas.edu' },
              { label: 'linkedin',  bg: 'var(--yellow)',     href: 'https://linkedin.com/in/kathrynlock', external: true },
              { label: 'resume',    bg: 'var(--blue-light)', onClick: () => setPage('resume') },
            ].map(btn => {
              const sharedStyle = {
                fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '19px', fontWeight: 500,
                background: btn.bg, color: 'var(--text)', border: 'none',
                borderRadius: '32px', padding: isMobile ? '13px 28px' : '15px 34px', cursor: 'pointer',
                boxShadow: '5px 5px 0px rgba(0,0,0,0.15)', textDecoration: 'none', display: 'inline-block',
              };
              return btn.href ? (
                <a key={btn.label} href={btn.href} className="lift" style={sharedStyle}
                  {...(btn.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {btn.label}
                </a>
              ) : (
                <button key={btn.label} className="lift" style={sharedStyle} onClick={btn.onClick}>
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
