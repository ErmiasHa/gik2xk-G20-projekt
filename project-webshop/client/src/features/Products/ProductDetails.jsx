import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from './useProduct';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { useSubmitRating } from './useSubmitRating';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../atoms/authAtom';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useRecoilValue(authAtom);
  const [giveRating, setGiveRating] = useState(false);
  const { id } = useParams();
  const { product, getting } = useProduct(id);
  const [rating, setRating] = useState(0);
  const { submitRating, isRating } = useSubmitRating();
  if (getting) return <CircularProgress />;
  const totalRating = product.ratings.reduce(
    (acc, curr) => acc + curr.rating,
    0
  );
  const avgRating =
    product.ratings.length > 0
      ? Number(totalRating / product.ratings.length).toFixed(1)
      : 0;
  const onRatingSubmit = () => {
    if (!isAuthenticated) return navigate('/auth');
    const body = {
      rating: rating,
    };
    submitRating({ id: product.id, body });
    setGiveRating(true);
    // addRating(body);
  };
  return (
    <>
      <Card sx={{ maxWidth: 500 }}>
        <CardMedia
          component='img'
          height='250'
          image={product.imageUrl}
          alt='green iguana'
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {product.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Rating
              name='read-only'
              value={+avgRating}
              readOnly
              precision={0.5}
            />
            <Box component='span'>{avgRating}</Box>
          </Box>

          <Typography gutterBottom variant='h5' component='div'>
            Price: {product.price}{' '}
            <Typography gutterBottom variant='caption' component='strike'>
              555
            </Typography>
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {product.description}
          </Typography>
        </CardContent>
      </Card>
      <Box mt={5}>
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            {giveRating && <Typography>Thanks for your feedback</Typography>}
            {!giveRating && (
              <>
                <Typography>Give rating</Typography>
                <Rating
                  name='simple-controlled'
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  precision={0.5}
                />
              </>
            )}
          </CardContent>
          {!giveRating && (
            <CardActions>
              <Button
                onClick={onRatingSubmit}
                variant='contained'
                color='primary'
                disabled={isRating}
              >
                Submit
              </Button>
            </CardActions>
          )}
        </Card>
      </Box>
    </>
  );
};

export default ProductDetails;
