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
  lines.push(`Autor:: ${book.author}`);
  lines.push('');
  lines.push('## Subrayados');
  lines.push('');
  book.highlights.forEach((highlight) => {
    const dateSuffix = highlight.date ? ` (Fecha: ${highlight.date})` : '';
    lines.push(`- ${highlight.text}${dateSuffix}`);
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
