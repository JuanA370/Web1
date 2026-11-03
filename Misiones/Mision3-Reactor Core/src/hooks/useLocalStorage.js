// Hook reutilizable: igual que useState, pero el valor se guarda en localStorage
import { useEffect, useState } from 'react';

// Lee el valor guardado; si no hay nada o está corrupto, usa el valor inicial
function leerGuardado(clave, valorInicial) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado === null ? valorInicial : JSON.parse(guardado);
  } catch (error) {
    // JSON.parse falla si alguien ha tocado el valor a mano: se empieza de cero
    console.warn(`No se pudo leer ${clave} de localStorage:`, error.message);
    return valorInicial;
  }
}

export default function useLocalStorage(clave, valorInicial) {
  // Con una función, localStorage solo se lee en el primer render
  const [valor, setValor] = useState(() => leerGuardado(clave, valorInicial));

  // Cada vez que cambia el valor, se guarda (sincroniza React con algo externo)
  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      // Si el navegador no deja guardar (modo privado, cuota llena) la app sigue sin persistir
      console.warn(`No se pudo guardar ${clave} en localStorage:`, error.message);
    }
  }, [clave, valor]);

  return [valor, setValor];
}
