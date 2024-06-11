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
import { RegisterForm } from './login-form/register-form';
import { UrlNotFound } from './pages/url-not-found';
import LoansControler from './pages/loans';
import { Comments } from './pages/comments';
import { Home } from './pages/landing';
import { Me } from './pages/me';
import { SelectedBook } from './pages/selected-book';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MuiNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/Books" element={<Book />} />
        <Route path="/Loans" element={<LoansControler />} />
        <Route path="/Comments" element={<Comments />} />
        <Route path="/Me" element={<Me />} />
        <Route path="*" element={<UrlNotFound />} />
        <Route path="/book/:isbn" element={<SelectedBook />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
