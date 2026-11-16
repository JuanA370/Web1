import { useMutation, useQueryClient } from '@tanstack/react-query';
import { quitarDominio } from '../services/dominios.js';
import { CLAVE_DOMINIOS } from './useDominios.js';

// Mutación para quitar un dominio: al borrarse, invalida todas las listas para que se vuelvan a pedir
export default function useQuitarDominio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: quitarDominio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLAVE_DOMINIOS });
    },
  });
}
