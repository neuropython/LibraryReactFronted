import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as BookIcon } from '../assets/book.svg';
import { styled, keyframes } from '@mui/system';
import { useTranslation } from 'react-i18next';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const StyledBox = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '200px',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: `${float} 2s ease-in-out infinite`,
}));

function HeroSection() {
  const [t, i18n] = useTranslation('global');

  const LeftContent = (
    <Grid
      item
      container
      md={6}
      xs={12}
      justifyContent="center"
      alignItems="center"
    >
      <StyledBox>
        <BookIcon style={{ width: '100px', height: '100px' }} />
      </StyledBox>
    </Grid>
  );

  const RightContent = (
    <Grid
      item
      container
      md={6}
      xs={12}
      justifyContent="center"
      alignItems="center"
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
      />
      <Typography
        variant="h2"
        component="div"
        align="center"
        fontFamily="'Poppins', sans-serif"
      >
        <p>{t('landingPage.welcomeMessage')}</p>
      </Typography>
    </Grid>
  );

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {LeftContent}
      {RightContent}
    </Grid>
  );
}

export function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 4,
      }}
    >
      <HeroSection />
      {/* Add more sections here */}
    </Box>
  );
}
