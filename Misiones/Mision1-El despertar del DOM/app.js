// js del Simon Says

// ---------- Constantes ----------
const COLORES = ["verde", "rojo", "amarillo", "azul"];
const TECLAS = { q: "verde", w: "rojo", a: "amarillo", s: "azul" };
const TECLA_MODO_OSCURO = "d";
const DURACION_LUZ = 500;      // ms que un pad permanece iluminado
const PAUSA_ENTRE_COLORES = 800; // ms entre colores de la secuencia

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

// ---------- Funciones ----------

// Enciende un pad durante DURACION_LUZ ms
function iluminar(color) {
    const pad = tablero.querySelector(`[data-color="${color}"]`);
    pad.classList.add("activo");
    setTimeout(() => pad.classList.remove("activo"), DURACION_LUZ);
}

// Devuelve un color al azar de COLORES
function colorAleatorio() {
    const indice = Math.floor(Math.random() * COLORES.length);
    return COLORES[indice];
}

// Añade un color a la secuencia y la muestra
function nuevaRonda() {
}

// Reproduce la secuencia completa y después cede el turno al jugador
function mostrarSecuencia() {
    turnoJugador = false;
    pasoJugador = 0;

    secuencia.forEach((color, indice) => {
        setTimeout(() => iluminar(color), indice * PAUSA_ENTRE_COLORES);
    });

    setTimeout(() => {
        turnoJugador = true;
        mensaje.textContent = "¡Tu turno!";
    }, secuencia.length * PAUSA_ENTRE_COLORES);
}

// Comprueba el color pulsado por el jugador (clic o teclado)
function procesarJugada(color) {
}

// Pinta ronda y récord en el marcador
function actualizarMarcador() {
}

// Termina la partida y actualiza el récord
function finDePartida() {
    turnoJugador = false;
    record = Math.max(record, ronda);
    actualizarMarcador();

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

    mensaje.textContent = "Atento a la secuencia...";
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
