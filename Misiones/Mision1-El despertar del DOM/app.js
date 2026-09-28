// js del Simon Says

// ---------- Constantes ----------
const COLORES = ["verde", "rojo", "amarillo", "azul"];
const TECLAS = { q: "verde", w: "rojo", a: "amarillo", s: "azul" };
const TECLA_MODO_OSCURO = "d";
const DURACION_LUZ = 500;      // ms que un pad permanece iluminado
const PAUSA_ENTRE_COLORES = 800; // ms entre colores de la secuencia en la primera ronda
const PAUSA_MINIMA = 300;        // la secuencia nunca irá más rápido que esto
const ACELERACION = 40;          // ms que se recortan por cada ronda superada

// ---------- Estado del juego ----------
const secuencia = [];
let pasoJugador = 0;
let ronda = 0;
let record = 0;
let turnoJugador = false;

// ---------- Elementos del DOM ----------
const tablero = document.querySelector("#tablero");
const botonEmpezar = document.querySelector("#empezar-btn");
const mensaje = document.querySelector("#mensaje");
const spanRonda = document.querySelector("#ronda");
const spanRecord = document.querySelector("#record");
const historial = document.querySelector("#historial");
const historialFichas = document.querySelector("#historial-fichas");

// ---------- Funciones ----------

// Enciende un pad durante los ms indicados
function iluminar(color, duracion = DURACION_LUZ) {
    const pad = tablero.querySelector(`[data-color="${color}"]`);
    pad.classList.add("activo");
    setTimeout(() => pad.classList.remove("activo"), duracion);
}

// Pausa entre colores según la ronda: cada ronda la secuencia va más rápido
function calcularPausa() {
    return Math.max(PAUSA_MINIMA, PAUSA_ENTRE_COLORES - ronda * ACELERACION);
}

// Devuelve un color al azar de COLORES
function colorAleatorio() {
    const indice = Math.floor(Math.random() * COLORES.length);
    return COLORES[indice];
}

// Añade un color a la secuencia y la muestra
function nuevaRonda() {
    mensaje.textContent = "Atento a la secuencia...";
    secuencia.push(colorAleatorio());
    mostrarSecuencia();
}

// Reproduce la secuencia completa y después cede el turno al jugador
function mostrarSecuencia() {
    turnoJugador = false;
    pasoJugador = 0;

    const pausa = calcularPausa();
    const duracionLuz = pausa * 0.6; // la luz se apaga antes del siguiente color

    secuencia.forEach((color, indice) => {
        setTimeout(() => iluminar(color, duracionLuz), indice * pausa);
    });

    setTimeout(() => {
        turnoJugador = true;
        mensaje.textContent = "¡Tu turno!";
    }, secuencia.length * pausa);
}

// Comprueba el color pulsado por el jugador (clic o teclado)
function procesarJugada(color) {
    iluminar(color);

    if (color !== secuencia[pasoJugador]) {
        finDePartida();
        return;
    }

    pasoJugador++;

    if (pasoJugador === secuencia.length) {
        turnoJugador = false;
        ronda++;
        actualizarMarcador();
        mensaje.textContent = `¡Bien! Ronda ${ronda} superada.`;
        setTimeout(nuevaRonda, PAUSA_ENTRE_COLORES * 1.5);
    }
}

// Pinta ronda y récord en el marcador
function actualizarMarcador() {
    spanRonda.textContent = ronda;
    spanRecord.textContent = record;
}

// Crea una ficha por cada color de la secuencia y marca en la que se falló
function mostrarHistorial() {
    const fragmento = document.createDocumentFragment();

    secuencia.forEach((color, indice) => {
        const ficha = document.createElement("span");
        ficha.classList.add("ficha", `ficha-${color}`);
        ficha.title = color;

        if (indice === pasoJugador) {
            ficha.classList.add("fallo");
        }

        fragmento.appendChild(ficha);
    });

    historialFichas.replaceChildren(fragmento);
    historial.classList.remove("oculto");
}

// Termina la partida y actualiza el récord
function finDePartida() {
    turnoJugador = false;
    record = Math.max(record, ronda);
    actualizarMarcador();
    mostrarHistorial();

    mensaje.textContent = `¡Fallaste! Llegaste a la ronda ${ronda}.`;
    botonEmpezar.textContent = "Jugar otra vez";
    botonEmpezar.classList.remove("oculto");
}

// Pone el estado a cero y empieza una partida nueva
function empezarPartida() {
    secuencia.length = 0;
    pasoJugador = 0;
    ronda = 0;
    turnoJugador = false;
    actualizarMarcador();

    historial.classList.add("oculto");
    botonEmpezar.classList.add("oculto");
    nuevaRonda();
}

// ---------- Eventos ----------

// Delegación: un solo listener para los cuatro pads
tablero.addEventListener("click", (event) => {
    const pad = event.target.closest("[data-color]");
    if (!pad || !turnoJugador) return;
    procesarJugada(pad.dataset.color);
});

botonEmpezar.addEventListener("click", empezarPartida);

document.addEventListener("keydown", (event) => {
    const tecla = event.key.toLowerCase();

    if (tecla === TECLA_MODO_OSCURO) {
        document.body.classList.toggle("oscuro");
        return;
    }

    const color = TECLAS[tecla];
    if (color && turnoJugador) {
        procesarJugada(color);
    }
});
