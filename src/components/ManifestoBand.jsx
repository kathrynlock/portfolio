export function ManifestoBand() {
  return (
    <section style={{
      background: 'var(--ink, #2A1F3A)',
      color: '#F5EFE3',
      padding: '120px 60px',
      position: 'relative',
      overflow: 'hidden',
      margin: '40px 0 60px',
    }}>
      <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '460px', height: '460px', background: 'radial-gradient(circle, rgba(201,184,217,0.10) 0%, transparent 60%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(184,138,133,0.06) 0%, transparent 60%)', pointerEvents: 'none' }}/>
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(245,239,227,0.5)',
          marginBottom: '36px',
        }}>
          a working belief · 01
        </div>
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 1.12,
          color: '#F5EFE3', textWrap: 'balance',
          marginBottom: '40px', letterSpacing: '-0.005em',
        }}>
          The best technology feels like a friend — warm, useful, and quietly
          delightful. Most days I&apos;m working toward that,{' '}
          <span style={{ color: 'var(--lavender)', fontStyle: 'italic' }}>one small detail at a time.</span>
        </p>
        <div style={{
          fontFamily: "'Caveat', cursive", fontWeight: 700,
          fontSize: '42px', lineHeight: 1, color: '#F5EFE3',
          transform: 'rotate(-3deg)', display: 'inline-block',
          marginLeft: '8px',
        }}>
          — kate
        </div>
      </div>
    </section>
  );
}
