import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearDominio } from '../services/dominios.js';
import { CLAVE_DOMINIOS } from './useDominios.js';

// Mutación para añadir un dominio: al guardarse, marca la lista como caducada para que se vuelva a pedir
export default function useRegistrarDominio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearDominio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLAVE_DOMINIOS });
    },
  });
}
