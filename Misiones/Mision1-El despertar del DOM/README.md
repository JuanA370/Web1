# Simon Says

Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo
Abre index.html en el navegador (o con Live Server). Pulsa «Empezar»:
Se ilumina una secuencia de pads colores y tienes que repetirla pulsando
los pads (o las teclas Q, W, A y S). Cada ronda la secuencia crece un
color y deja menos tiempo entre iluminacion de cada pad. Al fallar, se muestra la secuencia correcta con la ficha en la que fallaste marcada. Tecla secreta: pulsa "d" para el modo oscuro.

## Uso de IA
Usé Claude Code (VS Code) como pareja de programación, fase a fase.
Ejemplo de prompt real: "Diseña el workflow que debo seguir para hacer
el Simon Says". Con ese plan de fases (estructura HTML, iluminar un pad,
mostrar la secuencia, turno del jugador, teclado y modo oscuro, toque
original) fui pidiendo cada función por separado y haciendo un commit
al terminar cada fase.
Verifiqué cada cambio manualmente tanto leyendo el propio código generado como buscando el fallo manualmente jugando.
Iba cambiando a mano yo los primeros outputs de codigo que me daba claude ya que el LLM tenia una idea mas compleja y diferente de como debia estar programado el Symons Says.

## Autopsia
1. Uso una variable turnoJugador que bloquea los clics y las teclas
   mientras Simon muestra la secuencia, en vez de dejar el tablero
   siempre activo. Descarté deshabilitar los cuatro botones con
   disabled porque habría que activarlos y desactivarlos uno a uno en
   cada ronda, y aun así el teclado seguiría funcionando igualmente: con una
   sola variable se logra ambos efectos a la vez.
2. Uso un solo listener en el tablero (delegación) con
   closest("[data-color]") en vez de cuatro listeners, uno por pad. El
   color sale del atributo data-color, así que el clic y el teclado
   acaban llamando a la misma función procesarJugada(color) y la lógica
   de acierto y fallo no está duplicada.
3. Para el historial no guardo aparte en qué posición falló el jugador:
   pasoJugador ya apunta a ella, porque solo avanza cuando acierta. Las
   fichas se crean con createElement dentro de un DocumentFragment y se
   insertan de una vez con replaceChildren. Descarté ir añadiéndolas una
   a una al DOM porque cada inserción puede obligar al navegador a
   recalcular la página.
