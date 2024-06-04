import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './book-display.css';
import Carousel from 'react-material-ui-carousel';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './book-interface';
import CardMedia from '@mui/material/CardMedia';
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

  return (
    <Box component="section">
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
                Copies: {availableCopies}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardMedia
            component="img"
            image={img}
            onLoad={() => setImageLoaded(true)}
            alt={title}
            style={{ width: '180px', height: '255px' }}
          />
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" id="cardView">
            <Typography
              variant="h5"
              component="h2"
              id="title"
              style={{
                maxHeight: '300px',
                overflowY: 'auto',
                direction: 'rtl',
                padding: '10px',
              }}
            >
              <div style={{ direction: 'ltr', fontFamily: 'Calibri' }}>
                {descryption}
              </div>
            </Typography>
          </Card>
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
