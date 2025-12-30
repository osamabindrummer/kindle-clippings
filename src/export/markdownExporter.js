export function sanitizeFilename(name) {
  return name
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function makeFilename({ title, author }) {
  const safeTitle = sanitizeFilename(title || 'Sin titulo');
  const safeAuthor = sanitizeFilename(author || 'Unknown');
  return `${safeTitle} (${safeAuthor}).md`;
}

export function buildMarkdown(book) {
  const lines = [];
  lines.push(`# ${book.title}`);
  lines.push('');
  lines.push('---');
  lines.push(`Autor: ${book.author}`);
  lines.push('Formato: Kindle');
  lines.push('---');
  lines.push('');
  let lastChapter = null;
  book.highlights.forEach((highlight) => {
    if (highlight.chapter) {
      const chapterLabel = `Capítulo ${highlight.chapter}`;
      if (chapterLabel !== lastChapter) {
        lines.push(`## ${chapterLabel}`);
        lines.push('');
        lastChapter = chapterLabel;
      }
    }
    lines.push(highlight.text);
    lines.push('');
  });
  lines.push('');
  return lines.join('\n');
}

export function downloadText(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}
