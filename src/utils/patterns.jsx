export const PATTERN_DEFS = {
  dots: { id: 'dots', render: (id) => (
    <pattern id={id} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="transparent"/>
      <rect x="0" y="0" width="4" height="4" fill="rgba(255,255,255,0.28)"/>
      <rect x="8" y="8" width="4" height="4" fill="rgba(255,255,255,0.28)"/>
    </pattern>
  )},
  stripes: { id: 'stripes', render: (id) => (
    <pattern id={id} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="14" height="14" fill="transparent"/>
      <rect x="0" y="0" width="3" height="14" fill="rgba(255,255,255,0.28)"/>
    </pattern>
  )},
  plaid: { id: 'plaid', render: (id) => (
    <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="transparent"/>
      <rect x="0" y="0" width="20" height="3" fill="rgba(255,255,255,0.22)"/>
      <rect x="0" y="0" width="3" height="20" fill="rgba(255,255,255,0.22)"/>
      <rect x="10" y="10" width="6" height="6" fill="rgba(255,255,255,0.12)"/>
    </pattern>
  )},
  grid: { id: 'grid', render: (id) => (
    <pattern id={id} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
      <rect width="22" height="22" fill="transparent"/>
      <path d="M 22 0 L 0 0 0 22" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none"/>
    </pattern>
  )},
  waves: { id: 'waves', render: (id) => (
    <pattern id={id} x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse">
      <rect width="24" height="12" fill="transparent"/>
      <path d="M 0 6 Q 6 0, 12 6 T 24 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
    </pattern>
  )},
  dashes: { id: 'dashes', render: (id) => (
    <pattern id={id} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
      <rect width="14" height="14" fill="transparent"/>
      <rect x="0" y="6" width="7" height="2.5" fill="rgba(255,255,255,0.32)"/>
    </pattern>
  )},
  cross: { id: 'cross', render: (id) => (
    <pattern id={id} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
      <rect width="18" height="18" fill="transparent"/>
      <path d="M 6 9 L 12 9 M 9 6 L 9 12" stroke="rgba(255,255,255,0.32)" strokeWidth="1.2"/>
    </pattern>
  )},
  rings: { id: 'rings', render: (id) => (
    <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="transparent"/>
      <circle cx="10" cy="10" r="3.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
    </pattern>
  )},
};

export const PATTERN_BY_TAG = {
  'UX Design':         'grid',
  'Research':          'waves',
  'Product Design':    'plaid',
  'Mobile App':        'dots',
  'Research + Design': 'cross',
  'Branding':          'rings',
  'Journal':           'dashes',
  'Behind the Scenes': 'plaid',
  'Photography':       'stripes',
  'Crafts':            'cross',
  'Sweet Treats':      'rings',
  'School Life':       'grid',
  'Lists':             'dashes',
  'Notes':             'waves',
};

export function patternKeyFor(tag) {
  return PATTERN_BY_TAG[tag] || 'dots';
}
