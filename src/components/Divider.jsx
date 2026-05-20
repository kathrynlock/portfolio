import { useIsMobile } from '../hooks/useIsMobile';

export function Divider() {
  const isMobile = useIsMobile();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: isMobile ? '0 24px' : '0 60px', margin: '8px 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,184,217,0.6), transparent)' }} />
      <span style={{ fontFamily: "'Newsreader', serif", fontSize: '22px', color: 'var(--lavender-mid)', opacity: 0.7 }}>&#10022;</span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,184,217,0.6), transparent)' }} />
    </div>
  );
}
