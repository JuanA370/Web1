import './App.css';

// Componente raíz: de momento solo coloca las dos zonas de la página (registro y listado)
export default function App() {
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
          <p className="pendiente">Aquí irá el formulario de registro.</p>
        </section>

        <section className="zona" aria-labelledby="titulo-lista">
          <h2 id="titulo-lista">Dominios bloqueados</h2>
          <p className="pendiente">Aquí irá el listado que llega del API.</p>
        </section>
      </div>
    </main>
  );
}
