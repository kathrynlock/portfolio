export const RESUME_NOTES = {
  'Emerson|June to Aug 2025':           'my first time leading meetings!',
  'WithLoveKKate|May 2021 to May 2025': 'started in 9th grade — 1,000+ sales!',
  'Fiveable|Feb to Apr 2024':           'wrote curriculum for 14k+ students!',
  'CodeRRHS|Fall 2022 to Spring 2025':  'taught 400+ kids to code.',
};

export function lookupNote(co, date) {
  return RESUME_NOTES[`${co}|${date}`] || null;
}

export function ResumeMargin({ note, rotate = -2 }) {
  return (
    <div style={{
      position: 'absolute', right: '-220px', top: '8px',
      width: '190px',
      fontFamily: "'Caveat', cursive", fontWeight: 600,
      fontSize: '19px', lineHeight: 1.3,
      color: 'var(--lavender-mid)',
      transform: `rotate(${rotate}deg)`,
      paddingLeft: '14px',
      borderLeft: '2px solid var(--lavender)',
      pointerEvents: 'none',
    }}>
      <span style={{ marginRight: '4px', color: 'var(--lavender)' }}>✦</span>
      {note}
    </div>
  );
}
