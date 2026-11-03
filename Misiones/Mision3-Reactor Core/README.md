# Buscador de Rick and Morty

Misión M3 · Reactor Core — Web Development I.

## Cómo probarlo
Ejecuta npm install y npm run dev, y abre la dirección que muestra
Vite (normalmente http://localhost:5173). Es el buscador de la M2 hecho
con React 19: busca por nombre y estado, enseña un resumen por estado y
desactiva «Buscar» mientras carga. La estrella de cada tarjeta la marca
como favorita; los favoritos siguen ahí al recargar y el botón
«Favoritos» enseña solo esos. Prueba un nombre que no existe (sale que
no hay resultados) y quita la conexión para ver el error con
«Reintentar». npm run lint pasa el linter y npm run build genera dist.

## Uso de IA
Usé Claude Code como orquestador: yo le pedía la tarea y él la
repartía entre subagentes, cada uno con su encargo por escrito. Mi
prompt real (fragmentos literales): "mira como se estructura en el
readme general e hijo cada entrega", "hazla con subagentes", "en el uso
de IA la harás tú, tu diras que prompt has usado en cada agente" y
"harás con otro subagente un test para verificar que está todo bien y
como mandaste". Antes le pedí revisar las correcciones de M1 y M2 en la
Arena y preparar las preguntas probables de la defensa.

Primera frase literal del encargo de cada agente:
1. Analista: "Analiza cómo está organizado mi repositorio de la
   asignatura para que la Misión 3 encaje igual que las anteriores."
2. Inventario: "Haz inventario de lo que hay que tener en cuenta para
   la Misión 3 (React 19)."
3. Integrador: "Diseña la Misión 3 «Reactor Core» (mi app de la M2
   rehecha en React 19) para que la construyan varios agentes en
   paralelo, directamente en mi repo y con su estructura." Claude le
   fijó CSS por componente y ESLint como en clase, y el timeout con
   setTimeout en vez de AbortSignal.any.
4. Lógica: "Escribe el bloque B1 de la Misión 3" (api.js, logic.js y
   los hooks).
5. Componentes: "Escribe el bloque B2 de la Misión 3" (index.html,
   main.jsx, App.jsx y componentes con su CSS).
6. Configuración: "Escribe el bloque B3 de la Misión 3" (package.json,
   configs, este README con la Autopsia y la entrada en el general).
7. Test: "Verifica la Misión 3 que han construido otros agentes."

Prácticamente todo el código y el texto de este README los escribieron
los agentes; esta sección la escribió Claude con los prompts reales.
La verificación también la hicieron ellos: npm run lint sin avisos,
npm run build, pruebas en el navegador (búsqueda, nombre inexistente,
favoritos tras recargar, error con «Reintentar», timeout) y una prueba
aparte que confirma que el linter marca un setState dentro del
useEffect, lo que cuento en la primera decisión de la Autopsia.

## Autopsia
1. La fase (cargando, listo o error) no es un estado aparte: en
   usePersonajes la calculo comparando la clave de la búsqueda actual
   (nombre, estado e intento) con la clave del último resultado que ha
   llegado, y si no coinciden es que todavía está cargando. Descarté
   tener un setFase y llamar a setFase('cargando') al principio del
   useEffect porque el linter de los hooks avisa de los set que se
   hacen dentro del efecto sin esperar a nada (provocan un render de
   más), y además tendría que mantener a la vez tres estados que en
   realidad salen de uno.
2. El tiempo máximo lo controlo con un setTimeout que llama a
   controlador.abort() a los 8 segundos, y en el cleanup del efecto
   hago clearTimeout y abort. Así, si cambio la búsqueda antes de que
   llegue la respuesta, la petición vieja se cancela y no pisa a la
   nueva. Descarté AbortSignal.timeout(8000), que usé en la M2, porque
   aquí necesito un único signal que sirva para cancelar y para caducar,
   y juntar los dos pedía AbortSignal.any, que no hemos visto. Para
   saber cuál de los dos ha pasado uso la variable caducada.
3. En localStorage guardo los favoritos como objetos completos (id,
   nombre, imagen, estado y especie) en vez de guardar solo los ids.
   Descarté los ids porque para enseñar la vista Favoritos tendría que
   volver a pedir cada personaje a la API, y sin conexión no saldría
   nada. Ocupa un poco más, pero son pocos personajes y así la vista
   funciona sin hacer ninguna petición.
