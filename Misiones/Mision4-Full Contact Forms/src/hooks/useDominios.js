import { useQuery } from '@tanstack/react-query';
import { obtenerDominios } from '../services/dominios.js';

// ---------- Constantes ----------
// Comienzo de la clave de todas las consultas de dominios (se reutiliza al invalidar)
export const CLAVE_DOMINIOS = ['dominios'];

// Consulta la lista de dominios de una categoría ('' = todas): cada categoría se guarda en la caché con su propia clave
export default function useDominios(categoria) {
  return useQuery({
    queryKey: [...CLAVE_DOMINIOS, categoria],
    queryFn: () => obtenerDominios(categoria),
    retry: 1,
  });
}
