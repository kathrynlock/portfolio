/* ─────────────────────────────────────────────────────────────────
   content.js  —  Markdown content loader for blog posts + projects

   To add a new blog post:  drop a .md file in src/content/blog/
   To add a new project:    drop a .md file in src/content/projects/
   No other files need editing.

   Frontmatter cheat-sheet
   ───────────────────────
   Strings (bare):      title: On Slow Mornings and Slower Mail
   Strings (quoted):    heroColor: "var(--lavender-light)"
   Hex colors (quote!): color: "#E8E0EC"   ← # would be a comment otherwise
   Numbers:             readMins: 5
   Flat arrays:         tags: [Journal, Notes]
   Images:              hero: /blog/my-image.jpg   ← put file in public/blog/

   Everything after the closing --- is the article body (plain text, one
   paragraph per blank-line-separated block). The first paragraph gets the
   drop-cap treatment; the rest flow around the pull-quote.
───────────────────────────────────────────────────────────────── */

/**
 * Parse a markdown string with YAML-ish frontmatter.
 * Handles: bare strings, quoted strings, numbers, flat arrays [a, b, c].
 */
function parseMd(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)/);
  if (!match) return { data: {}, content: raw.trim() };

  const data = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    if (!key) continue;

    if (val.startsWith('[') && val.endsWith(']')) {
      // flat array: [Item One, Item Two]
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      data[key] = val.slice(1, -1);
    } else if (val !== '' && !isNaN(val)) {
      data[key] = Number(val);
    } else {
      data[key] = val;
    }
  }

  return { data, content: match[2].trim() };
}

/** Strip leading digits + hyphen from filenames like 01-campus-connect.md */
function slugFromPath(path) {
  return path
    .split('/')
    .pop()
    .replace(/^\d+-/, '')
    .replace(/\.md$/, '');
}

/* ── Blog Posts ──────────────────────────────────────────────────
   Sorted newest-first by the `date` frontmatter field.
   The slug is derived from the filename automatically.
─────────────────────────────────────────────────────────────────── */
const blogFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export const BLOG_POSTS = Object.entries(blogFiles)
  .map(([path, raw]) => {
    const { data, content } = parseMd(raw);
    return { ...data, slug: data.slug ?? slugFromPath(path), body: content };
  })
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

/* ── Projects ────────────────────────────────────────────────────
   Order is controlled by the filename prefix: 01-, 02-, etc.
   The `id` is set to the position in the sorted array (1-based).
─────────────────────────────────────────────────────────────────── */
const projectFiles = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default', eager: true });

export const PROJECTS = Object.entries(projectFiles)
  .sort(([a], [b]) => a.localeCompare(b))          // alphabetical = numeric order
  .map(([path, raw], index) => {
    const { data, content } = parseMd(raw);
    return { id: index + 1, ...data, slug: slugFromPath(path), body: content };
  });
