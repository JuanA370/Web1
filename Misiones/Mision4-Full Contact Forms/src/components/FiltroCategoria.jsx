import { CATEGORIAS } from '../constantes.js';
import './FiltroCategoria.css';

// Desplegable para ver solo los dominios de una categoría; avisa al padre de cada cambio
export default function FiltroCategoria({ categoria, alCambiar }) {
  return (
    <div className="filtro">
      <label htmlFor="filtro-categoria">Mostrar</label>
      <select
        id="filtro-categoria"
        value={categoria}
        onChange={(evento) => alCambiar(evento.target.value)}
      >
        <option value="">Todas las categorías</option>
        {CATEGORIAS.map((opcion) => (
          <option key={opcion} value={opcion}>{opcion}</option>
        ))}
      </select>
    </div>
  );
}
