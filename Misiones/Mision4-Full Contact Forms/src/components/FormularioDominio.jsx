import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CATEGORIAS, ALCANCES } from '../constantes.js';
import { esquemaDominio } from '../schemas/dominio.js';
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

// Mensaje de error de un campo; el id lo enlaza con el campo mediante aria-describedby
function ErrorCampo({ id, error }) {
  if (!error) return null;
  return <p id={id} role="alert" className="error-campo">{error.message}</p>;
}

// Formulario para añadir un dominio a la lista de bloqueo: valida con Zod y envía al API
export default function FormularioDominio() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(esquemaDominio), defaultValues: VALORES_INICIALES });
  const mutacion = useRegistrarDominio();

  // handleSubmit solo la llama si el esquema da los datos por buenos; si se guardan, vacía el formulario
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
          aria-invalid={!!errors.dominio}
          aria-describedby={errors.dominio ? 'error-dominio' : undefined}
          {...register('dominio')}
        />
        <ErrorCampo id="error-dominio" error={errors.dominio} />
      </div>

      <div className="campo">
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          aria-invalid={!!errors.categoria}
          aria-describedby={errors.categoria ? 'error-categoria' : undefined}
          {...register('categoria')}
        >
          <option value="">Elige una categoría</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
        <ErrorCampo id="error-categoria" error={errors.categoria} />
      </div>

      <fieldset
        className="campo"
        aria-invalid={!!errors.alcance}
        aria-describedby={errors.alcance ? 'error-alcance' : undefined}
      >
        <legend>Alcance del bloqueo</legend>
        {ALCANCES.map((alcance) => (
          <label key={alcance.valor} className="opcion">
            <input type="radio" value={alcance.valor} {...register('alcance')} />
            {alcance.texto}
          </label>
        ))}
        <ErrorCampo id="error-alcance" error={errors.alcance} />
      </fieldset>

      <div className="campo">
        <label htmlFor="motivo">Motivo</label>
        <textarea
          id="motivo"
          rows="3"
          placeholder="Qué hace este dominio y por qué lo bloqueas"
          aria-invalid={!!errors.motivo}
          aria-describedby={errors.motivo ? 'error-motivo' : undefined}
          {...register('motivo')}
        />
        <ErrorCampo id="error-motivo" error={errors.motivo} />
      </div>

      <div className="campo">
        <label htmlFor="fechaDeteccion">Fecha en que lo detectaste</label>
        <input
          id="fechaDeteccion"
          type="date"
          aria-invalid={!!errors.fechaDeteccion}
          aria-describedby={errors.fechaDeteccion ? 'error-fechaDeteccion' : undefined}
          {...register('fechaDeteccion')}
        />
        <ErrorCampo id="error-fechaDeteccion" error={errors.fechaDeteccion} />
      </div>

      <div className="campo">
        <label className="opcion">
          <input
            type="checkbox"
            aria-invalid={!!errors.comprobado}
            aria-describedby={errors.comprobado ? 'error-comprobado' : undefined}
            {...register('comprobado')}
          />
          He comprobado que no es un sitio legítimo
        </label>
        <ErrorCampo id="error-comprobado" error={errors.comprobado} />
      </div>

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
