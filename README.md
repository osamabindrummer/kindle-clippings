# Kindle Clippings Web Extractor

Webapp (online y offline) y script Python local para convertir "My Clippings.txt" de Kindle a Markdown compatible con Obsidian. Inspirado en [este video](https://youtu.be/nFy-f9XWdqw?si=RpP8eDUA8yZXCbRF) de Dann Berg.

## Sitio público

https://osamabindrummer.github.io/kindle-clippings/index.html

## Webapp local (navegador)

1. Abre Terminal.
2. Ve a la raiz del proyecto:

```bash
cd /Users/dsj-x/Developer/kindle-clippings
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
cd /Users/x/Developer/kindle-clippings
```

3. Ejecuta el script:

```bash
./script-local/extract-kindle-clippings.py "/ruta/a/My Clippings.txt"
```

4. Los archivos se guardan en:

```
~/Desktop/destacados-kindle
```

### Destino personalizado

```bash
./script-local/extract-kindle-clippings.py "/ruta/a/My Clippings.txt" -o "/ruta/a/otra/carpeta"
```

### Alias global (zsh)

1. Abre tu archivo de configuracion:

```bash
nano ~/.zshrc
```

2. Agrega el alias:

```bash
alias kindle.py="/Users/dsj-air/Developer/kindle-clippings/script-local/extract-kindle-clippings.py"
```

3. Recarga la configuracion:

```bash
source ~/.zshrc
```

4. Ejecuta el script desde cualquier carpeta:

```bash
kindle.py "/ruta/a/My Clippings.txt"
```
