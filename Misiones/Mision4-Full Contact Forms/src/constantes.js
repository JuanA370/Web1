// ---------- Constantes ----------
// Categorías de dominios que se pueden bloquear (las usa el formulario y, más adelante, el filtro)
export const CATEGORIAS = ['publicidad', 'rastreo', 'ventanas emergentes', 'malware'];

// Alcance del bloqueo: el valor que se guarda en el API y el texto que ve el usuario
export const ALCANCES = [
  { valor: 'solo', texto: 'Solo este dominio' },
  { valor: 'subdominios', texto: 'También sus subdominios' },
];
