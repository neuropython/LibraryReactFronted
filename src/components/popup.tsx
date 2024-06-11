import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';

export function LoanDialog({
  id,
  open,
  onClose,
}: {
  id: number;
  open: boolean;
  onClose: () => void;
}) {
  console.log(id);
  const [openDialog, setOpenDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const token = localStorage.getItem('token');
  const [date, setDate] = useState('');
  const [today, setToday] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLoanClick = () => {
    if (!token) {
      setOpenLoginDialog(true);
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenLoginDialog(false);
  };

  useEffect(() => {
    const now = new Date();
    setToday(now.toISOString());

    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 2);
    setDate(futureDate.toISOString());
  }, []);

  return (
    <div>
      <Button onClick={handleLoanClick}>Loan Book</Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Loan Book'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Would you like to loan this book with a deadline of ${date} (2 months from today)?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button
            onClick={() => {
              handleCloseDialog();
              async function fetchUserData() {
                try {
                  const response = await axios.get(
                    'http://localhost:8080/users/me',
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  );
                  const user_id = response.data;
                  setUserId(user_id);
                  console.log('user_id', user_id); // Logging the user_id
                } catch (error) {
                  console.error(error);
                }
              }

              // Call fetchUserData at the appropriate time
              fetchUserData();
              axios
                .post(
                  'http://localhost:8080/loans/add',
                  {
                    userId: userId,
                    bookId: id,
                    loanDate: today,
                    dueDate: date,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                )
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openLoginDialog}
        onClose={handleCloseDialog}
        aria-labelledby="login-dialog-title"
        aria-describedby="login-dialog-description"
      >
        <DialogTitle id="login-dialog-title">{'Login Required'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="login-dialog-description">
            You need to be logged in to loan a book.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
