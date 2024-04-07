import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCreateProduct } from './useCreateProduct';
import { useEditProduct } from './useEditProduct';
import { useProduct } from './useProduct';
import { useEffect } from 'react';

const CreateEditProduct = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const isEditSession = Boolean(id);
  const { product, getting } = useProduct(id);
  const { create, isCreating } = useCreateProduct();
  const { edit, isEditing } = useEditProduct();

  useEffect(() => {
    if (isEditSession && product) {
      Object.keys(product).forEach((item) => {
        setValue(item, product[item]);
      });
    }
  }, [isEditSession, product, setValue]);

  const onSubmitHandler = (data) => {
    console.log(data);
    if (isEditSession) {
      edit({ id, body: data });
    } else {
      create(data);
    }
  };

  const isLoading = isCreating || isEditing;

  if (getting) return <CircularProgress />;

  return (
    <>
      <Typography variant='h4'>
        {isEditSession ? 'Edit Product' : 'Create Product'}
      </Typography>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Box mb={2}>
              <TextField
                error={Boolean(errors?.title?.message)}
                helperText={errors?.title?.message}
                label='Title'
                fullWidth
                {...register('title', {
                  required: 'Title is required',
                })}
              />
            </Box>
            <Box mb={2}>
              <TextField
                error={Boolean(errors?.description?.message)}
                helperText={errors?.description?.message}
                label='Description'
                fullWidth
                {...register('description', {
                  required: 'Description is required',
                })}
              />
            </Box>
            <Box mb={2}>
              <TextField
                error={Boolean(errors?.price?.message)}
                helperText={errors?.price?.message}
                type='number'
                label='price'
                fullWidth
                {...register('price', {
                  required: 'Price is required',
                })}
              />
            </Box>
            <Box mb={2}>
              <TextField
                error={Boolean(errors?.imageUrl?.message)}
                helperText={errors?.imageUrl?.message}
                label='Image Url'
                fullWidth
                {...register('imageUrl', {
                  required: 'Image url is required',
                })}
              />
            </Box>
            <Box>
              <Button
                disabled={isLoading}
                type='submit'
                fullWidth
                variant='contained'
                color='secondary'
              >
                {isLoading ? (
                  <CircularProgress />
                ) : isEditSession ? (
                  'Update Product'
                ) : (
                  'Create Product'
                )}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateEditProduct;
