import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios, { AxiosError } from 'axios';
interface BookEntity {
  isbn: number;
  title: string;
  author: string;
  publisher: string;
  year: string;
  availableCopies: number;
  img: string;
  descryption: string;
}

const AddBookForm: React.FC = () => {
  const [bookData, setBookData] = useState<BookEntity>({
    isbn: 0,
    title: '',
    author: '',
    publisher: '',
    year: '',
    availableCopies: 0,
    img: '',
    descryption: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: name === 'availableCopies' ? parseInt(value, 10) : value,
    });
  };

  const isFormFilled = () => {
    return Object.values(bookData).every((value) => {
      if (typeof value === 'number') {
        return value !== 0;
      }
      return value.trim() !== '';
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!isFormFilled()) {
      alert('Please fill all fields');
      return;
    }
    axios
      .post('http://localhost:8080/book/add', bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert('Book added successfully');
        setBookData({
          ...bookData,
        });
      })
      .catch((error: AxiosError) => {
        alert('Error adding book');
        console.error('Error:', error);
      });
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{ mt: 1 }}
    >
      {/* Adjust the Grid item xs and sm values as needed for responsive design */}

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="text"
          name="isbn"
          label="ISBN"
          variant="outlined"
          value={bookData.isbn}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="text"
          name="title"
          label="Title"
          variant="outlined"
          value={bookData.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="text"
          name="author"
          label="Author"
          variant="outlined"
          value={bookData.author}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="text"
          name="publisher"
          label="Publisher"
          variant="outlined"
          value={bookData.publisher}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="text"
          name="year"
          label="Year"
          variant="outlined"
          value={bookData.year}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="number"
          name="availableCopies"
          label="Available Copies"
          variant="outlined"
          value={bookData.availableCopies}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="text"
          name="img"
          label="Image URL"
          variant="outlined"
          value={bookData.img}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="descryption"
          label="descryption"
          multiline
          rows={4}
          variant="outlined"
          value={bookData.descryption}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" sx={{ m: 1 }}>
          Add Book
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddBookForm;
