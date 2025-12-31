# Changelog

## 2025-12-31
- Se ajusto la alineacion general para mantener la app centrada horizontalmente pero mas cerca del borde superior.
- Se habilito que el dropzone abra el selector de archivos al hacer clic, manteniendo soporte drag and drop.
- Se agrego el boton "Prueba" para cargar y procesar automaticamente `My Clippings.txt`.
- Se agrego el boton "Limpiar" para reiniciar la interfaz al estado inicial.
- Se agrego un pie de pagina con enlace a "Daniel Salas J.".

## 2025-12-30
- Se agregó confirmación visual en el dropzone: ícono de documento y nombre del archivo cargado para confirmar la carga exitosa.
- Se cambio el formato de exportacion a frontmatter con autor y formato Kindle, removiendo viñetas y fechas en subrayados.
- Se preservaron saltos de linea en los subrayados para mantener listas internas cuando existan.
- Se agrego agrupacion por capitulo cuando el metadato lo incluye, usando encabezados "## Capítulo X".

## 2025-12-26
- Se redisenio la UI con dos paneles iguales, layout centrado y estilo minimalista inspirado en la nueva paleta.
- Se simplifico la interfaz quitando la previsualizacion y dejando solo importacion, listado y descarga.
- Se agrego exportacion en ZIP con todos los libros seleccionados.
- Se incorporo boton para limpiar seleccion y un indicador de seleccion actual.
- Se ajustaron textos, iconografia con emojis y consistencia visual en botones.

## 2025-12-23
- Se creo la webapp offline con `index.html`, `styles.css` y modulos JS en `src/`.
- Se implemento el parser de clippings, exportacion Markdown y deduplicacion local.
- Se agrego UI para carga, listado, previsualizacion y exportacion.
- Se creo el script local en `script-local/extract-kindle-clippings.py`.
- Se agregaron manual del script y README en raiz.
- Se limpio `.gitignore` para dejar lo esencial.
- Se actualizo el parser para soportar clippings en espanol y BOM UTF-8.
- Se agrego un boton de procesar para hacer explicito el flujo de importacion.
