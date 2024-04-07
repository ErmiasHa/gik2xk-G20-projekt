import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import ProductItem from './ProductItem';
import { useProducts } from './useProducts';
import { Link, useLocation } from 'react-router-dom';

const Products = () => {
  const { products, isLoading } = useProducts();
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>
        Products
      </Typography>
      {isAdmin && (
        <Box sx={{ textAlign: 'center' }}>
          <Link to='/products/new'>
            <Button variant='contained' color='secondary'>
              Create New Product
            </Button>
          </Link>
        </Box>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={5}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent='center'
            alignItems='center'
          >
            {products.map((product) => (
              <Grid item xs={2} sm={4} md={4} key={product.id}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Products;
