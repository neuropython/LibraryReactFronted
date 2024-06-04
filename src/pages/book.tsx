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
      <h2 style={{ marginBottom: '10px' }}>
        List of all books currently accessible
      </h2>{' '}
      <h5 style={{ lineHeight: '1.2' }}>
        Here is a list of all the books currently available in the library. Feel
        free to browse and borrow any book you like. if you want to borrow a
        book, click on book you are interested in and then click on the loan
        button.
      </h5>
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
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
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
