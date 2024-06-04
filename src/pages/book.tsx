import displayBooksList from '../book-display/book-display';
import BookList from '../book-display/book-list';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function Invitation() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '50px', // Increase margin
      }}
    >
      <h1 style={{ marginBottom: '10px' }}>Books</h1>{' '}
      <h5 style={{ lineHeight: '1.2' }}>
        Welcome to the library! Here are 10 of the most popular books available
      </h5>
    </div>
  );
}

function BookListInvitation() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '50px', // Increase margin
      }}
    >
      <h1 style={{ marginBottom: '10px' }}>
        List of all books currently accessible
      </h1>{' '}
    </div>
  );
}

export function Book() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/book/all')
      .then((response) => {
        setBookList(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }, []);

  return (
    <div
      style={{
        margin: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
      }}
    >
      <Invitation />
      <div>{displayBooksList({ bookList: bookList })}</div>
      <BookListInvitation />
      <div>
        <BookList books={bookList} />
      </div>
    </div>
  );
}
