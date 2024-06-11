import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  MenuItem,
  Menu,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import React, { useEffect, useState, ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { c } from 'tar';

export const MuiNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [t, i18n] = useTranslation('global');
  const [language, setLanguage] = React.useState('pl');
  const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setLanguage(event.target.value as string);
    console.log(event.target.value);
    i18n.changeLanguage(language);
  };
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
          {t('library')}
        </Typography>
        {isAdmin ? (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('admin')}
          </Typography>
        ) : null}
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={() => navigate('/')}>
            {t('home')}
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
            {t('resources')}
          </Button>
          <Select
            value={language}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ color: 'white', borderColor: 'white' }}
          >
            <MenuItem value="en">pl</MenuItem>
            <MenuItem value="pl">en</MenuItem>
          </Select>
          {isLoggedIn ? (
            <Button
              color="inherit"
              onClick={() => {
                handleClose();
                navigate('/Me');
              }}
            >
              {t('me')}
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                handleClose();
                navigate('/Login');
              }}
            >
              {t('login')}
            </Button>
          )}
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
              navigate('/Register');
            }}
          >
            {t('register')}
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
              navigate('/About');
            }}
          >
            {t('about')}
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
              navigate('/Contact');
            }}
          >
            {t('contact')}
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
          <MenuItem onClick={() => navigate('/Books')}>{t('books')}</MenuItem>
          <MenuItem onClick={() => navigate('/Loans')}>{t('loans')}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
