import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  MenuItem,
  Menu,
} from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

export const MuiNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role === 'ROLE_ADMIN') {
      setIsAdmin(true);
    }
    setIsLoggedIn(!!token);
  }, []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Library
        </Typography>
        {isAdmin ? (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
        ) : null}
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button
            color="inherit"
            id="resources-button"
            onClick={handleClick}
            aria-control={open ? 'resources-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            endIcon={<KeyboardArrowDown />}
          >
            Resources
          </Button>
          {isLoggedIn ? (
            <Button
              color="inherit"
              onClick={() => {
                handleClose();
                navigate('/Me');
              }}
            >
              Me
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                handleClose();
                navigate('/Login');
              }}
            >
              Login
            </Button>
          )}
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
              navigate('/Register');
            }}
          >
            Register
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
              navigate('/About');
            }}
          >
            About
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
              navigate('/Contact');
            }}
          >
            Contact
          </Button>
        </Stack>
        <Menu
          id="resources-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{ 'aria-labelledby': 'resources-button' }}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => navigate('/Books')}>Books</MenuItem>
          <MenuItem onClick={() => navigate('/Loans')}>Loans</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
