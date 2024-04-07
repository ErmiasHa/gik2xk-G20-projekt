import axios from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['editProduct'],
    mutationFn: async ({ id, body }) => {
      const { data } = await axios.put(`/products/${id}`, body);
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

  return { edit: mutate, isEditing: isPending };
};
