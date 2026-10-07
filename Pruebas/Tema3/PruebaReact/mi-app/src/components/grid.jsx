export default function grid ({nombre, rol, especie = "Humano"}) {
    return (
    <div className="card">
        <h2>{nombre}</h2>
        <p>Rol: {rol}</p>
        <p>Especie: {especie}</p>
    </div>
    );
}