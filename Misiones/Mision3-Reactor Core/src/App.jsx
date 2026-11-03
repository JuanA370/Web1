import { useState } from 'react';
import usePersonajes from './hooks/usePersonajes.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import FormularioFiltros from './components/FormularioFiltros.jsx';
import BotonFavoritos from './components/BotonFavoritos.jsx';
import Resultados from './components/Resultados.jsx';
import './App.css';

// ---------- Constantes ----------
const TEXTO_SIN_RESULTADOS = 'No hay ningún personaje con esos filtros.';
const TEXTO_SIN_FAVORITOS = 'Aún no has marcado favoritos.';

// Componente raíz: guarda los filtros y los favoritos y reparte los datos a los hijos
export default function App() {
  const [filtros, setFiltros] = useState({ nombre: '', estado: '' });
  const [verFavoritos, setVerFavoritos] = useState(false);
  const [favoritos, setFavoritos] = useLocalStorage('rm-favoritos', []);
  const { personajes, fase, error, reintentar } = usePersonajes(filtros.nombre, filtros.estado);
  // Valores derivados: se calculan en cada render en vez de guardarlos en estado
  const lista = verFavoritos ? favoritos : personajes;
  const faseVista = verFavoritos ? 'listo' : fase;
  const textoVacio = verFavoritos ? TEXTO_SIN_FAVORITOS : TEXTO_SIN_RESULTADOS;

  function buscar(nombre, estado) {
    setFiltros({ nombre: nombre.trim(), estado });
    setVerFavoritos(false);
  }

  // Si el personaje ya está en favoritos lo quita y si no lo añade (se compara por id)
  function alternarFavorito(personaje) {
    setFavoritos((anteriores) => {
      const yaEsta = anteriores.some((favorito) => favorito.id === personaje.id);
      if (yaEsta) return anteriores.filter((favorito) => favorito.id !== personaje.id);
      return [...anteriores, personaje];
    });
  }

  return (
    <main>
      <h1>Buscador de Rick and Morty</h1>
      <FormularioFiltros cargando={fase === 'cargando'} alBuscar={buscar} />
      <BotonFavoritos
        total={favoritos.length}
        activo={verFavoritos}
        alAlternar={() => setVerFavoritos((activo) => !activo)}
      />
      <Resultados
        fase={faseVista}
        error={error}
        personajes={lista}
        favoritos={favoritos}
        textoVacio={textoVacio}
        alAlternarFavorito={alternarFavorito}
        alReintentar={reintentar}
      />
    </main>
  );
}
