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
import CenteredCircularProgress from '../components/CircularProgress';

import Loan from './../interfaces/loan-interface';
import { c } from 'tar';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

interface LoanCardProps {
  loan: Loan;
  isAdmin: boolean;
}

function deleteLoan(loanId: number) {
  const token = localStorage.getItem('token');

  fetch(`http://localhost:8080/loans/${loanId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      console.log('Loan deleted');
    } else {
      console.error('Error:', response);
    }
    window.location.reload();
  });
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, isAdmin }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [t, i18n] = useTranslation('global');

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleBack = () => {
    setIsClicked(false);
  };

  return (
    <Grid container spacing={2} margin={5}>
      <Card style={{ borderRadius: '15px' }}>
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
              {t('loanDate')} {new Date(loan.loanDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" align="center">
              {t('dueDate')} {new Date(loan.dueDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" align="center">
              {t('user')} {loan.user.name}
            </Typography>
            {isAdmin && (
              <Typography variant="body2" align="center">
                {t('email')} {loan.user.email_to_user}
              </Typography>
            )}
            {isAdmin && (
              <Button
                color="inherit" // Adjust the type to match Ant Design's API for button color
                onClick={() => deleteLoan(loan.loanId)}
                style={{
                  margin: '10px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {t('delete')}
              </Button>
            )}
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

function LoansDisplay() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const isAdmin = role === 'ROLE_ADMIN';
  useEffect(() => {
    if (role === 'ROLE_ADMIN') {
      fetch('http://localhost:8080/loans/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoans(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
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
    }
  });

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '50px',
      }}
    >
      <h1
        style={{
          lineHeight: '1.2',
          fontSize: '4rem',
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        MyLoans
      </h1>
      <div
        style={{
          display: 'grid',

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '600px', // Adjust the height as needed
        }}
      >
        {loans &&
          loans.map((loan: Loan) => (
            <LoanCard loan={loan} key={loan.loanId} isAdmin={isAdmin} />
          ))}
      </div>
    </div>
  );
}

export default LoansDisplay;
