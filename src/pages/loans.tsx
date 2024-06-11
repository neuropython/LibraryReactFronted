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

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>My Loans</h1>
        <LoansDisplay />
      </div>
    );
  }
}
