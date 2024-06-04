import { Box } from '@mui/material';
import './book-interface';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';

function BookItem({
  title,
  author,
  publisher,
  year,
  availableCopies,
  img,
  descryption,
}: BookEntity) {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  const handleBack = () => {
    setIsClicked(false);
  };
  return (
    <Card style={{ borderRadius: '15px', padding: '10px' }}>
      <motion.div
        animate={isClicked ? { y: -100 } : { y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          onClick={handleClick}
          onDoubleClick={handleBack}
        >
          {!isImageLoaded && <CircularProgress />} {/* Loading spinner */}
          <CardMedia
            component="img"
            image={img}
            onLoad={() => setImageLoaded(true)}
            alt={title}
            style={{ width: '180px', height: '255px' }}
          />
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              align="center"
            >
              {author}
            </Typography>
            <Typography variant="body2" align="center">
              {publisher}
            </Typography>
            <Typography variant="body2" align="center">
              {year}
            </Typography>
            <Typography variant="body2" align="center">
              Copies: {availableCopies}
            </Typography>
          </CardContent>
          <Box visibility={isClicked ? 'visible' : 'hidden'}>
            <Button variant="contained" color="inherit">
              Loan
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Card>
  );
}

export default function BookList({ books }: { books: BookEntity[] }) {
  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item xs={4} key={book.isbn}>
          <BookItem {...book} />
        </Grid>
      ))}
    </Grid>
  );
}
