import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCartRows } from './useCartRows';
import CartRow from './CartRow';

const Cart = () => {
  const { data = [], isLoading } = useCartRows();
  const totalPrice = data.reduce(
    (acc, curr) => acc + curr.amount * curr.product.price,
    0
  );
  if (isLoading) return <CircularProgress />;
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardContent>
        <Typography component='h2' variant='h4'>
          Cart
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <CartRow key={row.id} item={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={4}>
          <Typography gutterBottom variant='h5' component='div'>
            Total: {totalPrice}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary'>
          Checkout
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cart;
