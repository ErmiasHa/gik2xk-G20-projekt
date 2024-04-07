import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../atoms/authAtom';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('login');
  const { isAuthenticated } = useRecoilValue(authAtom);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const toggleActive = () => {
    if (active === 'login') {
      setActive('signup');
    } else {
      setActive('login');
    }
  };
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent>
        {active === 'login' ? <Login /> : <Signup />}
        {active === 'login' && (
          <p>
            Don&apos;t have an account?{' '}
            <Box
              component='span'
              sx={{ cursor: 'pointer', color: 'blue' }}
              onClick={toggleActive}
            >
              Create
            </Box>
          </p>
        )}
        {active === 'signup' && (
          <p>
            Already have an account?{' '}
            <Box
              sx={{ cursor: 'pointer', color: 'blue' }}
              component='span'
              onClick={toggleActive}
            >
              Login
            </Box>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Auth;
