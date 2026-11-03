import { useState } from 'react';
import { textoEstado } from '../logic.js';
import './TarjetaPersonaje.css';

// Tarjeta de un personaje: imagen, nombre, estado y botón para marcarlo como favorito
export default function TarjetaPersonaje({ personaje, esFavorito, alAlternarFavorito }) {
  const [imagenRota, setImagenRota] = useState(false);
  // Sin URL o con la imagen rota se pinta un hueco: así nunca hay un <img> con src vacío
  const sinImagen = imagenRota || personaje.imagen === '';
  const etiqueta = esFavorito
    ? 'Quitar ' + personaje.nombre + ' de favoritos'
    : 'Añadir ' + personaje.nombre + ' a favoritos';

  return (
    <li className="tarjeta">
      {sinImagen ? (
        <div className="sin-imagen">Sin imagen</div>
      ) : (
        <img src={personaje.imagen} alt={personaje.nombre} onError={() => setImagenRota(true)} />
      )}
      <h2>{personaje.nombre}</h2>
      <p data-estado={personaje.estado}>
        {textoEstado(personaje.estado)} · {personaje.especie}
      </p>
      <button
        type="button"
        className={esFavorito ? 'estrella favorito' : 'estrella'}
        aria-pressed={esFavorito}
        aria-label={etiqueta}
        onClick={() => alAlternarFavorito(personaje)}
      >
        {esFavorito ? '★' : '☆'}
      </button>
    </li>
  );
}
