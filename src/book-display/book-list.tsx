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
import { LoanDialog } from './../components/popup';
import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTranslation } from 'react-i18next';

function BookItem({
  bookId,
  title,
  author,
  publisher,
  year,
  availableCopies,
  img,
  isbn,
}: BookEntity) {
  const [t, i18n] = useTranslation('global');

  const navigate = useNavigate();
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showLoanDialog, handleLoanClick] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  const handleBack = () => {
    setIsClicked(false);
  };
  const handleImageClick = () => {
    navigate(`/book/${isbn}`); // Assuming `id` is the book's id
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
          <ButtonBase onClick={handleImageClick}>
            <CardMedia
              component="img"
              image={img}
              onLoad={() => setImageLoaded(true)}
              alt={title}
              style={{ width: '180px', height: '255px' }}
            />
          </ButtonBase>
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
              {t('copies')} {availableCopies}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <ArrowDropDownIcon />
            </Box>
          </CardContent>
          <Box visibility={isClicked ? 'visible' : 'hidden'}>
            <LoanDialog
              id={bookId}
              open={showLoanDialog}
              onClose={() => handleLoanClick(false)}
            />
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
