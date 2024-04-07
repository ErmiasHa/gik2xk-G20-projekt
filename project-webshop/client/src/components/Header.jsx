import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, useNavigate } from 'react-router-dom';
import { Badge, ListItem, ListItemText } from '@mui/material';
import { useRecoilState } from 'recoil';
import { authAtom } from '../atoms/authAtom';
import { useCart } from '../features/Cart/useCart';

const pages = [
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'Cart',
    path: '/cart',
  },
  {
    name: 'Admin',
    path: '/admin',
  },
];

function Header() {
  const navigate = useNavigate();
  const [{ isAuthenticated }, setState] = useRecoilState(authAtom);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { cart } = useCart();
  const [totalProduct, setTotalProduct] = React.useState(0);
  React.useEffect(() => {
    if (cart) {
      setTotalProduct(
        cart?.cartRows?.reduce((acc, curr) => acc + curr.amount, 0)
      );
    }
  }, [cart]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setState({
      isAuthenticated: false,
      user: null,
    });
    location.assign('/');
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component={NavLink}
            to='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WEBSHOP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
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
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink to={page.path}>
                    <Typography textAlign='center'>{page.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <ListItem
                button
                to={page.path}
                activeClassName='active'
                component={NavLink}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ width: 'fit-content' }}
              >
                {page.name === 'Cart' ? (
                  <Badge color='secondary' badgeContent={totalProduct}>
                    <ListItemText primary={page.name} />
                  </Badge>
                ) : (
                  <ListItemText primary={page.name} />
                )}
              </ListItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                variant='contained'
                color='secondary'
              >
                Logout
              </Button>
            )}
            {!isAuthenticated && (
              <Button
                onClick={() => {
                  navigate('/auth');
                }}
                variant='contained'
                color='secondary'
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
