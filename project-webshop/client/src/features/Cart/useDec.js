import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../axios';
import { useEffect } from 'react';

export const useDec = () => {
  const client = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['inc'],
    mutationFn: async (rowId) => {
      const { data } = await axios.put(`/cart/decreaseAmount/${rowId}`);
      return data;
    },
  });
  useEffect(() => {
    if (isSuccess) {
      client.invalidateQueries({
        queryKey: ['cartRows'],
      });
      client.invalidateQueries({
        queryKey: ['cart'],
      });
    }
  }, [isSuccess, client]);
  return { decrement: mutate, decrementing: isPending };
};
