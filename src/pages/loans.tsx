import axios from 'axios';
import React from 'react';
import LoansDisplay from './../components/loan-display';
import Loan from './../interfaces/loan-interface';
interface State {
  loans: any[]; // replace any with the actual type of your loans
}

export default class LoansController extends React.Component<{}, State> {
  constructor(props: Loan) {
    super(props);
    this.state = {
      loans: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8080/loans/mine', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({ loans: response.data });
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
  }

  render() {
    return (
      <div>
        <h1>My Loans</h1>
        <LoansDisplay />
      </div>
    );
  }
}
