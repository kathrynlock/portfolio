import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

export function ProjectCard({ p, onClick }) {
  const [active, setActive] = useState(false);
  const isMobile = useIsMobile();

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
          <div style={{ position: 'absolute', bottom: '12px', left: '18px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '8px', color: 'rgba(58,47,74,0.4)', letterSpacing: '1px' }}>{p.year}</div>
        </div>
        <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '7px', color: 'rgba(58,47,74,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{p.tag}</div>
            <h3 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '24px', color: 'var(--text)', lineHeight: 1.2, marginBottom: '8px' }}>{p.title}</h3>
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
          <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '22px', color: p.color, marginBottom: '12px' }}>{p.title}</div>
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
            : <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '15px', color: 'rgba(255,255,255,0.35)' }}>{p.year}</div>
          }
        </div>
      </div>
    </div>
  );
}
