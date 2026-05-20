import { useState, useEffect } from 'react';

const CURRENTLY = [
  { label: 'currently reading',   value: '"The Art of Looking Sideways"',  detail: 'Alan Fletcher · slowly · with tea',  hue: '#EFE7CE' },
  { label: 'currently baking',    value: 'brown-butter snickerdoodles',     detail: 'third attempt · getting closer',     hue: '#E5D2CE' },
  { label: 'currently listening', value: '"Quiet Songs" — Lianne La Havas', detail: 'on repeat · headphones in',          hue: '#DDE3D2' },
  { label: 'currently shooting',  value: 'Portra 400 · roll #14',           detail: 'half-finished · campus mornings',    hue: '#E8E0EC' },
  { label: 'currently sewing',    value: 'a tiny embroidery hoop',          detail: 'three colors · finished tomorrow',   hue: '#DDE3D2' },
];

export function CurrentlyCard() {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setIdx(i => (i + 1) % CURRENTLY.length), 5200);
    return () => clearInterval(t);
  }, [hovered]);

  const c = CURRENTLY[idx];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setIdx(i => (i + 1) % CURRENTLY.length)}
      style={{
        position: 'fixed', bottom: '24px', left: '24px', zIndex: 400,
        width: '248px',
        background: '#FBF6EB',
        padding: '18px 18px 22px',
        borderRadius: '3px',
        boxShadow: '8px 10px 28px rgba(58,47,74,0.18), 0 1px 4px rgba(58,47,74,0.08)',
        transform: hovered ? 'rotate(0deg) translateY(-4px)' : 'rotate(-2.2deg)',
        transition: 'transform 0.32s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'pointer',
      }}
    >
      {/* washi tape */}
      <div style={{
        position: 'absolute', top: '-11px', left: '50%',
        transform: 'translateX(-50%) rotate(-3deg)',
        width: '90px', height: '20px',
        backgroundColor: c.hue,
        opacity: 0.78,
        border: '1px solid rgba(138,115,151,0.2)',
        backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(58,47,74,0.08) 6px 8px)',
        boxShadow: '0 1px 3px rgba(58,47,74,0.08)',
        pointerEvents: 'none',
      }}/>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '9px', fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--lavender-mid)', marginBottom: '10px',
      }}>{c.label}</div>

      <div style={{
        fontFamily: "'Newsreader', serif", fontStyle: 'italic',
        fontWeight: 500, fontSize: '21px', lineHeight: 1.22,
        color: 'var(--text)', marginBottom: '8px',
      }}>{c.value}</div>

      <div style={{
        fontFamily: "'EB Garamond', serif", fontStyle: 'italic',
        fontSize: '13.5px', color: 'var(--text-mid)', lineHeight: 1.45,
      }}>{c.detail}</div>

      <div style={{ display: 'flex', gap: '5px', marginTop: '14px' }}>
        {CURRENTLY.map((_, i) => (
          <div key={i} style={{
            width: i === idx ? '14px' : '4px', height: '4px', borderRadius: '2px',
            background: i === idx ? 'var(--lavender-mid)' : 'rgba(138,115,151,0.25)',
            transition: 'all 0.3s ease',
          }}/>
        ))}
      </div>
    </div>
  );
}
