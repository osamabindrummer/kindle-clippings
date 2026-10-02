# Uso en Linux (Arch, Manjaro u otras distribuciones)

Abre una terminal en la carpeta raíz de este repositorio clonado. Para revisar archivos y editar código, no necesitas ejecutar el servidor: usa tu editor y Git normalmente. Los comandos siguientes sirven para abrir la aplicación local. Detén un servidor con `Ctrl+C`. Los archivos `.command` son accesos rápidos de macOS; en Linux usa estos comandos.

## Web local

Desde la raíz:

```sh
python3 -m http.server 8001 --bind 127.0.0.1
```

Abre `http://127.0.0.1:8001/`. Las rutas `/Users/...` del [README.md](README.md) son ejemplos de otros equipos; sustitúyelas por la ubicación de tu clon. El archivo privado `My Clippings.txt` se elige en el navegador y no aparece automáticamente al clonar.
