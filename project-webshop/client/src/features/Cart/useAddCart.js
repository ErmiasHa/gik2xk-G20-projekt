import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../axios';
import { useEffect } from 'react';

export const useAddCart = () => {
  const client = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['addCart'],
    mutationFn: async (body) => {
      const { data } = await axios.post('/cart/addProduct', body);
      return data;
    },
  });
  useEffect(() => {
    if (isSuccess) {
      client.invalidateQueries({
        queryKey: ['cart'],
      });
    }
  }, [isSuccess, client]);
  return { addToCart: mutate, isPending };
};
