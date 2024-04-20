import './App.css';
import LoginForm from './login-form/login-form';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DisplayBooksList from './book-display/book-display';
import mock from './book-display/mock.json';
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
      <DisplayBooksList bookList={bookList} />
    </ThemeProvider>
  );
}

export default App;
