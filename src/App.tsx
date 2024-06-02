import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MuiNavbar } from './components/MuiNavbar';
import mock from './book-display/mock.json';
import { Routes, Route } from 'react-router-dom';
import { About } from './pages/about';
import { Book } from './pages/book';
import { Contact } from './pages/conatact';
import { LoginForm } from './login-form/login-form';
import { Register } from './login-form/register-form';
import { UrlNotFound } from './pages/url-not-found';
import { Loans } from './pages/loans';
import { Comments } from './pages/comments';
import { Home } from './pages/landing';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const bookList = mock.bookList.map((book) => ({
  ...book,
}));

function App() {
  console.log(bookList);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MuiNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/Books" element={<Book />} />
        <Route path="/Loans" element={<Loans />} />
        <Route path="/Comments" element={<Comments />} />

        <Route path="*" element={<UrlNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
