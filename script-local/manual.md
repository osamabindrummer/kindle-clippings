# Manual de uso (script local)

## Requisitos
- Python 3 instalado (no requiere librerias adicionales).

## Pasos desde Terminal
1. Abrir Terminal.
2. Ir a la carpeta del proyecto:

```bash
cd /Users/dsj-air/Developer/kindle-clippings
```

3. Ejecutar el script con tu archivo de Kindle:

```bash
./script-local/extract-kindle-clippings.py "/ruta/a/My Clippings.txt"
```

4. Los archivos Markdown se guardaran en:

```
~/Desktop/destacados-kindle
```

## Opcional: elegir otra carpeta de salida

```bash
./script-local/extract-kindle-clippings.py "/ruta/a/My Clippings.txt" -o "/ruta/a/otra/carpeta"
```

## Alias para ejecutar desde cualquier carpeta

Si usas macOS con zsh, puedes crear un alias permanente:

1. Abrir tu archivo de configuracion:

```bash
nano ~/.zshrc
```

2. Agregar esta linea al final:

```bash
alias kindle.py="/Users/dsj-air/Developer/kindle-clippings/script-local/extract-kindle-clippings.py"
```

3. Guardar y recargar la configuracion:

```bash
source ~/.zshrc
```

4. Ejecutar desde cualquier carpeta:

```bash
kindle.py "/ruta/a/My Clippings.txt"
```
