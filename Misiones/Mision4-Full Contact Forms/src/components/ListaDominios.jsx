import useDominios from '../hooks/useDominios.js';
import './ListaDominios.css';

// Muestra los dominios bloqueados y avisa mientras se cargan o si la petición falla
export default function ListaDominios() {
  const { data: dominios, isPending, isError, error, refetch } = useDominios();

  if (isPending) return <p role="status">Cargando dominios…</p>;

  if (isError) {
    return (
      <div role="alert" className="error">
        <p>{error.message}</p>
        <button type="button" onClick={() => refetch()}>Reintentar</button>
      </div>
    );
  }

  if (dominios.length === 0) {
    return <p>La lista está vacía: todavía no has bloqueado ningún dominio.</p>;
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
