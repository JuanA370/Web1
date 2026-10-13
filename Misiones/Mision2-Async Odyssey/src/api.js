// Solo se encarga de hablar con la API de Rick and Morty
const URL_BASE = 'https://rickandmortyapi.com/api/character';

export async function buscarPersonajes(nombre, estado) {
  const parametros = new URLSearchParams();
  if (nombre) parametros.set('name', nombre);
  if (estado) parametros.set('status', estado);

  // Si la API tarda más de 8 segundos, se cancela la petición
  const respuesta = await fetch(`${URL_BASE}?${parametros}`, {
    signal: AbortSignal.timeout(8000),
  });

  // La API responde 404 cuando no encuentra a nadie: no es un error, es una lista vacía
  if (respuesta.status === 404) return [];
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);

  const datos = await respuesta.json();
  return datos.results ?? [];
}
