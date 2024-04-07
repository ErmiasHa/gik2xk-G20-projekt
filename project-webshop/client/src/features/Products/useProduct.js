import axios from '../../axios';
import { useQuery } from '@tanstack/react-query';

export const useProduct = (id) => {
  const { data: product, isLoading } = useQuery({
    queryKey: 'product',
    queryFn: async () => {
      const { data } = await axios.get(`/products/${id}`);
      return data;
    },
    enabled: Boolean(id),
  });
  return { product, getting: isLoading };
};
