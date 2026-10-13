// Funciones que transforman los datos de la API antes de pintarlos

// Se queda solo con lo que se va a mostrar y rellena los datos que falten
export function limpiarPersonajes(lista) {
  return lista
    .filter((personaje) => personaje?.name)
    .map((personaje) => ({
      nombre: personaje.name,
      imagen: personaje.image ?? '',
      estado: personaje.status ?? 'unknown',
      especie: personaje.species || 'Desconocida',
    }));
}

// Cuenta cuántos personajes hay de cada estado: { Alive: 3, Dead: 1, ... }
export function contarPorEstado(personajes) {
  return personajes.reduce((cuenta, personaje) => {
    cuenta[personaje.estado] = (cuenta[personaje.estado] ?? 0) + 1;
    return cuenta;
  }, {});
}
