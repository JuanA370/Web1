import { useState } from 'react';
import { ESTADOS } from '../logic.js';
import './FormularioFiltros.css';

// Formulario de búsqueda: guarda un borrador local y solo avisa a App al pulsar Buscar
export default function FormularioFiltros({ cargando, alBuscar }) {
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('');

  function enviar(evento) {
    evento.preventDefault();
    alBuscar(nombre, estado);
  }

  return (
    <form className="filtros" onSubmit={enviar}>
      <input
        type="search"
        placeholder="Nombre (ej. Rick)"
        aria-label="Nombre del personaje"
        value={nombre}
        onChange={(evento) => setNombre(evento.target.value)}
      />
      <select
        aria-label="Estado del personaje"
        value={estado}
        onChange={(evento) => setEstado(evento.target.value)}
      >
        <option value="">Todos</option>
        {Object.entries(ESTADOS).map(([clave, texto]) => (
          <option key={clave} value={clave}>
            {texto}
          </option>
        ))}
      </select>
      <button type="submit" disabled={cargando}>
        {cargando ? 'Buscando…' : 'Buscar'}
      </button>
    </form>
  );
}
