import { parseClippings } from '../parser/clippingsParser.js';
import { buildMarkdown, downloadText, makeFilename } from '../export/markdownExporter.js';
import { addHashes, clearHistory, getExistingHashes, loadHistory } from '../state/storage.js';

function hashString(value) {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function enrichBooks(books, history) {
  return books.map((book) => {
    const highlights = book.highlights.map((highlight) => ({
      ...highlight,
      hash: hashString(`${book.title}|${book.author}|${highlight.date}|${highlight.text}`),
    }));
    const existing = new Set(getExistingHashes(history, book.id));
    const newHighlights = highlights.filter((h) => !existing.has(h.hash));
    return {
      ...book,
      highlights,
      newHighlights,
      existingCount: highlights.length - newHighlights.length,
    };
  });
}

export function initApp() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const fileButton = document.getElementById('fileButton');
  const processButton = document.getElementById('processButton');
  const status = document.getElementById('status');
  const bookList = document.getElementById('bookList');
  const preview = document.getElementById('preview');
  const exportButton = document.getElementById('exportButton');
  const clearHistoryButton = document.getElementById('clearHistory');

  let books = [];
  let selectedBooks = new Set();
  let history = loadHistory();
  let pendingFile = null;

  function setStatus(message) {
    status.textContent = message;
  }

  function updateExportState() {
    exportButton.disabled = selectedBooks.size === 0;
  }

  function updateProcessState() {
    processButton.disabled = !pendingFile;
  }

  function renderPreview(book) {
    if (!book) {
      preview.innerHTML = '<p class="muted">Selecciona un libro para ver los subrayados.</p>';
      return;
    }

    const header = `
      <div>
        <strong>${book.title}</strong>
        <div class="book-item__meta">${book.author}</div>
      </div>
      <div class="book-item__meta">${book.newHighlights.length} nuevos</div>
    `;

    const items = book.newHighlights.length
      ? book.newHighlights
          .map(
            (highlight) => `
          <div class="preview-item">
            <p>${highlight.text}</p>
            <div class="preview-date">${highlight.date || 'Fecha no disponible'}</div>
          </div>
        `
          )
          .join('')
      : '<p class="muted">No hay nuevos subrayados para este libro.</p>';

    preview.innerHTML = `
      <div class="book-item">${header}</div>
      <div class="preview-list">${items}</div>
    `;
  }

  function renderBooks() {
    if (books.length === 0) {
      bookList.innerHTML = '<p class="muted">Carga un archivo para ver los libros.</p>';
      return;
    }

    bookList.innerHTML = '';
    books.forEach((book) => {
      const item = document.createElement('div');
      item.className = 'book-item';

      const header = document.createElement('div');
      header.className = 'book-item__header';

      const title = document.createElement('div');
      title.className = 'book-item__title';
      title.textContent = book.title;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = selectedBooks.has(book.id);
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          selectedBooks.add(book.id);
        } else {
          selectedBooks.delete(book.id);
        }
        updateExportState();
      });

      header.appendChild(title);
      header.appendChild(checkbox);

      const meta = document.createElement('div');
      meta.className = 'book-item__meta';
      meta.textContent = `${book.author} · ${book.highlights.length} subrayados · ${book.newHighlights.length} nuevos`;

      const previewButton = document.createElement('button');
      previewButton.type = 'button';
      previewButton.className = 'button button--ghost';
      previewButton.textContent = 'Previsualizar';
      previewButton.addEventListener('click', () => renderPreview(book));

      item.appendChild(header);
      item.appendChild(meta);
      item.appendChild(previewButton);

      bookList.appendChild(item);
    });
  }

  function handleFile(file) {
    if (!file) return;
    if (!file.name.endsWith('.txt')) {
      setStatus('El archivo debe ser un .txt de Kindle.');
      return;
    }
    pendingFile = file;
    updateProcessState();
    setStatus('Archivo listo. Pulsa "Procesar archivo" para analizarlo.');
  }

  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    handleFile(file);
  });

  fileButton.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (event) => handleFile(event.target.files[0]));
  processButton.addEventListener('click', () => {
    if (!pendingFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = parseClippings(reader.result);
        books = enrichBooks(parsed, history);
        selectedBooks = new Set();
        renderBooks();
        renderPreview(null);
        updateExportState();
        setStatus(`Archivo procesado. ${books.length} libros detectados.`);
      } catch (error) {
        setStatus('No se pudo procesar el archivo. Revisa el formato.');
      }
    };
    reader.readAsText(pendingFile);
  });

  exportButton.addEventListener('click', () => {
    if (selectedBooks.size === 0) return;
    let exported = 0;

    books.forEach((book) => {
      if (!selectedBooks.has(book.id)) return;
      if (book.newHighlights.length === 0) return;

      const content = buildMarkdown({
        title: book.title,
        author: book.author,
        highlights: book.newHighlights,
      });
      const filename = makeFilename(book);
      downloadText(filename, content);
      addHashes(history, book.id, book.newHighlights.map((h) => h.hash));
      exported += 1;
    });

    history = loadHistory();
    books = enrichBooks(books, history);
    renderBooks();
    setStatus(exported > 0 ? 'Exportacion completada.' : 'No hay nuevos subrayados para exportar.');
  });

  clearHistoryButton.addEventListener('click', () => {
    if (window.confirm('Esto borrara el historial local. ¿Continuar?')) {
      clearHistory();
      history = loadHistory();
      books = enrichBooks(books, history);
      renderBooks();
      renderPreview(null);
      updateExportState();
      setStatus('Historial local limpiado.');
    }
  });

  updateProcessState();
}
