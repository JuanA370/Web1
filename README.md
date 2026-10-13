# Web Development I, the Client — Repositorio de la asignatura

Repositorio de trabajo de la asignatura **Web Development I, the Client** (U-tad, curso 2026–2027).
Este archivo explica cómo está organizado para que la corrección localice cada entrega.

## Estructura

```
Web1/
├── Misiones/                              ← ENTREGAS EVALUABLES (misiones)
│   ├── Mision1-El despertar del DOM/      ← M1 · El Despertar del DOM
│   │   ├── README.md                  ← README de la M1
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── app.js
│   └── Mision2-Async Odyssey/             ← M2 · Async Odyssey (proyecto Vite)
│       ├── README.md                  ← README de la M2
│       ├── index.html
│       ├── package.json
│       └── src/ (main.js, api.js, logic.js, render.js, styles.css)
└── Pruebas/                               ← PRÁCTICAS DE CLASE
    └── Tema1/
        └── Prueba1/                       ← Ejercicio del oráculo (adivina el número)
            ├── index.html
            ├── style.css
            └── app.js
```

## `Misiones/` — entregas evaluables

Contiene las **misiones** que se entregan y se puntúan.

- Cada misión está en su propia subcarpeta, **numerada y nombrada según el enunciado del profesor**:
  `MisionN-<Nombre de la misión>`.
- Cada subcarpeta es un proyecto independiente con su HTML, CSS y JavaScript separados.
- **Cada misión tiene su propio `README.md` dentro de su carpeta**, con cómo probarla, sus
  decisiones técnicas y la declaración de uso de IA. Este README general solo explica la
  organización del repositorio.

| Carpeta | Misión | Contenido | README |
|---|---|---|---|
| `Mision1-El despertar del DOM` | M1 · El Despertar del DOM | Simon Says en HTML, CSS y JavaScript puro, sin frameworks | [README de la M1](Misiones/Mision1-El%20despertar%20del%20DOM/README.md) |
| `Mision2-Async Odyssey` | M2 · Async Odyssey | Buscador de personajes de Rick and Morty con Vite, fetch y async/await | [README de la M2](Misiones/Mision2-Async%20Odyssey/README.md) |

## `Pruebas/` — prácticas de clase

Contiene los **ejercicios hechos en clase**, que se califican como **trabajo de clase** y **no** forman parte de las entregas de las misiones.

- Organizados por tema (`TemaN/`) y, dentro, por práctica (`PruebaN/`).
- `Tema1/Prueba1` es el ejercicio base del oráculo que se hizo en clase. **No es la entrega de la M1**: la entrega de la M1 está en `Misiones/Mision1-El despertar del DOM`.
