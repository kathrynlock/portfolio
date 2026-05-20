import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

export function ThoughtBubble({ thought, delay, floatAnim, posStyle }) {
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
    ? { width: '100%', opacity: vis ? 1 : 0, transition: 'opacity 0.9s ease', cursor: 'pointer', display: 'grid' }
    : { ...posStyle, opacity: vis ? 1 : 0, transition: 'opacity 0.9s ease', animation: vis ? `${floatAnim} ${3.5 + (delay % 500) * 0.002}s ease-in-out infinite` : 'none', cursor: 'pointer', display: 'grid' };

  return (
    <div onClick={() => setFlipped(f => !f)} title="click to reveal" style={wrapStyle}>
      <div style={{
        gridArea: '1/1',
        background: bg, border: '2px solid rgba(255,255,255,0.9)',
        boxShadow: `5px 5px 0px ${shadow}`,
        padding: '18px 20px', borderRadius: '20px', position: 'relative',
        opacity: flipped ? 0 : 1, transition: 'opacity 0.2s ease',
        pointerEvents: flipped ? 'none' : 'auto',
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
        gridArea: '1/1',
        background: 'var(--text)', border: '2px solid rgba(255,255,255,0.15)',
        boxShadow: '5px 5px 0px rgba(58,47,74,0.2)',
        padding: '18px 20px', borderRadius: '20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: flipped ? 1 : 0, transition: 'opacity 0.25s ease 0.15s',
        pointerEvents: flipped ? 'auto' : 'none',
      }}>
        <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '17px' : '19px', color: 'white', lineHeight: 1.5, textAlign: 'center' }}>
          {thought.a}
        </p>
      </div>
    </div>
  );
}
