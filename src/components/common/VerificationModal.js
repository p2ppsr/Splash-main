import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Typography, Snackbar } from '@mui/material';

const VerificationModal = ({ open, handleClose, handleVerify }) => {
  const [code, setCode] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = () => {
    if (code === '123456') { // Example correct code
      handleVerify(code);
      setCode('');
      setError('');
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleResendCode = () => {
    console.log('Verification code resent');
    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="verification-dialog-title">
        <DialogTitle id="verification-dialog-title">Enter Verification Code</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the verification code sent to your email to access private records.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Verification Code"
            type="text"
            fullWidth
            value={code}
            onChange={handleChange}
            aria-label="Verification Code"
            error={!!error}
            helperText={error || 'Ensure the code is correct to access detailed certification and dive history.'}
          />
          <Typography variant="body2" color="textSecondary">
            For any issues, contact support at support@example.com.
          </Typography>
          <Button onClick={handleResendCode} color="primary">
            Resend Code
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!code.trim()}>
            Verify
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Verification code resent"
      />
    </>
  );
};

export default VerificationModal;