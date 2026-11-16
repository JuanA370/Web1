import useDominios from '../hooks/useDominios.js';
import useQuitarDominio from '../hooks/useQuitarDominio.js';
import './ListaDominios.css';

// Muestra los dominios bloqueados de la categoría elegida y avisa mientras se cargan o si la petición falla
export default function ListaDominios({ categoria }) {
  const { data: dominios, isPending, isError, error, refetch, isFetching } = useDominios(categoria);
  const quitar = useQuitarDominio();

  // Pide confirmación antes de borrar, porque quitar un dominio no se puede deshacer
  function pedirQuitar(registro) {
    if (window.confirm(`¿Quitar ${registro.dominio} de la lista de bloqueo?`)) {
      quitar.mutate(registro.id);
    }
  }

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
    <>
      {quitar.isError && <p role="alert" className="error">{quitar.error.message}</p>}
      <ul className="lista-dominios">
        {dominios.map((registro) => (
          <li key={registro.id} className="dominio">
            <div className="dominio-cabecera">
              <span className="dominio-nombre">{registro.dominio}</span>
              <span className="dominio-categoria">{registro.categoria}</span>
            </div>
            <p className="dominio-motivo">{registro.motivo}</p>
            <div className="dominio-pie">
              <small className="dominio-detalle">
                Detectado el {registro.fechaDeteccion} ·{' '}
                {registro.alcance === 'subdominios' ? 'incluye sus subdominios' : 'solo este dominio'}
              </small>
              <button
                type="button"
                className="boton-quitar"
                onClick={() => pedirQuitar(registro)}
                disabled={quitar.isPending}
                aria-label={`Quitar ${registro.dominio} de la lista`}
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
