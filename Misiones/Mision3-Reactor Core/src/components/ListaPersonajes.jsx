import TarjetaPersonaje from './TarjetaPersonaje.jsx';
import './ListaPersonajes.css';

// Cuadrícula de tarjetas; la key es el id para que React no confunda tarjetas al filtrar
export default function ListaPersonajes({ personajes, favoritos, alAlternarFavorito }) {
  return (
    <ul className="lista">
      {personajes.map((personaje) => (
        <TarjetaPersonaje
          key={personaje.id}
          personaje={personaje}
          esFavorito={favoritos.some((favorito) => favorito.id === personaje.id)}
          alAlternarFavorito={alAlternarFavorito}
        />
      ))}
    </ul>
  );
}
