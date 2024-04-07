import { IconButton, TableCell, TableRow } from '@mui/material';
import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
import React from 'react';
import { useInc } from './useInc';
import { useDec } from './useDec';

const CartRow = ({ item }) => {
  const { title, price } = item.product;
  const { amount, id } = item;
  const { increment, incrementing } = useInc();
  const { decrement, decrementing } = useDec();
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        {title}
      </TableCell>
      <TableCell align='right'>{price}</TableCell>
      <TableCell align='right' sx={{ width: 200 }}>
        <IconButton
          disabled={decrementing}
          onClick={() => decrement(id)}
          color='error'
        >
          <Remove />
        </IconButton>
        {amount}
        <IconButton
          disabled={incrementing}
          onClick={() => increment(id)}
          color='secondary'
        >
          <Add />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartRow;
