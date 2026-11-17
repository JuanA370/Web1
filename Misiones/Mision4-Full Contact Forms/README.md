# Lista de bloqueo

Misión M4 · Full Contact Forms — Web Development I.

## Cómo probarlo
Ejecuta npm install y copia el archivo .env.example como .env (lleva la
dirección del API, http://localhost:3001). Después abre dos terminales
en esta carpeta: en una npm run api, que arranca json-server con los
datos de db.json, y en la otra npm run dev, y abre la dirección que
muestra Vite (normalmente http://localhost:5173).

Es una lista de bloqueo de dominios de publicidad y rastreo. A la
izquierda hay un formulario para añadir un dominio (con React Hook Form
y Zod) y a la derecha la lista que llega del API (con TanStack Query),
con un filtro por categoría, contadores y un botón para quitar cada
dominio. Abajo sale la lista en formato hosts, lista para pegarla en el
archivo hosts del equipo y que esos dominios dejen de cargar.

Qué probar:
- Pulsa «Añadir a la lista» con el formulario vacío: cada campo enseña
  su error, el cursor salta al primero y no se envía nada al API.
- Escribe https://ads.ejemplo.com, campus.u-tad.com (está protegido) o
  una fecha futura, y elige malware con «Solo este dominio».
- Añade doubleclick.net otra vez (aunque sea en mayúsculas): avisa de
  que ya está en la lista y no lo guarda.
- Añade un dominio válido: se guarda, el formulario se vacía y aparece
  en la lista y en los contadores sin recargar la página.
- Cambia el filtro, quita un dominio y para json-server para ver el
  error con «Reintentar».
- Bonus: db.json trae a propósito un registro roto (el 7, con el
  dominio como número y sin categoría). La lista lo descarta y avisa de
  «1 registro del API descartado por datos corruptos».

Las altas y las bajas se guardan en db.json; para volver a los datos
iniciales, git checkout db.json. npm run lint pasa el linter y
npm run build genera dist. json-server no sale en el material de la
U4 (que usa JSONPlaceholder): lo elegí porque guarda lo que envías, así
que se ve que la lista se actualiza al registrar, y solo hace falta en
desarrollo.

## Uso de IA
Usé Claude Code para el código. En cada paso escribía el código, lo
probaba y me lo explicaba línea a línea antes de seguir. Las decisiones
fueron mías: el tema de la app, usar json-server y el orden de trabajo.

Prompt real: "No, vas a ir paso a paso y yo voy a tener que ir
entendiendo que has hecho en cada paso poco a poco y vas a ir haciendo
push de cada cosa".

Cómo se verificó: npm run lint, npm run build y pruebas en el
navegador en cada paso. Yo revisé cada commit con su explicación y
pregunté lo que no entendía.

No escribí código a mano.

## Autopsia
1. Validé la respuesta del API con safeParse registro a registro en
   vez de con parse de la lista entera. Descarté parse porque un solo
   registro roto tiraría toda la lista.
2. Compruebo si un dominio está repetido con un GET antes del POST en
   vez de con un refine de Zod. Descarté el refine porque Zod valida en
   cada cambio y llamaría al API con cada tecla.
