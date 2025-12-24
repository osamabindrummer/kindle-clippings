## Archivos relevantes

- `index.html` - Punto de entrada de la app web offline.
- `styles.css` - Estilos de la interfaz.
- `src/main.js` - Inicializacion de la app y manejo de eventos globales.
- `src/parser/clippingsParser.js` - Parser del archivo "My Clippings.txt" y normalizacion de datos.
- `src/state/storage.js` - Persistencia local del historial y deduplicacion.
- `src/export/markdownExporter.js` - Generacion de Markdown y nombres de archivo.
- `src/ui/app.js` - Logica principal de la interfaz.
- `script-local/extract-kindle-clippings.py` - Script local para exportar desde Terminal.
- `script-local/manual.md` - Manual de uso del script local.
- `README.md` - Instrucciones de uso web y CLI.

### Notas

- Las pruebas unitarias aun no estan creadas; definir runner ligero si se requiere.

## Tareas

- [x] 1.0 Definir la base del proyecto web (estructura, dependencias y flujo offline)
- [x] 1.1 Elegir estructura minima del proyecto (index.html, src/, assets/).
- [x] 1.2 Definir dependencias (idealmente cero) y convenciones de modulos.
- [x] 1.3 Configurar scripts basicos de desarrollo (si aplica) y documentar uso.
- [x] 2.0 Implementar el parser de "My Clippings.txt" y el modelo de datos por libro
- [x] 2.1 Analizar el formato del archivo y definir el modelo de salida (libro, autor, fecha, subrayados).
- [x] 2.2 Implementar parseo robusto por entradas y manejo de formatos incompletos.
- [x] 2.3 Extraer solo titulo del libro, autor y fecha de lectura (si aparece).
- [x] 2.4 Agrupar subrayados por libro y contar elementos.
- [ ] 2.5 Crear pruebas con ejemplos reales y casos limite.
- [x] 3.0 Construir la interfaz principal: carga, listado de libros y previsualizacion
- [x] 3.1 Implementar area de arrastrar y soltar con validacion de archivo.
- [x] 3.2 Mostrar lista de libros con conteos y checkbox de seleccion.
- [x] 3.3 Crear panel de previsualizacion con metadatos requeridos.
- [x] 3.4 Añadir estados de carga, vacio y error con mensajes claros.
- [ ] 3.5 Rediseñar la interfaz (layout, tipografia, colores y UI general).
- [x] 4.0 Implementar exportacion Markdown por libro y nomenclatura de archivos
- [x] 4.1 Definir plantilla Markdown minima para Obsidian.
- [x] 4.2 Generar un archivo por libro con el nombre "[titulo libro] (autor).md".
- [x] 4.3 Sanitizar nombres de archivo para evitar caracteres invalidos.
- [x] 4.4 Implementar descarga multiple de archivos seleccionados.
- [ ] 4.6 Ajustar la plantilla de salida Markdown (formato, secciones y metadatos).
- [ ] 4.5 Agregar pruebas del formateo y nombres de archivo.
- [x] 5.0 Implementar persistencia local y deduplicacion de subrayados
- [x] 5.1 Definir clave de deduplicacion estable por subrayado (titulo + fecha + texto).
- [x] 5.2 Guardar historial de libros y hashes en almacenamiento local.
- [x] 5.3 Omitir subrayados duplicados en nuevas importaciones.
- [x] 5.4 Implementar accion para limpiar historial local desde la UI.
- [ ] 5.5 Probar reimportaciones con datos repetidos.
- [x] 6.0 Crear script local CLI y documentacion de uso
- [x] 6.1 Implementar script local en Python para exportar a ~/Desktop/destacados-kindle.
- [x] 6.2 Crear manual del script local y README en raiz.
