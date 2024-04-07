import { MenuItem, Typography } from '@mui/material';
import React from 'react';

const pages = [
  {
    name: 'Products',
    path: '/',
  },
  {
    name: 'Cart',
    path: '/cart',
  },
];

const Menu = () => {
  const [anchorElNav, setAnchorElNav] = React.useState();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Menu
      id='menu-appbar'
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none' },
      }}
    >
      {pages.map((page) => (
        <MenuItem key={page} onClick={handleCloseNavMenu}>
          <Typography textAlign='center'>{page}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default Menu;
