import { useQuery } from '@tanstack/react-query';
import axios from '../../axios';
import { useCart } from './useCart';

export const useCartRows = () => {
  const { cart } = useCart();
  const { data, isLoading } = useQuery({
    queryKey: ['cartRows'],
    queryFn: async () => {
      const { data } = await axios.get(`/cart/${cart.id}/getCartRows`);
      return data;
    },
  });
  return { data, isLoading };
};
