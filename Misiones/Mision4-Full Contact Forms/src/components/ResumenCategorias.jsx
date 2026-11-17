import useDominios from '../hooks/useDominios.js';
import { CATEGORIAS } from '../constantes.js';
import './ResumenCategorias.css';

// Cuenta cuántos dominios de la lista son de una categoría
function contar(dominios, categoria) {
  return dominios.filter((registro) => registro.categoria === categoria).length;
}

// Contadores de la lista completa: total y uno por categoría (siempre de todas, aunque el filtro esté puesto)
export default function ResumenCategorias() {
  const { data } = useDominios('');

  // Mientras carga o si falla no enseña nada: de eso ya avisa el listado
  if (!data) return null;
  // Solo cuenta los registros válidos (los corruptos ya los descartó la capa de servicios)
  const { dominios } = data;

  return (
    <ul className="resumen" aria-label="Dominios bloqueados por categoría">
      <li className="resumen-total">
        <strong>{dominios.length}</strong> en total
      </li>
      {CATEGORIAS.map((categoria) => (
        <li key={categoria}>
          <strong>{contar(dominios, categoria)}</strong> {categoria}
        </li>
      ))}
    </ul>
  );
}
