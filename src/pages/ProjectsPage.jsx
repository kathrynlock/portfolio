import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS } from '../data';

export function ProjectsPage({ tweaks }) {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [modalVis, setModalVis] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);

  const tags = ['all', ...new Set(PROJECTS.map(p => p.tag))];
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.tag === filter);

  const openModal  = (p) => { setSelected(p); setTimeout(() => setModalVis(true), 10); };
  const closeModal = ()  => { setModalVis(false); setTimeout(() => setSelected(null), 350); };

  const featured = !!tweaks?.featuredProject && filtered.length > 0;
  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)';

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px' }}>
      <section style={{ padding: isMobile ? '40px 24px 80px' : '60px 60px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '52px' : '68px', color: 'var(--text)', lineHeight: 1, marginBottom: '10px' }}>my projects</h1>
          {!isMobile && <p style={{ fontFamily: 'Outfit', fontSize: '16px', color: 'var(--text-light)', fontWeight: 500 }}>hover a card to flip it — click to read more</p>}
          {isMobile  && <p style={{ fontFamily: 'Outfit', fontSize: '14px', color: 'var(--text-light)', fontWeight: 500 }}>tap a card to preview — tap again to read more</p>}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {tags.map(t => (
            <button key={t} className="filter-btn" onClick={() => setFilter(t)} style={{
              fontFamily: 'Outfit', fontSize: isMobile ? '13px' : '14px', fontWeight: 800,
              background: filter === t ? 'var(--text)' : 'white',
              color: filter === t ? 'white' : 'var(--text-mid)',
              border: `2px solid ${filter === t ? 'var(--text)' : 'var(--lavender)'}`,
              borderRadius: '24px', padding: isMobile ? '6px 16px' : '8px 22px', cursor: 'pointer',
              textTransform: 'capitalize',
              boxShadow: filter === t ? '4px 4px 0px rgba(58,47,74,0.15)' : 'none',
            }}>{t}</button>
          ))}
        </div>

        {featured && !isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* Hero project */}
            {(() => {
              const p = filtered[0];
              return (
                <article key={p.id} onClick={() => openModal(p)} className="lift" style={{
                  background: 'white', borderRadius: '28px', overflow: 'hidden',
                  border: '2.5px solid rgba(255,255,255,0.9)',
                  boxShadow: '8px 8px 0px rgba(58,47,74,0.1)',
                  cursor: 'pointer',
                  display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 0,
                  minHeight: '440px',
                }}>
                  <div style={{ background: p.color, position: 'relative', overflow: 'hidden' }}>
                    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`fhpat-${p.id}`} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                          <rect width="22" height="22" fill="transparent" />
                          <rect x="0" y="0" width="5" height="5" fill="rgba(255,255,255,0.26)" />
                          <rect x="11" y="11" width="5" height="5" fill="rgba(255,255,255,0.26)" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#fhpat-${p.id})`} />
                    </svg>
                    <div style={{ position: 'absolute', bottom: '20px', left: '24px' }}>
                      <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: '30px', color: p.dark, transform: 'rotate(-3deg)', display: 'inline-block' }}>most recent ↓</span>
                    </div>
                  </div>
                  <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '10px', color: 'var(--lavender-mid)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>{p.tag} · {p.year}</div>
                    <h2 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontWeight: 500, fontSize: '52px', lineHeight: 1.05, color: 'var(--text)', marginBottom: '18px' }}>{p.title}</h2>
                    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '19px', color: 'var(--text-mid)', lineHeight: 1.6, marginBottom: '22px' }}>{p.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {p.skills.map(s => (
                        <span key={s} style={{ background: p.color, color: 'var(--text)', borderRadius: '20px', padding: '5px 14px', fontSize: '12px', fontFamily: 'Outfit', fontWeight: 700 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })()}

            {/* 2-up grid */}
            {filtered.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {filtered.slice(1, 3).map(p => <ProjectCard key={p.id} p={p} onClick={openModal} />)}
              </div>
            )}

            {/* List of older */}
            {filtered.length > 3 && (
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '11px', color: 'var(--lavender-mid)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>also worth a look</div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {filtered.slice(3).map((p, i) => (
                    <li key={p.id} onClick={() => openModal(p)}
                      style={{
                        display: 'grid', gridTemplateColumns: '70px 1fr auto', gap: '24px',
                        alignItems: 'baseline', padding: '22px 4px',
                        borderTop: i === 0 ? '1px solid rgba(138,115,151,0.3)' : 'none',
                        borderBottom: '1px solid rgba(138,115,151,0.3)',
                        cursor: 'pointer',
                        transition: 'transform 0.18s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '11px', color: 'var(--lavender-mid)', letterSpacing: '1.5px' }}>{p.year}</span>
                      <div>
                        <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontWeight: 500, fontSize: '24px', color: 'var(--text)', lineHeight: 1.2, marginBottom: '4px' }}>{p.title}</div>
                        <div style={{ fontFamily: "'EB Garamond', serif", fontSize: '15px', color: 'var(--text-mid)', fontStyle: 'italic' }}>{p.brief}</div>
                      </div>
                      <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '22px', color: 'var(--lavender-mid)' }}>→</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? '16px' : '24px' }}>
            {filtered.map(p => <ProjectCard key={p.id} p={p} onClick={openModal} />)}
          </div>
        )}
      </section>

      {selected && (
        <div onClick={closeModal} style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(58,47,74,0.55)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center',
          opacity: modalVis ? 1 : 0, transition: 'opacity 0.35s ease',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'white',
            borderRadius: isMobile ? '28px 28px 0 0' : '36px',
            padding: isMobile ? '32px 28px 40px' : '52px',
            maxWidth: '520px', width: '100%',
            border: `4px solid ${selected.color}`,
            boxShadow: '24px 24px 0px rgba(58,47,74,0.12)',
            transform: modalVis ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            maxHeight: isMobile ? '85vh' : 'auto',
            overflowY: 'auto',
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 500, color: 'var(--text-light)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '8px' }}>{selected.tag} · {selected.year}</div>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '32px' : '40px', color: 'var(--text)', marginBottom: '14px', lineHeight: 1.1 }}>{selected.title}</h2>
            <p style={{ fontFamily: 'Outfit', fontSize: isMobile ? '14px' : '16px', color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '24px' }}>{selected.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              {selected.skills.map(s => (
                <span key={s} style={{ background: selected.color, color: 'var(--text)', borderRadius: '24px', padding: '6px 16px', fontSize: '13px', fontFamily: 'Outfit', fontWeight: 800 }}>{s}</span>
              ))}
            </div>
            <button onClick={closeModal} style={{
              fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '19px', fontWeight: 500,
              background: 'var(--text)', color: 'white', border: 'none',
              borderRadius: '32px', padding: '14px 0', cursor: 'pointer', width: '100%',
              boxShadow: '4px 4px 0px rgba(58,47,74,0.15)',
            }}>close ✦</button>
          </div>
        </div>
      )}
    </div>
  );
}
