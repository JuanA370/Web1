//js del adivinador de numeros     

let intentos = 0;
const numeroSecreto = Math.floor(Math.random() * 100) + 1;
console.log("(psst... el secreto es", numeroSecreto, ")");
const listaNumeros = [];

const inputNumero = document.getElementById("numero-input");
const botonAdivinar = document.getElementById("adivinar-btn");
const mensajePista = document.getElementById("mensaje-pista");
const contadorIntentos = document.getElementById("contador-intentos");
const parrafoHistorial = document.getElementById("historial-intentos");
const reiniciarBtn = document.getElementById("reiniciar-btn");


botonAdivinar.addEventListener("click", () => {
const prediccion = Number(inputNumero.value);

if (prediccion < 1 || prediccion > 100 || isNaN(prediccion)) {
    mensajePista.textContent = "Por favor, introduce un número entre 1 y 100.";
    return;
}
   intentos++;
   listaNumeros.push(prediccion);
   contadorIntentos.textContent = `Intentos fallidos: ${intentos}`;

   if (prediccion === numeroSecreto) {
       mensajePista.textContent = "Has adivinado el número.";
       adivinarBtn.disabled = true;
       reiniciarBtn.style.display = "inline-block";

   }else if (prediccion < numeroSecreto) {
         mensajePista.textContent = "El número secreto es mayor.";
    } else {
        mensajePista.textContent = "El número secreto es menor.";
    }
});
