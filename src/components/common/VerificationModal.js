import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';

const VerificationModal = ({ open, handleClose, handleVerify }) => {
  const [code, setCode] = useState('');

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = () => {
    handleVerify(code);
    setCode('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Verification Code</DialogTitle>
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerificationModal;