import "./grid.css";

export default function Grid ({nombre, rol, especie = "Humano"}) {
    return (
    <div className="card">
        <h2>{nombre}</h2>
        <p>Rol: {rol}</p>
        <p>Especie: {especie}</p>
    </div>
    );
}
