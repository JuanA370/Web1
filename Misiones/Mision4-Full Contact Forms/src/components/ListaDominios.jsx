import useDominios from '../hooks/useDominios.js';
import './ListaDominios.css';

// Muestra los dominios bloqueados de la categoría elegida y avisa mientras se cargan o si la petición falla
export default function ListaDominios({ categoria }) {
  const { data: dominios, isPending, isError, error, refetch, isFetching } = useDominios(categoria);

  if (isPending) return <p role="status">Cargando dominios…</p>;

  if (isError) {
    return (
      <div role="alert" className="error">
        <p>{error.message}</p>
        <button type="button" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Reintentando…' : 'Reintentar'}
        </button>
      </div>
    );
  }

  if (dominios.length === 0) {
    return (
      <p>
        {categoria
          ? `No hay dominios de la categoría «${categoria}».`
          : 'La lista está vacía: todavía no has bloqueado ningún dominio.'}
      </p>
    );
  }

  return (
    <ul className="lista-dominios">
      {dominios.map((registro) => (
        <li key={registro.id} className="dominio">
          <div className="dominio-cabecera">
            <span className="dominio-nombre">{registro.dominio}</span>
            <span className="dominio-categoria">{registro.categoria}</span>
          </div>
          <p className="dominio-motivo">{registro.motivo}</p>
          <small className="dominio-detalle">
            Detectado el {registro.fechaDeteccion} ·{' '}
            {registro.alcance === 'subdominios' ? 'incluye sus subdominios' : 'solo este dominio'}
          </small>
        </li>
      ))}
    </ul>
  );
}
