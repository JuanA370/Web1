import { useQuery } from '@tanstack/react-query';
import { obtenerDominios } from '../services/dominios.js';

// ---------- Constantes ----------
// Clave con la que TanStack Query guarda la lista en su caché (se reutiliza al invalidar)
export const CLAVE_DOMINIOS = ['dominios'];

// Consulta la lista de dominios: TanStack Query se encarga de la caché y de los estados de carga y error
export default function useDominios() {
  return useQuery({
    queryKey: CLAVE_DOMINIOS,
    queryFn: obtenerDominios,
    retry: 1,
  });
}
