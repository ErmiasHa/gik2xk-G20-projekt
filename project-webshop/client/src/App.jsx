import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import Header from './components/Header';
import { authAtom } from './atoms/authAtom';
import { cartAtom } from './atoms/cartAtom';
import { useEffect } from 'react';
import axios from './axios';
import { useQueryClient } from '@tanstack/react-query';

function App() {
  const setAuthValue = useSetRecoilState(authAtom);
  const setCartValue = useSetRecoilState(cartAtom);
  const client = useQueryClient();
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    console.log(localUser);
    if (localUser === 'undefined') localStorage.removeItem('user');
    if (localUser && localUser !== 'undefined') {
      const user = JSON.parse(localUser);
      setAuthValue({
        isAuthenticated: true,
        user: user,
      });
      
      axios
        .get(`/cart/user/${user.id}`)
        .then((data) => {
          console.log(data);
          setCartValue(data.data);
          client.setQueryData(['cart'], data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setAuthValue, setCartValue, client]);
  return (
    <>
      <Header />
      <Container maxWidth='xl'>
        <Box my={3}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}

export default App;
