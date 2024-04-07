import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, isPending } = useLogin();
  const onSubmitHandler = (data) => {
    login(data);
  };
  return (
    <>
      <Typography component='h1' mb={2} variant='title'>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box mb={4}>
          <TextField
            error={Boolean(errors?.email?.message)}
            helperText={errors?.email?.message}
            label='Email'
            type='email'
            fullWidth
            {...register('email', {
              required: 'Email is required',
            })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            error={Boolean(errors?.password?.message)}
            helperText={errors?.password?.message}
            label='Password'
            type='password'
            fullWidth
            {...register('password', {
              required: 'Password is required',
            })}
          />
        </Box>
        <Button
          disabled={isPending}
          type='submit'
          fullWidth
          variant='contained'
          color='secondary'
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Login;
