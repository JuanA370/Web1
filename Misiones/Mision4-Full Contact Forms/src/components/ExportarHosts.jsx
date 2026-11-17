import useDominios from '../hooks/useDominios.js';
import './ExportarHosts.css';

// Convierte la lista en el texto de un archivo hosts: 0.0.0.0 manda el dominio a una dirección que no existe
function textoHosts(dominios) {
  const cabecera = `# Lista de bloqueo · ${dominios.length} dominios`;
  const lineas = dominios.map((registro) => `0.0.0.0 ${registro.dominio}`);
  return [cabecera, ...lineas].join('\n');
}

// Muestra la lista completa en formato hosts para copiarla y bloquear de verdad esos dominios en el equipo
export default function ExportarHosts() {
  const { data } = useDominios('');

  if (!data || data.dominios.length === 0) return null;
  // Solo se exportan los registros válidos: un dato corrupto nunca llega al archivo hosts
  const { dominios } = data;

  return (
    <section className="zona exportar" aria-labelledby="titulo-exportar">
      <h2 id="titulo-exportar">Exportar en formato hosts</h2>
      <p className="ayuda">
        Copia estas líneas al final del archivo hosts de tu equipo (en Windows,
        C:\Windows\System32\drivers\etc\hosts) y el navegador dejará de cargar esos dominios.
        El archivo hosts no admite comodines: los subdominios hay que añadirlos uno a uno.
      </p>
      <label htmlFor="texto-hosts">Líneas para el archivo hosts</label>
      <textarea id="texto-hosts" readOnly rows={dominios.length + 1} value={textoHosts(dominios)} />
    </section>
  );
}
