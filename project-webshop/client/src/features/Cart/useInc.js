import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../axios';
import { useEffect } from 'react';

export const useInc = () => {
  const client = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['inc'],
    mutationFn: async (rowId) => {
      const { data } = await axios.put(`/cart/increaseAmount/${rowId}`);
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
  return { increment: mutate, incrementing: isPending };
};
