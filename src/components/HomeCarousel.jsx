import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { PROJECTS } from '../utils/content';

export function HomeCarousel({ setPage }) {
  const [idx, setIdx] = useState(0);
  const isMobile = useIsMobile();
  const preview = PROJECTS.slice(0, 4);
  const cardW = 290;
  const gap = 20;

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % preview.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div style={{ overflow: 'hidden', borderRadius: '16px' }}>
        <div style={{
          display: 'flex',
          gap: isMobile ? 0 : `${gap}px`,
          transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
          transform: isMobile
            ? `translateX(${-idx * 100}%)`
            : `translateX(${-(idx * (cardW + gap))}px)`,
        }}>
          {preview.map((p, i) => (
            <div key={p.id} className="lift" onClick={() => setPage('projects')} style={{
              minWidth: isMobile ? '100%' : `${cardW}px`,
              width: isMobile ? '100%' : undefined,
              height: isMobile ? '230px' : '280px',
              background: 'white', borderRadius: '22px',
              border: '2px solid rgba(255,255,255,0.85)',
              boxShadow: i === idx ? '8px 8px 0px rgba(58,47,74,0.13)' : '4px 4px 0px rgba(58,47,74,0.07)',
              transform: i === idx ? (isMobile ? 'none' : 'scale(1.03)') : (isMobile ? 'none' : 'scale(0.97)'),
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
                  <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '19px', color: 'var(--text)', lineHeight: 1.2, marginBottom: '5px' }}>{p.title}</div>
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
