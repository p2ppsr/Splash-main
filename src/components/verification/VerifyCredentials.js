import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';

const VerifyCredentials = () => {
  const [certNumber, setCertNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock verification - in a real app, you'd call an API
    setVerificationResult({
      isValid: true,
      name: 'John Doe',
      expirationDate: '2024-12-31',
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Verify Diver Credentials</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Certification Number"
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Verify
        </Button>
      </form>
      {verificationResult && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6">Verification Result</Typography>
          <Typography>Valid: {verificationResult.isValid ? 'Yes' : 'No'}</Typography>
          <Typography>Name: {verificationResult.name}</Typography>
          <Typography>Expiration Date: {verificationResult.expirationDate}</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default VerifyCredentials;