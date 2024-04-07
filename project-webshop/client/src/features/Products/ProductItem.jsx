import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, CardActions, IconButton, Rating } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDeleteProduct } from './useDelete';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../atoms/authAtom';
import { useAddCart } from '../Cart/useAddCart';
import { useCart } from '../Cart/useCart';

export default function ProductItem({ product }) {
  const { isAuthenticated, user } = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { deleteProduct } = useDeleteProduct();
  const { addToCart, isPending: addingToCart } = useAddCart();
  const { cart } = useCart();
  const { title, description, price, imageUrl, ratings, id } = product;
  const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  const avgRating =
    ratings.length > 0 ? Number(totalRating / ratings.length).toFixed(1) : 0;
  console.log(cart);
  const onDeleteHandler = () => {
    if (confirm('Are you sure you want to delete')) {
      deleteProduct(id);
    }
  };
  const addToCartHandler = () => {
    if (!isAuthenticated) return navigate('/auth');
    const body = {
      productId: id,
      cartId: cart?.id,
    };
    console.log(body);
    addToCart(body);
  };
  return (
    <Card>
      <Link to={`/products/${id}`}>
        <CardMedia
          component='img'
          height='250'
          image={imageUrl}
          alt='green iguana'
        />
      </Link>

      <CardContent>
        <Link to={`/products/${id}`}>
          <Typography gutterBottom variant='h5' component='div'>
            {title.length > 50 ? title.slice(0, 50) + '....' : title}
          </Typography>
        </Link>
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
          Price: {price}{' '}
          <Typography gutterBottom variant='caption' component='strike'>
            555
          </Typography>
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description.length > 150
            ? description.slice(0, 150) + '....'
            : description}
        </Typography>
      </CardContent>
      <CardActions>
        {pathname !== '/admin' && (
          <Button
            disabled={addingToCart}
            onClick={addToCartHandler}
            variant='contained'
            color='primary'
          >
            Add to cart
          </Button>
        )}

        {pathname === '/admin' && (
          <>
            <IconButton onClick={onDeleteHandler}>
              <DeleteIcon />
            </IconButton>
            <Link to={`/products/${id}/edit`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
          </>
        )}
      </CardActions>
    </Card>
  );
}
