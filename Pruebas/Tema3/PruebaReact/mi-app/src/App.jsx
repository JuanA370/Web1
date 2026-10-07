import Titulo from "./components/Titulo";
import Grid from "./components/grid";

export default function App() {
  return (
    <>
      <Titulo/>
      <Grid nombre="Juan" rol="Capitán" especie="Humano"/>
      <Grid nombre="María" rol="Doctora" especie="Humano"/>
      <Grid nombre="R2-D2" rol="Droid" especie="Droide"/>
    </>
  );
}
