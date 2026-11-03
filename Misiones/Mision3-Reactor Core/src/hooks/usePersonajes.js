// Hook que busca personajes en la API cada vez que cambian los filtros
import { useEffect, useState } from 'react';
import { buscarPersonajes } from '../api.js';
import { limpiarPersonajes, mensajeDeError } from '../logic.js';

// ---------- Constantes ----------
const TIEMPO_MAXIMO_MS = 8000;

// La fase no se guarda en el estado: se calcula en cada render a partir de la respuesta
function calcularFase(terminada, error) {
  if (!terminada) return 'cargando';
  return error ? 'error' : 'listo';
}

export default function usePersonajes(nombre, estado) {
  // Guarda a qué búsqueda (clave) pertenece la última respuesta
  const [resultado, setResultado] = useState({ clave: '', personajes: [], error: '' });
  // Solo sirve para repetir la misma búsqueda al pulsar «Reintentar»
  const [intento, setIntento] = useState(0);
  const clave = `${nombre}|${estado}|${intento}`;

  useEffect(() => {
    const controlador = new AbortController();
    let cancelada = false;
    let caducada = false;
    const temporizador = setTimeout(() => {
      caducada = true;
      controlador.abort();
    }, TIEMPO_MAXIMO_MS);

    async function cargar() {
      try {
        const datos = limpiarPersonajes(await buscarPersonajes(nombre, estado, controlador.signal));
        if (cancelada) return;
        setResultado({ clave, personajes: datos, error: '' });
      } catch (fallo) {
        // Si la hemos cancelado nosotros (nueva búsqueda o desmontaje) no es un error que enseñar
        if (cancelada) return;
        setResultado({ clave, personajes: [], error: mensajeDeError(fallo, caducada) });
      } finally {
        clearTimeout(temporizador);
      }
    }

    cargar();
    // Al cambiar los filtros se cancela la petición anterior, así nunca se pinta una respuesta vieja
    return () => {
      cancelada = true;
      clearTimeout(temporizador);
      controlador.abort();
    };
  }, [nombre, estado, intento, clave]);

  // Si la respuesta guardada es de otra búsqueda, la actual todavía está cargando
  const terminada = resultado.clave === clave;
  const fase = calcularFase(terminada, resultado.error);
  const personajes = terminada ? resultado.personajes : [];
  const error = terminada ? resultado.error : '';
  const reintentar = () => setIntento((anterior) => anterior + 1);

  return { personajes, fase, error, reintentar };
}
