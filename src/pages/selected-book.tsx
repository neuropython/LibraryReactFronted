import React, { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';

import { useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import CenteredCircularProgress from '../components/CircularProgress';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

interface ReviewEntity {
  reviewId: number;
  review: string;
  rating: number;
  user: {
    name: string;
  };
  isAdmin: boolean;
}

function SelectedBookDisplay(
  { bookId, title, author, publisher, year, availableCopies, img }: BookEntity,
  isAdmin: boolean,
) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: '40px',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
      />

      <Grid item xs={6}>
        <Card id="cardView" sx={{ background: '' }}>
          <CardContent>
            <Typography
              variant="h1"
              component="h2"
              id="title"
              fontFamily="'Poppins', sans-serif"
            >
              {title}
            </Typography>
            <Typography color="textSecondary" variant="h4">
              {author}
            </Typography>
            <Typography variant="h4" component="p">
              {publisher}
            </Typography>
            <Typography variant="h4" component="p">
              Year: {year}
            </Typography>
            <Typography variant="h4" component="p">
              Copies: {availableCopies}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardMedia component="img" image={img} alt={title} />
      </Grid>
    </Grid>
  );
}

function ReviewDisplay(
  { reviewId, review, rating, user }: ReviewEntity,
  isAdmin: boolean,
) {
  const userName = user.name || 'Anonymous';

  const getGradient = (rating: number) => {
    switch (rating) {
      case 1:
        return 'linear-gradient(120deg, #ff0844 0%, #ffb199 100%)'; // Red for lowest score
      case 2:
        return 'linear-gradient(120deg, #ff9a9e 0%, #fecfef 100%)';
      case 3:
        return 'linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%)';
      case 4:
        return 'linear-gradient(120deg, #fbc2eb 0%, #a1c4fd 100%)';
      case 5:
        return 'linear-gradient(120deg, #0099f7 0%, #f6d365 100%)'; // Blue for highest score
      default:
        return 'linear-gradient(120deg, #a1c4fd 20%, #c2e9fb 80%)';
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: '20px',
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        transition: '0.01s',
        '&:hover': {
          boxShadow: '0 16px 32px 0 rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardMedia
        className="review-container"
        sx={{
          height: '200px',
          background: getGradient(rating), // Dynamically set the gradient based on rating
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
        }}
      />
      <CardContent>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontFamily="'Poppins', sans-serif"
          display="flex"
          justifyContent="center"
        >
          {userName}
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          {Array.from({ length: rating }, (_, index) => (
            <StarIcon key={index} color="primary" />
          ))}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          justifyContent="center"
        >
          {review}
        </Typography>
        {isAdmin && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              color="inherit"
              onClick={() => deleteReview(reviewId)}
            >
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function addReview(id: number) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget) return;
    const form = event.currentTarget;
    const rating = form.rating.value;
    const review = form.review.value;
    const token = localStorage.getItem('token');
    if (review === '') {
      alert('Please enter a review');
      return;
    }

    if (rating < 1 || rating > 5) {
      alert('Please enter a rating between 1 and 5');
      return;
    }

    axios
      .post(
        'http://localhost:3000/reviews/add',
        {
          review,
          rating,
          bookId: id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Typography variant="h4" gutterBottom>
        Add a Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Review"
          name="review"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          name="rating"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}
function deleteReview(reviewId: number) {
  const token = localStorage.getItem('token');
  axios
    .delete(`http://localhost:3000/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
}

function ChangeItem(bookId: number, changeItem: any, field: string) {
  const token = localStorage.getItem('token');
  axios
    .patch(
      `http://localhost:3000/book/update/${bookId}`,

      { changeItem, field },

      { headers: { Authorization: `Bearer ${token}` } },
    )
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
}

export function SelectedBook() {
  const { isbn } = useParams();

  const [book, setBook] = useState<BookEntity | null>(null);
  const [id, bookId] = useState(0);
  const [comments, setComments] = useState<ReviewEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_ADMIN') {
      setIsAdmin(true);
    }
    const fetchData = async () => {
      setLoading(true);
      // Fetch book details
      const bookResponse = await fetch(
        `http://localhost:3000/book/get/${isbn}`,
        {
          method: 'GET',
        },
      );
      const bookData = await bookResponse.json();
      setBook(bookData);
      bookId(bookData.bookId);

      // Fetch book reviews
      const reviewsResponse = await fetch(
        `http://localhost:3000/reviews/book/${id}`,
        {
          method: 'GET',
        },
      ).finally(() => setLoading(false));
      const reviewsData = await reviewsResponse.json();
      setComments(reviewsData);
    };

    fetchData();
  }, [isbn, id]); // Assuming `id` is a dependency as well
  if (loading) {
    return <CenteredCircularProgress />;
  }
  return (
    <div>
      {book && <SelectedBookDisplay {...book} isAdmin={isAdmin} />}
      <style>
        {`
    /* Style for webkit-based browsers */
    ::-webkit-scrollbar {
      width: 12px; /* Wider scrollbar */
      height: 12px; /* For horizontal scrollbar if needed */
    }
    ::-webkit-scrollbar-track {
      background: #2D2E2C; /* Dark color for the track */
    }
    ::-webkit-scrollbar-thumb {
      background: #8F908A; /* Brighter color for the thumb */
      border-radius: 6px; /* Optional: rounded corners for the thumb */
    }
    /* Add other pseudo-elements like ::-webkit-scrollbar-thumb:hover for hover effects */
  `}
      </style>
      <div
        style={{
          height: '400px',
          width: '100%',
          overflowX: 'auto', // Enables horizontal scrolling
          overflowY: 'hidden', // Disables vertical scrolling
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {comments.map((comment) => (
          <div key={comment.reviewId} style={{ minWidth: '300px' }}>
            {comment && <ReviewDisplay {...comment} isAdmin={isAdmin} />}{' '}
          </div>
        ))}
      </div>
      <Box sx={{ margin: 4 }}>
        <div>{addReview(id)}</div>
      </Box>
    </div>
  );
}
