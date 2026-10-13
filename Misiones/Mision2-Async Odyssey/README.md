# Buscador de Rick and Morty

Misión M2 · Async Odyssey — Web Development I.

## Cómo probarlo
Ejecuta npm install y después npm run dev, y abre la dirección que
muestra Vite (normalmente http://localhost:5173). Al entrar se cargan
los personajes de la API de Rick and Morty. Puedes buscar por nombre y
filtrar por estado (vivos, muertos o desconocido); encima de las
tarjetas sale un resumen con cuántos hay de cada estado. Si buscas un
nombre que no existe te avisa de que no hay resultados, y si se cae la
conexión aparece un mensaje de error con un botón «Reintentar».

## Uso de IA
Usé Claude Code (VS Code) como pareja de programación, igual que en la M1.
Ejemplo de prompt real: "Lee el tema 2 de los apuntes y dime qué APIs
públicas sin clave podría usar para la misión y cómo separarías el
código en módulos". Me propuso varias (PokeAPI, Rick and Morty, una de
países) y elegí Rick and Morty porque permite filtrar por nombre y estado
directamente en la URL. A partir de ahí fui haciendo un módulo cada vez
(api.js, logic.js, render.js y main.js) con un commit al terminar cada uno.
Verifiqué los cambios leyendo el código y probando en el navegador con la
pestaña Network: buscando nombres inventados, y poniendo la red en
"Offline" para comprobar que salía el error y que «Reintentar» funcionaba.
Así me di cuenta de que la API devuelve 404 cuando no encuentra a nadie y
la app lo mostraba como un error, así que lo cambiamos para tratarlo como
una lista vacía. También le pedí que quitara cosas que añadía de más
(una caché de resultados y un debounce en el buscador) porque no entendía
del todo cómo funcionaban y para esta misión no hacían falta.

## Autopsia
1. Separé el código en cuatro módulos: api.js solo hace el fetch,
   logic.js solo transforma los datos y render.js es el único que toca
   el DOM; main.js los une. Descarté tenerlo todo en main.js como en la
   M1 porque aquí hay más casos (cargando, vacío, error) y mezclar el
   fetch con el pintado hacía muy difícil saber dónde fallaba algo.
2. En api.js compruebo response.ok antes de leer el JSON, porque fetch
   no lanza error con un 404 o un 500, solo cuando falla la red. El 404
   lo devuelvo como lista vacía porque para esta API significa "no hay
   resultados", y además uso AbortSignal.timeout(8000) para que la
   petición no se quede cargando para siempre si la API no responde.
3. Las tarjetas se crean con createElement y textContent en vez de
   montar un string con innerHTML. Con innerHTML era más corto, pero
   si un nombre viniera con HTML dentro se ejecutaría en la página (XSS).
   Antes de pintar, limpiarPersonajes descarta los personajes sin nombre
   y rellena con ?? y || los campos que falten, así render.js no tiene
   que comprobar nada.
