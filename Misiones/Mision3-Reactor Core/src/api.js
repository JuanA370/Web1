// Solo se encarga de hablar con la API de Rick and Morty

// ---------- Constantes ----------
const URL_BASE = 'https://rickandmortyapi.com/api/character';

// Pide a la API los personajes que coinciden con el nombre y el estado
export async function buscarPersonajes(nombre, estado, signal) {
  const parametros = new URLSearchParams();
  if (nombre) parametros.set('name', nombre);
  if (estado) parametros.set('status', estado);

  // El signal lo pone el hook: con él cancela la petición si cambian los filtros o si tarda demasiado
  const respuesta = await fetch(`${URL_BASE}?${parametros}`, { signal });

  // La API responde 404 cuando no encuentra a nadie: no es un error, es una lista vacía
  if (respuesta.status === 404) return [];
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);

  const datos = await respuesta.json();
  return datos.results ?? [];
}
