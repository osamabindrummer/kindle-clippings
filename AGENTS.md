# Instrucciones de kindle-clippings

## Puertos y servidores locales

- La web local servida con Python usa `127.0.0.1:8001` según el README.
- Antes de añadir o cambiar un servidor, revisar los puertos documentados en los demás repositorios de `~/Developer`; reservar una dirección propia y actualizar en el mismo cambio el lanzador, la configuración, los enlaces internos y el README.
- Los lanzadores deben fallar con un mensaje claro si su puerto está ocupado. No usar una respuesta HTTP de otro proceso como prueba de que arrancó el servidor propio; verificar el proceso o una señal de identidad antes de abrir el navegador.
- No iniciar automáticamente otro puerto si el puerto esperado está ocupado, salvo que el proyecto tenga un rango exclusivo documentado y muestre la dirección elegida.
