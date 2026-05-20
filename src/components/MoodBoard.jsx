import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const PIN_ROTATIONS = [-2.4, 1.6, -1.1, 2.2, -1.8, 1.2, -2.0, 1.4, -1.5, 2.5, -1.3, 1.8];
const SLOT_HEIGHTS        = [380, 280, 440, 320, 460, 360, 420, 340, 300];
const SLOT_HEIGHTS_MOBILE = [160, 120, 180, 140, 190, 150, 170, 130, 145];
const SLOTS = 9;
const ARENA_SLUG = 'with-love-pvhkjbfhfoq';

function pinKey(p) { return p.src || p.text || JSON.stringify(p.colors); }

function MoodPin({ pin, rotation, swapping, onClick }) {
  const base = {
    background: 'white',
    borderRadius: '4px',
    padding: '8px 8px 12px',
    boxShadow: swapping
      ? '2px 4px 14px rgba(58,47,74,0.10)'
      : '6px 8px 22px rgba(58,47,74,0.14), 0 1px 4px rgba(58,47,74,0.06)',
    transform: swapping
      ? `rotate(${rotation * 0.4}deg) scale(0.88)`
      : `rotate(${rotation}deg) scale(1)`,
    opacity: swapping ? 0 : 1,
    transition: 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.45s ease, box-shadow 0.4s ease',
    cursor: 'pointer',
    position: 'relative',
    breakInside: 'avoid',
    marginBottom: '18px',
    willChange: 'transform, opacity',
  };

  if (pin.kind === 'photo') {
    return (
      <div style={base} onClick={onClick}>
        <img
          src={pin.src}
          alt={pin.caption || ''}
          style={{
            width: '100%',
            height: pin.landscape ? undefined : `${pin.h}px`,
            aspectRatio: pin.landscape ? '1 / 1' : undefined,
            objectFit: 'cover', borderRadius: '2px',
            display: 'block', backgroundColor: 'var(--lavender-light)',
          }}
        />
        {pin.caption && (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--text-light)',
            marginTop: '8px', textAlign: 'center',
          }}>{pin.caption}</div>
        )}
      </div>
    );
  }
  return null;
}

export function MoodBoard() {
  const isMobile = useIsMobile();
  const [moodPool, setMoodPool] = useState([]);
  const [pins, setPins]         = useState([]);
  const [swappingIdx, setSwapping] = useState(-1);
  const [enterDone, setEnterDone]  = useState(false);
  const moodPoolRef = useRef([]);

  useEffect(() => {
    const t = setTimeout(() => setEnterDone(true), 50);
    return () => clearTimeout(t);
  }, []);

  const slots = isMobile ? 4 : SLOTS;

  useEffect(() => {
    fetch(`https://api.are.na/v2/channels/${ARENA_SLUG}/contents?per=100`)
      .then(r => r.json())
      .then(data => {
        const images = (data.contents || [])
          .filter(b => b.class === 'Image')
          .map(b => {
            const w = b.image?.original?.width  || b.image?.large?.width;
            const h = b.image?.original?.height || b.image?.large?.height;
            return {
              kind: 'photo',
              src: b.image?.large?.url || b.image?.original?.url,
              h: 380,
              caption: b.description || b.title || '',
              landscape: w && h ? w > h : false,
            };
          })
          .filter(b => b.src);
        moodPoolRef.current = images;
        setMoodPool(images);
        setPins(images.slice(0, Math.min(slots, images.length)));
      })
      .catch(() => {});
  }, [slots]);

  useEffect(() => {
    if (!pins.length) return;
    let cancelled = false;
    let timeout;
    const swap = (idx) => {
      setSwapping(idx);
      setTimeout(() => {
        if (cancelled) return;
        setPins(prev => {
          const pool = moodPoolRef.current;
          const visible = new Set(prev.map(pinKey));
          const candidates = pool.filter(p => !visible.has(pinKey(p)));
          const source = candidates.length ? candidates : pool;
          const next = source[Math.floor(Math.random() * source.length)];
          return prev.map((p, i) => i === idx ? next : p);
        });
        setSwapping(-1);
      }, 440);
    };
    const schedule = () => {
      const delay = 3200 + Math.random() * 2600;
      timeout = setTimeout(() => {
        if (!cancelled) { swap(Math.floor(Math.random() * pins.length)); schedule(); }
      }, delay);
    };
    schedule();
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [pins.length]);

  const handleClick = (idx) => {
    setSwapping(idx);
    setTimeout(() => {
      setPins(prev => {
        const pool = moodPoolRef.current;
        const visible = new Set(prev.map(pinKey));
        const candidates = pool.filter(p => !visible.has(pinKey(p)));
        const source = candidates.length ? candidates : pool;
        const next = source[Math.floor(Math.random() * source.length)];
        return prev.map((p, i) => i === idx ? next : p);
      });
      setSwapping(-1);
    }, 380);
  };

  return (
    <section style={{ padding: isMobile ? '0 24px 60px' : '0 60px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '10px', flexDirection: isMobile ? 'column' : 'row' }}>
        <div>
          <h2 style={{
            fontFamily: "'Newsreader', serif", fontStyle: 'italic',
            fontSize: isMobile ? '36px' : '50px', color: 'var(--text)', marginBottom: '8px', marginTop: '16px',
            lineHeight: 1.05,
          }}>a look through the lens</h2>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontStyle: 'italic',
            fontSize: '17px', color: 'var(--text-mid)', maxWidth: '52ch',
          }}>take a look at some of my favorite photos i've taken recently
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: isMobile ? 'center' : 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
          {!isMobile && (
            <div style={{
              fontFamily: "'Caveat', cursive", fontWeight: 600,
              fontSize: '22px', color: 'var(--lavender-mid)',
              transform: 'rotate(-3deg)',
            }}>↻ shuffles every few seconds</div>
          )}
          <a
            href={`https://www.are.na/kate-lock/${ARENA_SLUG}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
              fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--lavender-mid)', textDecoration: 'none',
              border: '1.5px solid var(--lavender)', borderRadius: '20px',
              padding: '6px 14px',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--lavender)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--lavender-mid)'; }}
          >view on are.na ↗</a>
          {isMobile && (
            <div style={{
              fontFamily: "'Caveat', cursive", fontWeight: 600,
              fontSize: '18px', color: 'var(--lavender-mid)',
              transform: 'rotate(-2deg)',
            }}>↻ shuffles</div>
          )}
        </div>
      </div>

      <div style={{ columnCount: isMobile ? 2 : 3, columnGap: '14px', marginTop: '36px' }}>
        {pins.map((pin, i) => (
          <div key={i} style={{
            opacity: enterDone ? 1 : 0,
            transform: enterDone ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.6s ease ${i * 80}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`,
          }}>
            <MoodPin
              pin={{ ...pin, h: isMobile ? SLOT_HEIGHTS_MOBILE[i % SLOT_HEIGHTS_MOBILE.length] : SLOT_HEIGHTS[i % SLOT_HEIGHTS.length] }}
              rotation={isMobile ? PIN_ROTATIONS[i % PIN_ROTATIONS.length] * 0.5 : PIN_ROTATIONS[i % PIN_ROTATIONS.length]}
              swapping={swappingIdx === i}
              onClick={() => handleClick(i)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
