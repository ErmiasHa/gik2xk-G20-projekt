import axios from '../../axios';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('/products');
      console.log(data);
      return data;
    },
  });
  return { products, isLoading };
};
