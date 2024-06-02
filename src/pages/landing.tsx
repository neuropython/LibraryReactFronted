import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
import { ReactComponent as BookIcon } from '../assets/book.svg';

function HeroSection() {
  const LeftContent = (
    <Grid
      sx={{
        flexGrow: 1,
      }}
      item
      container
      md={6}
      xs={12}
      justifyContent="center"
      alignItems="center"
    >
      <BookIcon style={{ width: '100px', height: '100px' }} />{' '}
    </Grid>
  );
  const RightContent = (
    <Grid
      sx={{
        flexGrow: 1,
      }}
      item
      container
      md={6}
      xs={12}
      justifyContent="center"
      alignItems="center"
    ></Grid>
  );

  return (
    <Grid
      container
      spacing={{
        xs: 15,
        md: 2,
      }}
      sx={{ flexGrow: 1 }}
    >
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
    </Box>
  );
}
