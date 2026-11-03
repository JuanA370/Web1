import './BotonFavoritos.css';

// Botón que cambia entre los resultados de la búsqueda y la lista de favoritos
export default function BotonFavoritos({ total, activo, alAlternar }) {
  return (
    <button type="button" className="boton-favoritos" aria-pressed={activo} onClick={alAlternar}>
      ★ Favoritos ({total})
    </button>
  );
}
