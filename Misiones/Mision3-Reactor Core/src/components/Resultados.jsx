import MensajeEstado from './MensajeEstado.jsx';
import ResumenEstados from './ResumenEstados.jsx';
import ListaPersonajes from './ListaPersonajes.jsx';

// Decide qué se ve: carga, error, vacío o el resumen con las tarjetas
export default function Resultados({
  fase,
  error,
  personajes,
  favoritos,
  textoVacio,
  alAlternarFavorito,
  alReintentar,
}) {
  if (fase === 'cargando') {
    return <MensajeEstado tipo="cargando" texto="Cargando personajes…" />;
  }
  if (fase === 'error') {
    return <MensajeEstado tipo="error" texto={'⚠ ' + error} alReintentar={alReintentar} />;
  }
  if (personajes.length === 0) {
    return <MensajeEstado tipo="vacio" texto={textoVacio} />;
  }

  return (
    <>
      <ResumenEstados personajes={personajes} />
      <ListaPersonajes
        personajes={personajes}
        favoritos={favoritos}
        alAlternarFavorito={alAlternarFavorito}
      />
    </>
  );
}
