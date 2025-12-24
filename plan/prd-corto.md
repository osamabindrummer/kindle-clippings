# PRD: Kindle Clippings Web Extractor

## 1. Introduccion/Resumen
Aplicacion web para transformar archivos "My Clippings.txt" de Kindle en notas Markdown compatibles con Obsidian. El objetivo es permitir a un lector individual importar, organizar y exportar sus subrayados de forma rapida y visual, sin backend y con persistencia local para evitar reprocesar libros ya importados.

## 2. Objetivos
- Reducir a menos de 1 minuto el tiempo total entre subir un archivo y descargar los Markdown.
- Permitir organizar cientos de subrayados por libro en segundos, sin bloqueos visibles.
- Evitar duplicados cuando el usuario reimporte un archivo que contiene libros ya procesados.
- Ofrecer una experiencia simple y en espanol, con interfaz minimalista.

## 3. Historias de usuario
- Como lector individual, quiero arrastrar y soltar mi archivo de Kindle para empezar sin pasos tecnicos.
- Como lector individual, quiero ver los libros detectados y seleccionar solo los que deseo exportar.
- Como lector individual, quiero previsualizar los subrayados con autor, ubicacion, fecha y tipo para revisar la calidad antes de descargar.
- Como lector individual, quiero exportar un archivo Markdown por libro para importarlo facilmente en Obsidian.
- Como lector individual, quiero que la app recuerde libros ya procesados para no duplicar notas.

## 4. Requisitos funcionales
1. El sistema debe permitir cargar "My Clippings.txt" mediante arrastrar y soltar y mediante seleccion de archivo.
2. El sistema debe parsear el archivo y agrupar los subrayados por libro en menos de 5 segundos para archivos de hasta 2 MB.
3. El sistema debe mostrar una lista de libros detectados con conteo de subrayados.
4. El sistema debe permitir seleccionar uno o varios libros para exportar.
5. El sistema debe mostrar una previsualizacion de los subrayados con metadatos: titulo del libro, autor y fecha de lectura (si aparece).
6. El sistema debe exportar un archivo Markdown por libro seleccionado.
7. El sistema debe generar nombres de archivo con el formato "[titulo libro] (autor).md".
8. El sistema debe almacenar en el navegador un historial de libros procesados para evitar duplicados en nuevas importaciones.
9. El sistema debe detectar y omitir subrayados duplicados cuando se reimporte un archivo.
10. El sistema debe permitir limpiar el historial local de importaciones desde la interfaz.
11. El sistema debe funcionar completamente offline, sin backend.
12. El sistema debe estar en espanol; los contenidos de libros pueden estar en cualquier idioma.
13. El sistema debe mostrar mensajes de error claros y recomendaciones basicas cuando el archivo no pueda procesarse.

## 5. No-objetivos (Fuera de alcance)
- Autenticacion, cuentas de usuario o sincronizacion en la nube.
- Edicion avanzada de subrayados dentro de la app.
- Soporte para exportar a formatos distintos de Markdown.
- Procesamiento de notas o marcadores de Kindle (solo subrayados).

## 6. Consideraciones de diseno
- Interfaz minimalista y limpia para validar la utilidad.
- Flujo principal en una sola pantalla: carga, lista de libros, previsualizacion, exportacion.
- Estados de carga visibles y mensajes de progreso.

## 7. Consideraciones tecnicas
- La app debe ejecutarse totalmente en el navegador y usar almacenamiento local (por ejemplo, localStorage o IndexedDB).
- El parser debe tolerar variaciones comunes del formato "My Clippings.txt".
- La deteccion de duplicados debe basarse en un hash estable por subrayado (por ejemplo, titulo + fecha + texto).
- No se usara backend ni llamadas de red.

## 8. Metricas de exito
- 90% de importaciones completadas sin errores en archivos reales del usuario.
- Tiempo promedio de procesamiento < 5 segundos para 2 MB.
- Al menos 1 exportacion exitosa por sesion en el 80% de sesiones.
- Cero duplicados reportados tras reimportar el mismo archivo.
