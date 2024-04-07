import axios from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: async (id) => {
      const { data } = await axios.delete(`/products/${id}`);
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

  return { deleteProduct: mutate, isDeleting: isPending };
};
