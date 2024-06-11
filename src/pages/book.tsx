import displayBooksList from '../book-display/book-display';
import BookList from '../book-display/book-list';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import AddBookForm from '../components/add-book';
import { useTranslation } from 'react-i18next';

function Invitation() {
  const [t, i18n] = useTranslation('global');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '50px', // Increase margin
      }}
    >
      <h1
        style={{
          marginBottom: '10px',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '5rem',
        }}
      >
        {t('Invitation.heading')}
      </h1>{' '}
      <h5 style={{ lineHeight: '1.2', fontSize: '2rem', textAlign: 'center' }}>
        {t('Invitation.subheading')}
      </h5>
    </div>
  );
}

function BookListInvitation() {
  const [t, i18n] = useTranslation('global');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '50px', // Increase margin
      }}
    >
      <h2 style={{ lineHeight: '1.2', fontSize: '4rem', textAlign: 'center' }}>
        {t('BookListInvitation.heading')}
      </h2>{' '}
      <h5 style={{ lineHeight: '1.2', fontSize: '2rem', textAlign: 'center' }}>
        {t('BookListInvitation.subheading')}
      </h5>
    </div>
  );
}

export function Book() {
  const [bookList, setBookList] = useState([]);
  const role = localStorage.getItem('role');
  const isAdmin = role === 'ROLE_ADMIN';
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
      <h2 style={{ lineHeight: '1.2', fontSize: '4rem', textAlign: 'center' }}>
        Add book - ADMIN
      </h2>
      {isAdmin && (
        <div style={{ flex: 'row' }}>
          <AddBookForm />
        </div>
      )}
    </div>
  );
}
