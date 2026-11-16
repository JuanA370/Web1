import { useForm } from 'react-hook-form';
import { CATEGORIAS, ALCANCES } from '../constantes.js';
import useRegistrarDominio from '../hooks/useRegistrarDominio.js';
import './FormularioDominio.css';

// ---------- Constantes ----------
// Valores con los que arranca el formulario (cada clave es el nombre de un campo)
const VALORES_INICIALES = {
  dominio: '',
  categoria: '',
  alcance: 'solo',
  motivo: '',
  fechaDeteccion: '',
  comprobado: false,
};

// Formulario para añadir un dominio a la lista de bloqueo: recoge los datos y los envía al API
export default function FormularioDominio() {
  const { register, handleSubmit, reset } = useForm({ defaultValues: VALORES_INICIALES });
  const mutacion = useRegistrarDominio();

  // handleSubmit la llama con todos los campos ya reunidos en un objeto; si se guarda, vacía el formulario
  function onSubmit(datos) {
    mutacion.mutate(datos, { onSuccess: () => reset() });
  }

  return (
    <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="campo">
        <label htmlFor="dominio">Dominio</label>
        <input
          id="dominio"
          type="text"
          placeholder="ads.ejemplo.com"
          autoComplete="off"
          {...register('dominio')}
        />
      </div>

      <div className="campo">
        <label htmlFor="categoria">Categoría</label>
        <select id="categoria" {...register('categoria')}>
          <option value="">Elige una categoría</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
      </div>

      <fieldset className="campo">
        <legend>Alcance del bloqueo</legend>
        {ALCANCES.map((alcance) => (
          <label key={alcance.valor} className="opcion">
            <input type="radio" value={alcance.valor} {...register('alcance')} />
            {alcance.texto}
          </label>
        ))}
      </fieldset>

      <div className="campo">
        <label htmlFor="motivo">Motivo</label>
        <textarea
          id="motivo"
          rows="3"
          placeholder="Qué hace este dominio y por qué lo bloqueas"
          {...register('motivo')}
        />
      </div>

      <div className="campo">
        <label htmlFor="fechaDeteccion">Fecha en que lo detectaste</label>
        <input id="fechaDeteccion" type="date" {...register('fechaDeteccion')} />
      </div>

      <label className="opcion">
        <input type="checkbox" {...register('comprobado')} />
        He comprobado que no es un sitio legítimo
      </label>

      <button type="submit" disabled={mutacion.isPending}>
        {mutacion.isPending ? 'Añadiendo…' : 'Añadir a la lista'}
      </button>

      {mutacion.isSuccess && (
        <p role="status" className="ok">Dominio añadido a la lista de bloqueo.</p>
      )}
      {mutacion.isError && (
        <p role="alert" className="error">{mutacion.error.message}</p>
      )}
    </form>
  );
}
