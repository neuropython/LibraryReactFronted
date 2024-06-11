import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Grid } from '@mui/material';

import Loan from './../interfaces/loan-interface';
interface LoanCardProps {
  loan: Loan;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleBack = () => {
    setIsClicked(false);
  };

  return (
    <Grid container spacing={2} margin={5}>
      <Card style={{ borderRadius: '15px', padding: '10px' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleClick}
          onDoubleClick={handleBack}
          padding={2}
        >
          {!isImageLoaded && <CircularProgress />} {/* Loading spinner */}
          <CardMedia
            component="img"
            image={loan.book.img}
            onLoad={() => setImageLoaded(true)}
            alt={loan.book.title}
            style={{ width: '180px', height: '255px' }}
          />
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {loan.book.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              align="center"
            >
              {loan.book.author}
            </Typography>
            <Typography variant="body2" align="center">
              Loan Date: {new Date(loan.loanDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" align="center">
              Due Date: {new Date(loan.dueDate).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

function LoansDisplay() {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/loans/mine', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setLoans(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  return (
    <div>
      {loans &&
        loans.map((loan: Loan) => <LoanCard loan={loan} key={loan.loanId} />)}
    </div>
  );
}

export default LoansDisplay;
