import { parseClippings } from '../parser/clippingsParser.js';
import { buildMarkdown, makeFilename } from '../export/markdownExporter.js';
import { createZip, downloadBlob } from '../export/zipExporter.js';
import { addHashes, getExistingHashes, loadHistory } from '../state/storage.js';

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
  const testButton = document.getElementById('testButton');
  const resetButton = document.getElementById('resetButton');
  const status = document.getElementById('status');
  const bookList = document.getElementById('bookList');
  const exportButton = document.getElementById('exportButton');
  const clearSelectionButton = document.getElementById('clearSelection');
  const selectionStatus = document.getElementById('selectionStatus');

  let books = [];
  let selectedBooks = new Set();
  let history = loadHistory();
  let pendingFile = null;

  function setStatus(message) {
    status.textContent = message;
  }

  function updateExportState() {
    exportButton.disabled = selectedBooks.size === 0;
    clearSelectionButton.disabled = selectedBooks.size === 0;
    updateSelectionStatus();
  }

  function updateProcessState() {
    processButton.disabled = !pendingFile;
  }

  function updateSelectionStatus() {
    if (books.length === 0) {
      selectionStatus.textContent = '';
      return;
    }
    selectionStatus.textContent = `Seleccionados ${selectedBooks.size} de ${books.length} libros.`;
  }

  function renderBooks() {
    if (books.length === 0) {
      bookList.innerHTML = '<p class="muted">Carga un archivo para ver los libros.</p>';
      selectionStatus.textContent = '';
      return;
    }

    bookList.innerHTML = '';
    books.forEach((book) => {
      const item = document.createElement('label');
      item.className = 'book-item';

      const title = document.createElement('span');
      const author = book.author ? book.author : 'Autor desconocido';
      title.textContent = `${book.title} (${author})`;

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

      item.appendChild(title);
      item.appendChild(checkbox);

      bookList.appendChild(item);
    });
    updateSelectionStatus();
  }

  function handleFile(file) {
    if (!file) return;
    if (!file.name.endsWith('.txt')) {
      setStatus('El archivo debe ser un .txt de Kindle.');
      return;
    }
    pendingFile = file;
    updateProcessState();
    setStatus('Archivo listo. Pulsa "Procesar" para analizarlo.');
    dropzone.classList.add('dropzone--loaded');
    const dropzoneContent = dropzone.querySelector('.dropzone__content');
    dropzoneContent.innerHTML = `
      <div class="file-icon" aria-hidden="true">
        <svg viewBox="0 0 96 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M66 8H30c-8.837 0-16 7.163-16 16v72c0 8.837 7.163 16 16 16h44c8.837 0 16-7.163 16-16V36L66 8z"
            fill="#f7efe2"
            stroke="#d1b28d"
            stroke-width="3"
            stroke-linejoin="round"
          />
          <path d="M66 8v18c0 5.523 4.477 10 10 10h14L66 8z" fill="#e4d3bd" />
          <rect x="26" y="56" width="44" height="6" rx="3" fill="#d1b28d" />
          <rect x="26" y="72" width="36" height="6" rx="3" fill="#c0a080" />
          <rect x="26" y="88" width="28" height="6" rx="3" fill="#a38b74" />
        </svg>
      </div>
      <div class="file-name">${file.name}</div>
    `;
  }

  function resetUI() {
    books = [];
    selectedBooks = new Set();
    pendingFile = null;
    fileInput.value = '';
    dropzone.classList.remove('dropzone--loaded');
    const dropzoneContent = dropzone.querySelector('.dropzone__content');
    dropzoneContent.innerHTML = '<span>Arrastra y suelta tu &quot;My Clippings.txt&quot; aqui</span>';
    renderBooks();
    updateExportState();
    updateProcessState();
    setStatus('');
  }

  function processFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = parseClippings(reader.result);
        books = enrichBooks(parsed, history);
        selectedBooks = new Set();
        renderBooks();
        updateExportState();
        setStatus(`Archivo procesado. ${books.length} libros detectados.`);
      } catch (error) {
        setStatus('No se pudo procesar el archivo. Revisa el formato.');
      }
    };
    reader.readAsText(file);
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

  dropzone.addEventListener('click', () => fileInput.click());
  fileButton.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (event) => handleFile(event.target.files[0]));
  processButton.addEventListener('click', () => {
    processFile(pendingFile);
  });

  testButton.addEventListener('click', async () => {
    try {
      const response = await fetch(encodeURI('./My Clippings.txt'));
      if (!response.ok) {
        setStatus('No se pudo cargar el archivo de prueba.');
        return;
      }
      const text = await response.text();
      const file = new File([text], 'My Clippings.txt', { type: 'text/plain' });
      handleFile(file);
      processFile(file);
    } catch (error) {
      setStatus('No se pudo cargar el archivo de prueba.');
    }
  });

  resetButton.addEventListener('click', () => resetUI());

  exportButton.addEventListener('click', () => {
    if (selectedBooks.size === 0) return;
    const files = [];

    books.forEach((book) => {
      if (!selectedBooks.has(book.id)) return;

      const content = buildMarkdown({
        title: book.title,
        author: book.author,
        highlights: book.highlights,
      });
      files.push({
        name: makeFilename(book),
        content,
      });
      addHashes(history, book.id, book.highlights.map((h) => h.hash));
    });

    if (files.length === 0) {
      setStatus('No hay libros seleccionados para descargar.');
      return;
    }

    const zip = createZip(files);
    downloadBlob('kindle-clippings.zip', zip);
    history = loadHistory();
    books = enrichBooks(books, history);
    renderBooks();
    setStatus(`Descarga lista. Se genero un zip con ${files.length} libro(s).`);
  });

  clearSelectionButton.addEventListener('click', () => {
    selectedBooks = new Set();
    renderBooks();
    updateExportState();
  });

  updateProcessState();
}
