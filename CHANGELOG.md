# Changelog

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
