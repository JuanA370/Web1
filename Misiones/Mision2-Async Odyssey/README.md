# Buscador de Rick and Morty

Misión M2 · Async Odyssey — Web Development I.

Aplicación hecha con Vite (JavaScript puro, sin frameworks) que consume la
API pública de [Rick and Morty](https://rickandmortyapi.com) con `fetch` y
`async/await`. Permite buscar personajes por nombre y filtrarlos por estado
(vivos, muertos o desconocido).

## Cómo probarlo
```bash
npm install
npm run dev
```
Abre la dirección que muestra Vite (normalmente http://localhost:5173).

## Estructura
```
src/
  api.js      → fetch a la API, comprobación de response.ok y timeout
  logic.js    → transforma los datos con filter, map y reduce
  render.js   → pinta las tarjetas y los estados de carga, vacío y error
  main.js     → une los módulos y escucha el formulario
  styles.css
```

## Estados y robustez
- **Cargando**: se muestra un mensaje mientras llega la respuesta.
- **Vacío**: la API responde 404 cuando no encuentra a nadie; se trata como
  una lista vacía y se avisa al usuario.
- **Error**: errores HTTP, fallos de red o peticiones de más de 8 segundos
  (`AbortSignal.timeout`) muestran un mensaje con un botón «Reintentar».
- **Datos raros**: se descartan los personajes sin nombre y se rellenan los
  campos que falten con valores por defecto (`??`, `||`, `?.`).
- Las tarjetas se crean con `createElement` y `textContent`, nunca con
  `innerHTML`, para evitar XSS.

## Uso de IA
Usé Claude Code (VS Code) como pareja de programación. Le pedí que analizara
el Tema 2 de mis apuntes, propusiera APIs públicas y montara el proyecto con el
código más sencillo posible, separado en módulos y con un commit por paso.
Verifiqué el código leyéndolo y probando la app en el navegador.
