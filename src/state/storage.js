const STORAGE_KEY = 'kindleClippingsHistoryV1';

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export function loadHistory() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  if (!parsed || typeof parsed !== 'object') {
    return { books: {} };
  }
  return { books: parsed.books || {} };
}

export function saveHistory(history) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getExistingHashes(history, bookId) {
  const entry = history.books[bookId];
  return entry ? entry.hashes || [] : [];
}

export function addHashes(history, bookId, hashes) {
  const existing = new Set(getExistingHashes(history, bookId));
  hashes.forEach((hash) => existing.add(hash));
  history.books[bookId] = { hashes: Array.from(existing) };
  saveHistory(history);
}

export function clearHistory() {
  window.localStorage.removeItem(STORAGE_KEY);
}
