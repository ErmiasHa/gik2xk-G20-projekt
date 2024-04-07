import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authAtom } from '../../atoms/authAtom';
import { cartAtom } from '../../atoms/cartAtom';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const navigate = useNavigate();
  const setAuthValue = useSetRecoilState(authAtom);
  const setCartValue = useSetRecoilState(cartAtom);
  const client = useQueryClient();
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (body) => {
      const { data } = await axios.post('/users/signup', body);
      return data.data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setAuthValue({
        isAuthenticated: true,
        user: data.user,
      });
      setCartValue(data.cart);
      client.setQueryData(['cart'], data.cart);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    }
  }, [isSuccess, data, setAuthValue, navigate, setCartValue, client]);

  return { signup: mutate, isPending };
};
