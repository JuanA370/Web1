// Funciones que transforman los datos de la API antes de pintarlos (sin React y sin fetch)

// ---------- Constantes ----------
// Las claves son las mismas que usa la API en minúsculas, el <select> y el CSS (data-estado)
export const ESTADOS = {
  alive: 'Vivo',
  dead: 'Muerto',
  unknown: 'Desconocido',
};

// Pasa el estado de la API ('Alive', 'Dead', 'unknown'...) a una de las claves de ESTADOS
function normalizarEstado(status) {
  const estado = String(status ?? '').toLowerCase();
  return Object.keys(ESTADOS).includes(estado) ? estado : 'unknown';
}

// Se queda solo con lo que se va a mostrar y rellena los datos que falten
export function limpiarPersonajes(lista) {
  return lista
    .filter((personaje) => personaje?.id && personaje?.name)
    .map((personaje) => ({
      id: personaje.id,
      nombre: personaje.name,
      imagen: personaje.image ?? '',
      estado: normalizarEstado(personaje.status),
      especie: personaje.species || 'Desconocida',
    }));
}

// Cuenta cuántos personajes hay de cada estado: { alive: 3, dead: 1 }
export function contarPorEstado(personajes) {
  return personajes.reduce((cuenta, personaje) => {
    cuenta[personaje.estado] = (cuenta[personaje.estado] ?? 0) + 1;
    return cuenta;
  }, {});
}

// Texto en español del estado para enseñarlo en pantalla
export function textoEstado(estado) {
  return ESTADOS[estado] ?? ESTADOS.unknown;
}

// Traduce el error de la petición a un mensaje que entienda el usuario
export function mensajeDeError(fallo, caducada) {
  // Si la cortó el temporizador, fetch lanza un AbortError: por eso el hook avisa con caducada
  if (caducada) return 'La API tardó demasiado';
  // fetch lanza TypeError cuando no llega a conectar (sin internet, servidor caído)
  if (fallo instanceof TypeError) return 'Sin conexión con la API';
  return `La API respondió con un error (${fallo.message})`;
}
