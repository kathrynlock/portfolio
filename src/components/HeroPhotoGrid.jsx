import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const PIN_ROTATIONS = [-2.4, 1.6, -1.1, 2.2, -1.8, 1.3];
const ARENA_SLUG = 'with-love-pvhkjbfhfoq';
const PHOTO_COUNT = 6;

// col offsets for stagger: 3-col desktop (col 0,1,2) and 2-col mobile (col 0,1)
const COL_OFFSET_DESKTOP = [0, 22, 11];
const COL_OFFSET_MOBILE  = [0, 26];

function pinKey(p) { return p.src || JSON.stringify(p); }

export function HeroPhotoGrid() {
  const isMobile = useIsMobile();
  const [pins, setPins]            = useState([]);
  const [swappingIdx, setSwapping] = useState(-1);
  const [enterDone, setEnterDone]  = useState(false);
  const poolRef = useRef([]);

  useEffect(() => {
    const t = setTimeout(() => setEnterDone(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetch(`https://api.are.na/v2/channels/${ARENA_SLUG}/contents?per=100`)
      .then(r => r.json())
      .then(data => {
        const images = (data.contents || [])
          .filter(b => b.class === 'Image')
          .map(b => ({
            src: b.image?.large?.url || b.image?.original?.url,
            caption: b.description || b.title || '',
          }))
          .filter(b => b.src);
        poolRef.current = images;
        setPins(images.slice(0, PHOTO_COUNT));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!pins.length) return;
    let cancelled = false;
    let timeout;
    const swap = (idx) => {
      setSwapping(idx);
      setTimeout(() => {
        if (cancelled) return;
        setPins(prev => {
          const pool = poolRef.current;
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
      const delay = 3500 + Math.random() * 2500;
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
        const pool = poolRef.current;
        const visible = new Set(prev.map(pinKey));
        const candidates = pool.filter(p => !visible.has(pinKey(p)));
        const source = candidates.length ? candidates : pool;
        const next = source[Math.floor(Math.random() * source.length)];
        return prev.map((p, i) => i === idx ? next : p);
      });
      setSwapping(-1);
    }, 380);
  };

  const cols = isMobile ? 2 : 3;
  const colOffsets = isMobile ? COL_OFFSET_MOBILE : COL_OFFSET_DESKTOP;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '10px', alignItems: 'start' }}>
      {Array.from({ length: PHOTO_COUNT }, (_, i) => {
        const pin = pins[i];
        const col = i % cols;
        const rotation = PIN_ROTATIONS[i];
        const swapping = swappingIdx === i;
        return (
          <div
            key={i}
            style={{
              marginTop: colOffsets[col],
              opacity: enterDone ? 1 : 0,
              transform: enterDone ? 'none' : 'translateY(18px)',
              transition: `opacity 0.6s ease ${i * 80 + 200}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 80 + 200}ms`,
            }}
          >
            {pin ? (
              <div
                onClick={() => handleClick(i)}
                style={{
                  background: 'white',
                  borderRadius: '3px',
                  padding: '6px 6px 11px',
                  boxShadow: swapping
                    ? '2px 4px 12px rgba(58,47,74,0.08)'
                    : '5px 7px 18px rgba(58,47,74,0.13), 0 1px 3px rgba(58,47,74,0.05)',
                  transform: swapping
                    ? `rotate(${rotation * 0.4}deg) scale(0.88)`
                    : `rotate(${rotation}deg) scale(1)`,
                  opacity: swapping ? 0 : 1,
                  transition: 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.45s ease, box-shadow 0.4s ease',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={pin.src}
                  alt={pin.caption || ''}
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    borderRadius: '2px',
                    display: 'block',
                    backgroundColor: 'var(--lavender-light)',
                  }}
                />
                {pin.caption && (
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '7px', fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--text-light)',
                    marginTop: '6px', textAlign: 'center',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{pin.caption}</div>
                )}
              </div>
            ) : (
              <div style={{ aspectRatio: '1/1', background: 'var(--lavender-light)', borderRadius: '3px', opacity: 0.2 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
