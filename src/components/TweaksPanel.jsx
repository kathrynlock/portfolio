import { useIsMobile } from '../hooks/useIsMobile';

export function TweaksPanel({ tweaks, setTweaks, visible }) {
  const isMobile = useIsMobile();

  const options = [
    { key: 'accentColor', label: 'Accent', type: 'options', opts: [
      { label: 'Lavender', val: '#D4C5F0' },
      { label: 'Blue',     val: '#7BA7D9' },
      { label: 'Pink',     val: '#FFB6D0' },
      { label: 'Mint',     val: '#7FD9B8' },
    ]},
    { key: 'heroSize',     label: 'Hero size', type: 'slider', min: 60, max: 100, step: 2 },
    { key: 'showSparkles', label: 'Sparkles',  type: 'toggle' },
  ];

  const experiments = [
    { key: 'manifestoBand',   label: 'Manifesto band',   hint: 'home: dark plum belief statement' },
    { key: 'currentlyCard',   label: 'Currently card',   hint: 'sticky corner: "currently reading…"' },
    { key: 'featuredProject', label: 'Featured project', hint: 'projects: 1 hero + 2-up + list' },
    { key: 'resumeMargins',   label: 'Resume marginalia', hint: 'handwritten notes + timeline' },
    { key: 'variedPatterns',  label: 'Varied patterns',  hint: 'different texture per category' },
  ];

  const update = (key, val) => setTweaks(prev => ({ ...prev, [key]: val }));

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: isMobile ? '16px' : '24px',
      right: isMobile ? '16px' : '24px',
      zIndex: 500,
      background: 'white',
      borderRadius: '24px',
      padding: '24px 22px 20px',
      boxShadow: '0 12px 48px rgba(58,47,74,0.18)',
      width: isMobile ? 'calc(100% - 32px)' : '276px',
      maxHeight: 'calc(100vh - 48px)',
      overflowY: 'auto',
      border: '2px solid var(--lavender)',
    }}>
      <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>Tweaks</div>
      <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: 'var(--text-light)', marginBottom: '18px', lineHeight: 1.4 }}>
        play with the design.
      </div>

      {options.map(o => (
        <div key={o.key} style={{ marginBottom: '18px' }}>
          <div style={{ fontFamily: 'Outfit', fontSize: '12px', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{o.label}</div>
          {o.type === 'options' && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {o.opts.map(opt => (
                <button key={opt.val} onClick={() => {
                  update(o.key, opt.val);
                  document.documentElement.style.setProperty('--lavender', opt.val);
                  document.documentElement.style.setProperty('--lavender-mid', opt.val);
                }} style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  border: `3px solid ${tweaks[o.key] === opt.val ? 'var(--text)' : 'transparent'}`,
                  background: opt.val, cursor: 'pointer', padding: 0,
                }} />
              ))}
            </div>
          )}
          {o.type === 'slider' && (
            <input type="range" min={o.min} max={o.max} step={o.step} value={tweaks[o.key]}
              onChange={e => update(o.key, +e.target.value)}
              style={{ width: '100%', accentColor: 'var(--lavender-mid)' }}
            />
          )}
          {o.type === 'toggle' && (
            <button onClick={() => update(o.key, !tweaks[o.key])} style={{
              fontFamily: 'Outfit', fontSize: '13px', fontWeight: 700,
              background: tweaks[o.key] ? 'var(--text)' : 'var(--lavender-light)',
              color: tweaks[o.key] ? 'white' : 'var(--text-mid)',
              border: 'none', borderRadius: '20px', padding: '6px 18px', cursor: 'pointer',
            }}>{tweaks[o.key] ? 'on' : 'off'}</button>
          )}
        </div>
      ))}

      <div style={{ marginTop: '10px', paddingTop: '18px', borderTop: '1px dotted rgba(138,115,151,0.4)' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600, color: 'var(--lavender-mid)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '4px' }}>experiments</div>
        <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12.5px', color: 'var(--text-light)', marginBottom: '14px', lineHeight: 1.4 }}>
          toggle each to see the proposed change.
        </div>
        {experiments.map(x => {
          const on = !!tweaks[x.key];
          return (
            <div key={x.key} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              gap: '10px', padding: '10px 0',
              borderBottom: '1px dotted rgba(138,115,151,0.25)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Outfit', fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '2px' }}>{x.label}</div>
                <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: 'var(--text-light)', lineHeight: 1.4 }}>{x.hint}</div>
              </div>
              <button
                onClick={() => update(x.key, !on)}
                style={{
                  flexShrink: 0, width: '40px', height: '22px',
                  background: on ? 'var(--text)' : 'var(--lavender-light)',
                  border: 'none', borderRadius: '12px', padding: 0,
                  cursor: 'pointer', position: 'relative',
                  transition: 'background 0.2s ease',
                }}
                aria-pressed={on}
              >
                <span style={{
                  position: 'absolute', top: '3px',
                  left: on ? '21px' : '3px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  transition: 'left 0.2s ease',
                }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
