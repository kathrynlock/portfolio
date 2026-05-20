import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

export function PhotoStack() {
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
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '9px', color: 'rgba(58,47,74,0.3)', textAlign: 'center', zIndex: 1, lineHeight: 2 }}>
                    [ photo ]<br />{photo.label}
                  </div>
                </div>
                <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '15px', color: 'var(--text-mid)', textAlign: 'center', marginTop: '8px' }}>
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
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '7px', color: 'var(--text-light)', letterSpacing: '1px' }}>
        click to flip through
      </div>
    </div>
  );
}
