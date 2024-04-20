import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './book-display.css';
import Carousel from 'react-material-ui-carousel';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface BookEntity {
  isbn: number;
  title: string;
  author: string;
  publisher: string;
  year: string;
  copies: number;
  img_url: string;
}

function BookItem({
  title,
  author,
  publisher,
  year,
  copies,
  img_url,
}: BookEntity) {
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card variant="outlined" id="cardView">
            <CardContent>
              <Typography variant="h5" component="h2" id="title">
                {title}
              </Typography>
              <Typography color="textSecondary">{author}</Typography>
              <Typography variant="body2" component="p">
                Publisher: {publisher}
              </Typography>
              <Typography variant="body2" component="p">
                Year: {year}
              </Typography>
              <Typography variant="body2" component="p">
                Copies: {copies}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          {!isImageLoaded && <CircularProgress />} {/* Loading spinner */}
          <img
            src={img_url}
            onLoad={() => setImageLoaded(true)}
            alt={title}
            style={{ width: '200px', height: '300px' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
function displayBooksList({ bookList }: { bookList: BookEntity[] }) {
  return (
    <div id="carouselView">
      <Carousel>
        {bookList.map((book) => (
          <BookItem key={book.isbn} {...book} />
        ))}
      </Carousel>
    </div>
  );
}

export default displayBooksList;
