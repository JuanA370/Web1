import { useState } from 'react';
import FormularioDominio from './components/FormularioDominio.jsx';
import ResumenCategorias from './components/ResumenCategorias.jsx';
import FiltroCategoria from './components/FiltroCategoria.jsx';
import ListaDominios from './components/ListaDominios.jsx';
import './App.css';

// Componente raíz: coloca las dos zonas de la página y guarda la categoría elegida en el filtro
export default function App() {
  // '' significa «todas las categorías»
  const [categoria, setCategoria] = useState('');

  return (
    <main>
      <header className="cabecera">
        <h1>Lista de bloqueo</h1>
        <p className="subtitulo">
          Dominios de publicidad y rastreo que no queremos volver a ver en la red.
        </p>
      </header>

      <div className="zonas">
        <section className="zona" aria-labelledby="titulo-registro">
          <h2 id="titulo-registro">Añadir un dominio</h2>
          <FormularioDominio />
        </section>

        <section className="zona" aria-labelledby="titulo-lista">
          <h2 id="titulo-lista">Dominios bloqueados</h2>
          <ResumenCategorias />
          <FiltroCategoria categoria={categoria} alCambiar={setCategoria} />
          <ListaDominios categoria={categoria} />
        </section>
      </div>
    </main>
  );
}
