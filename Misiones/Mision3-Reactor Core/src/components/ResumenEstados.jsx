import { contarPorEstado, textoEstado } from '../logic.js';
import './ResumenEstados.css';

// Resumen «Vivo: 3 · Muerto: 1»; la cuenta se deriva en cada render, no se guarda en estado
export default function ResumenEstados({ personajes }) {
  const cuenta = contarPorEstado(personajes);

  return (
    <p className="resumen">{personajes.length} en esta página —{' '}
      {Object.entries(cuenta).map(([estado, total]) => (
        <span key={estado}>
          {textoEstado(estado)}: {total}
        </span>
      ))}
    </p>
  );
}
