import axios from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['createProduct'],
    mutationFn: async (body) => {
      const { data } = await axios.post('/products', body);
      return data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      navigate('/admin');
    }
  }, [isSuccess, navigate, queryClient]);

  return { create: mutate, isCreating: isPending };
};
