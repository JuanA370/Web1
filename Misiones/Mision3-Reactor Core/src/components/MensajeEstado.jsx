import './MensajeEstado.css';

// Mensaje de carga, vacío o error; solo el de error trae el botón Reintentar
export default function MensajeEstado({ tipo, texto, alReintentar }) {
  return (
    <p className={'mensaje ' + tipo} role={tipo === 'error' ? 'alert' : 'status'}>
      {texto}
      {tipo === 'error' && (
        <button type="button" onClick={alReintentar}>
          Reintentar
        </button>
      )}
    </p>
  );
}
