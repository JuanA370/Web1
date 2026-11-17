import { esquemaRespuestaDominio } from '../schemas/dominio.js';

// ---------- Constantes ----------
// La URL del API sale del archivo .env (ver .env.example) para no escribirla a fuego en el código
const API_URL = import.meta.env.VITE_API_URL;
const TEXTO_SIN_CONEXION = 'No se pudo conectar con el API. ¿Está arrancado json-server (npm run api)?';

// Separa los registros que cumplen el esquema de los corruptos: safeParse no lanza error, devuelve success true o false
function separarValidos(lista) {
  const dominios = [];
  let descartados = 0;
  for (const registro of lista) {
    const resultado = esquemaRespuestaDominio.safeParse(registro);
    if (resultado.success) {
      dominios.push(resultado.data);
    } else {
      descartados++;
    }
  }
  return { dominios, descartados };
}

// Pide al API la lista de dominios bloqueados (todos, o solo los de una categoría si se indica)
// y devuelve { dominios, descartados }: solo los registros válidos y cuántos venían corruptos
export async function obtenerDominios(categoria) {
  // json-server filtra por cualquier campo con ?campo=valor
  const filtro = categoria ? `?categoria=${encodeURIComponent(categoria)}` : '';
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/dominios${filtro}`);
  } catch {
    // fetch solo falla aquí si no hay conexión: lo traducimos a un mensaje que entienda el usuario
    throw new Error(TEXTO_SIN_CONEXION);
  }
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status} al pedir los dominios`);
  const lista = await respuesta.json();
  if (!Array.isArray(lista)) throw new Error('El API no ha devuelto una lista de dominios');
  return separarValidos(lista);
}

// Pregunta al API si el dominio ya está en la lista (json-server filtra con ?dominio=)
async function existeDominio(dominio) {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/dominios?dominio=${encodeURIComponent(dominio)}`);
  } catch {
    throw new Error(TEXTO_SIN_CONEXION);
  }
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status} al comprobar el dominio`);
  const coincidencias = await respuesta.json();
  return coincidencias.length > 0;
}

// Envía al API un dominio nuevo (POST) y devuelve el registro guardado, ya con su id
export async function crearDominio(datos) {
  // Solo se guardan los campos del dominio: la casilla «comprobado» es una confirmación del formulario.
  // El dominio se guarda en minúsculas para que ADS.ejemplo.com y ads.ejemplo.com cuenten como el mismo
  const nuevo = {
    dominio: datos.dominio.toLowerCase(),
    categoria: datos.categoria,
    alcance: datos.alcance,
    motivo: datos.motivo,
    fechaDeteccion: datos.fechaDeteccion,
    fechaAlta: new Date().toISOString(),
  };
  if (await existeDominio(nuevo.dominio)) {
    throw new Error(`${nuevo.dominio} ya está en la lista de bloqueo`);
  }
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/dominios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
  } catch {
    throw new Error(TEXTO_SIN_CONEXION);
  }
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}: no se pudo guardar el dominio`);
  return respuesta.json();
}

// Quita un dominio de la lista (DELETE) a partir de su id
export async function quitarDominio(id) {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}/dominios/${id}`, { method: 'DELETE' });
  } catch {
    throw new Error(TEXTO_SIN_CONEXION);
  }
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}: no se pudo quitar el dominio`);
}
