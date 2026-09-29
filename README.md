# Web Development I, the Client — Repositorio de la asignatura

Repositorio de trabajo de la asignatura **Web Development I, the Client** (U-tad, curso 2026–2027).
Este archivo explica cómo está organizado para que la corrección localice cada entrega.

## Estructura

```
Web1/
├── Misiones/                              ← ENTREGAS EVALUABLES (misiones)
│   └── Mision1-El despertar del DOM/      ← M1 · El Despertar del DOM
│       ├── index.html
│       ├── styles.css
│       └── app.js
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

| Carpeta | Misión | Contenido |
|---|---|---|
| `Mision1-El despertar del DOM` | M1 · El Despertar del DOM | Simon Says en HTML, CSS y JavaScript puro, sin frameworks |

## `Pruebas/` — prácticas de clase

Contiene los **ejercicios hechos en clase**, que se califican como **trabajo de clase** y **no** forman parte de las entregas de las misiones.

- Organizados por tema (`TemaN/`) y, dentro, por práctica (`PruebaN/`).
- `Tema1/Prueba1` es el ejercicio base del oráculo que se hizo en clase. **No es la entrega de la M1**: la entrega de la M1 está en `Misiones/Mision1-El despertar del DOM`.
