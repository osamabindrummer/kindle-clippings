const NOTE_SEPARATOR = '==========';
const HIGHLIGHT_PATTERN = /\bhighlight\b|\bsubrayad/i;
const DATE_PATTERN = /(?:Added on|A\u00f1adido el)\s+(.+)$/i;

function parseTitleLine(line) {
  const sanitized = line.replace(/^\uFEFF/, '').trim();
  const match = sanitized.match(/^(.*)\s+\((.*)\)\s*$/);
  if (match) {
    return {
      title: match[1].trim(),
      author: match[2].trim() || 'Unknown',
    };
  }
  return { title: sanitized, author: 'Unknown' };
}

function extractDate(metaLine) {
  const parts = metaLine.split('|').map((part) => part.trim());
  for (const part of parts) {
    const match = part.match(DATE_PATTERN);
    if (match) {
      return match[1].trim();
    }
  }
  return '';
}

function isHighlight(metaLine) {
  return HIGHLIGHT_PATTERN.test(metaLine);
}

export function parseClippings(text) {
  const blocks = text.split(NOTE_SEPARATOR);
  const booksById = new Map();

  blocks.forEach((rawBlock) => {
    const block = rawBlock.trim();
    if (!block) return;

    const lines = block.split('\n').map((line) => line.trim());
    if (lines.length < 3) return;

    const titleLine = lines[0];
    const metaLine = lines[1];
    if (!isHighlight(metaLine)) return;

    const { title, author } = parseTitleLine(titleLine);
    const date = extractDate(metaLine);

    const textLines = lines.slice(2).filter((line) => line.length > 0);
    const highlightText = textLines.join(' ');
    if (!highlightText) return;

    const bookId = `${title}||${author}`;
    const book = booksById.get(bookId) || {
      id: bookId,
      title,
      author,
      highlights: [],
    };

    book.highlights.push({ text: highlightText, date });
    booksById.set(bookId, book);
  });

  return Array.from(booksById.values()).sort((a, b) =>
    a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })
  );
}
