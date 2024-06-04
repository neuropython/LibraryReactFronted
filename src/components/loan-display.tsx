import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import Loan from './../interfaces/loan-interface';

interface LoanCardProps {
  loan: Loan;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={loan.book.title}
        height="140"
        image={loan.book.img}
        title={loan.book.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {loan.book.title}
        </Typography>
        <Typography variant="subtitle1">{loan.book.author}</Typography>
        <Typography variant="body2">
          Loan Date: {new Date(loan.loanDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          Due Date: {new Date(loan.dueDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LoanCard;
