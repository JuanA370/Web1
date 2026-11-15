// ---------- Constantes ----------
// La URL del API sale del archivo .env (ver .env.example) para no escribirla a fuego en el código
const API_URL = import.meta.env.VITE_API_URL;
const TEXTO_SIN_CONEXION = 'No se pudo conectar con el API. ¿Está arrancado json-server (npm run api)?';

// Pide al API la lista de dominios bloqueados y devuelve el array que llega en el JSON
export async function obtenerDominios() {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/dominios`);
  } catch {
    // fetch solo falla aquí si no hay conexión: lo traducimos a un mensaje que entienda el usuario
    throw new Error(TEXTO_SIN_CONEXION);
  }
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status} al pedir los dominios`);
  return respuesta.json();
}
