import { z } from 'zod';
import { CATEGORIAS, ALCANCES } from '../constantes.js';

// ---------- Constantes ----------
// Trozos de letras, números o guiones separados por puntos y una terminación de 2 letras o más (sin http:// ni rutas)
const FORMATO_DOMINIO = /^([a-z0-9-]+\.)+[a-z]{2,}$/i;
// Dominios que no se pueden bloquear aunque alguien los añada por error (ni ellos ni sus subdominios)
const DOMINIOS_PROTEGIDOS = ['u-tad.com'];
const MINIMO_MOTIVO = 10;
const VALORES_ALCANCE = ALCANCES.map((alcance) => alcance.valor);

// Devuelve la fecha de hoy en formato AAAA-MM-DD (el mismo que da el input type="date"), en hora local
function hoy() {
  const ahora = new Date();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  return `${ahora.getFullYear()}-${mes}-${dia}`;
}

// Indica si el dominio es uno de los protegidos o un subdominio suyo (p. ej. campus.u-tad.com)
function esProtegido(dominio) {
  const enMinusculas = dominio.toLowerCase();
  return DOMINIOS_PROTEGIDOS.some(
    (protegido) => enMinusculas === protegido || enMinusculas.endsWith(`.${protegido}`)
  );
}

// Esquema del formulario: única fuente de verdad de lo que es un dominio válido para la lista
export const esquemaDominio = z
  .object({
    dominio: z
      .string()
      .min(1, 'Escribe el dominio que quieres bloquear')
      .refine((valor) => FORMATO_DOMINIO.test(valor), {
        error: 'Escribe solo el dominio, sin http:// ni rutas (p. ej. ads.ejemplo.com)',
      })
      .refine((valor) => !esProtegido(valor), {
        error: 'Ese dominio está protegido y no se puede bloquear',
      }),
    categoria: z.string().refine((valor) => CATEGORIAS.includes(valor), {
      error: 'Elige una categoría',
    }),
    alcance: z.string().refine((valor) => VALORES_ALCANCE.includes(valor), {
      error: 'Elige el alcance del bloqueo',
    }),
    motivo: z.string().min(MINIMO_MOTIVO, `Explica el motivo con al menos ${MINIMO_MOTIVO} caracteres`),
    fechaDeteccion: z
      .string()
      .min(1, 'Indica cuándo lo detectaste')
      .refine((fecha) => fecha <= hoy(), { error: 'La fecha no puede ser futura' }),
    comprobado: z.literal(true, { error: 'Marca la casilla para confirmar que lo has comprobado' }),
  })
  // Regla que cruza dos campos: el malware cambia de subdominio, así que se bloquea con todos ellos
  .refine((datos) => datos.categoria !== 'malware' || datos.alcance === 'subdominios', {
    error: 'Un dominio de malware se bloquea siempre con sus subdominios',
    path: ['alcance'],
  });

// Esquema de cada dominio que llega del API: comprueba que el servidor manda lo que la app espera antes de pintarlo
export const esquemaRespuestaDominio = z.object({
  id: z.number(),
  dominio: z.string(),
  categoria: z.string().refine((valor) => CATEGORIAS.includes(valor)),
  alcance: z.string().refine((valor) => VALORES_ALCANCE.includes(valor)),
  motivo: z.string(),
  fechaDeteccion: z.string(),
  fechaAlta: z.string(),
});
