import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isPending } = useSignup();
  const onSubmitHandler = (data) => {
    signup(data);
  };
  return (
    <>
      <Typography component='h1' mb={2} variant='title'>
        Signup
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box mb={4}>
          <TextField
            error={Boolean(errors?.firstName?.message)}
            helperText={errors?.firstName?.message}
            label='First Name'
            type='firstName'
            fullWidth
            {...register('firstName', {
              required: 'firstName is required',
            })}
          />
        </Box>
        <Box mb={4}>
          <TextField
            error={Boolean(errors?.lastName?.message)}
            helperText={errors?.lastName?.message}
            label='Last Name'
            type='lastName'
            fullWidth
            {...register('lastName', {
              required: 'lastName is required',
            })}
          />
        </Box>
        <Box mb={4}>
          <TextField
            error={Boolean(errors?.email?.message)}
            helperText={errors?.email?.message}
            label='Email'
            type='email'
            fullWidth
            {...register('email', {
              required: 'email is required',
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
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
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

export default Signup;
