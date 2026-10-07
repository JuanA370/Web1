import  Boton  from "./components/button";
import Saludo from "./components/saludo";

export default function App() {
  return (
    <>
      <Titulo/>
      <grid nombre="Juan" rol="Capitán" especie="Humano"/>
      <grid nombre="María" rol="Doctora" especie="Humano"/>
      <grid nombre="R2-D2" rol="Droid" especie="Droide"/>
    </>
  );
}