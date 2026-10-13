import './styles.css';
import { buscarPersonajes } from './api.js';
import { limpiarPersonajes, contarPorEstado } from './logic.js';
import { mostrarCargando, mostrarVacio, mostrarError, mostrarPersonajes } from './render.js';

const formulario = document.querySelector('#filtros');

async function cargar() {
  const nombre = formulario.elements.nombre.value.trim();
  const estado = formulario.elements.estado.value;

  mostrarCargando();
  try {
    const personajes = limpiarPersonajes(await buscarPersonajes(nombre, estado));
    if (personajes.length === 0) {
      mostrarVacio();
      return;
    }
    mostrarPersonajes(personajes, contarPorEstado(personajes));
  } catch (error) {
    mostrarError(`No se pudieron cargar los personajes (${error.message}).`, cargar);
  }
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  cargar();
});

cargar();
