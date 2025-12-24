# Kindle Clippings Web Extractor

Webapp offline y script local para convertir "My Clippings.txt" de Kindle a Markdown compatible con Obsidian.
Inspirado en este video de YouTube: https://youtu.be/nFy-f9XWdqw?si=RpP8eDUA8yZXCbRF

## Webapp (navegador)

1. Abre Terminal.
2. Ve a la raiz del proyecto:

```bash
cd /Users/dsj-air/Developer/kindle-clippings
```

3. Levanta un servidor local:

```bash
python3 -m http.server
```

4. Abre en el navegador:

```
http://localhost:8000
```

5. Arrastra y suelta tu archivo "My Clippings.txt" y exporta los Markdown.

## Script local (Terminal)

1. Abre Terminal.
2. Ve a la raiz del proyecto:

```bash
cd /Users/dsj-air/Developer/kindle-clippings
```

3. Ejecuta el script:

```bash
./script-local/extract-kindle-clippings.py "/ruta/a/My Clippings.txt"
```

4. Los archivos se guardan en:

```
~/Desktop/destacados-kindle
```

### Salida personalizada

```bash
./script-local/extract-kindle-clippings.py "/ruta/a/My Clippings.txt" -o "/ruta/a/otra/carpeta"
```
