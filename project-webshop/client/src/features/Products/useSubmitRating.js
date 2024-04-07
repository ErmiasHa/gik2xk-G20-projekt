import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../axios';
import { useEffect } from 'react';

export const useSubmitRating = () => {
  const client = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['submitraing'],
    mutationFn: async ({ id, body }) => {
      const { data } = await axios.post(`/products/${id}/addRating`, body);
      return data;
    },
  });
  useEffect(() => {
    if (isSuccess) {
      client.invalidateQueries(['product']);
      client.invalidateQueries(['products']);
    }
  }, [isSuccess, client]);
  return { submitRating: mutate, isRating: isPending };
};
