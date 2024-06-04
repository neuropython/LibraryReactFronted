import LoanCard from './../components/loan-display';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loan from './../interfaces/loan-interface';

interface LoanCardProps {
  loan: Loan;
}

export function Loans() {
  const token = localStorage.getItem('token');
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/loans/mine', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h1>My Loans</h1>
      {loans.map((loan: Loan) => (
        <LoanCard key={loan.loanId} loan={loan} />
      ))}
    </div>
  );
}
