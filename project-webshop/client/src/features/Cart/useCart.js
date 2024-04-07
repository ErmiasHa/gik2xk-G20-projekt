import axios from '../../axios';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../atoms/authAtom';

export const useCart = () => {
  const { user } = useRecoilValue(authAtom);
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      const { data } = await axios.get(`/cart/user/${user?.id}`);
      return data;
    },
  });
  return { cart, isLoading };
};
