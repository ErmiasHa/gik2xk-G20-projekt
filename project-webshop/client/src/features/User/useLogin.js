import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authAtom } from '../../atoms/authAtom';
import { cartAtom } from '../../atoms/cartAtom';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuthValue = useSetRecoilState(authAtom);
  const setCartValue = useSetRecoilState(cartAtom);
  const client = useQueryClient();
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (body) => {
      const { data } = await axios.post('/users/login', body);
      return data.data;
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  useEffect(() => {
    if (isSuccess && !data?.error) {
      setAuthValue({
        isAuthenticated: true,
        user: data.user,
      });
      setCartValue(data.cart);
      console.log(data);
      client.setQueryData(['cart'], data.cart);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } else if (isSuccess) {
      alert('Login failed');
    }
  }, [isSuccess, data, setAuthValue, navigate, setCartValue, client]);

  return { login: mutate, isPending };
};
