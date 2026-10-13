// Todo lo que toca el DOM: los estados de carga, error y vacío, y las tarjetas
const estado = document.querySelector('#estado');
const resumen = document.querySelector('#resumen');
const lista = document.querySelector('#lista');

const TEXTO_ESTADO = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' };

function limpiar() {
  estado.className = '';
  estado.replaceChildren();
  resumen.textContent = '';
  lista.replaceChildren();
}

export function mostrarCargando() {
  limpiar();
  estado.textContent = 'Cargando personajes…';
}

export function mostrarVacio() {
  limpiar();
  estado.textContent = 'No hay ningún personaje con esos filtros.';
}

export function mostrarError(mensaje, alReintentar) {
  limpiar();
  estado.className = 'error';
  const boton = document.createElement('button');
  boton.textContent = 'Reintentar';
  boton.addEventListener('click', alReintentar);
  estado.append(`⚠ ${mensaje} `, boton);
}

export function mostrarPersonajes(personajes, cuenta) {
  limpiar();
  resumen.textContent = Object.entries(cuenta)
    .map(([clave, total]) => `${TEXTO_ESTADO[clave] ?? clave}: ${total}`)
    .join(' · ');
  lista.replaceChildren(...personajes.map(crearTarjeta));
}

// Se usa textContent en vez de innerHTML para no abrir la puerta al XSS
function crearTarjeta(personaje) {
  const tarjeta = document.createElement('li');
  tarjeta.className = 'tarjeta';

  const imagen = document.createElement('img');
  imagen.src = personaje.imagen;
  imagen.alt = personaje.nombre;

  const nombre = document.createElement('h2');
  nombre.textContent = personaje.nombre;

  const info = document.createElement('p');
  info.dataset.estado = personaje.estado;
  info.textContent = `${TEXTO_ESTADO[personaje.estado] ?? personaje.estado} · ${personaje.especie}`;

  tarjeta.append(imagen, nombre, info);
  return tarjeta;
}
