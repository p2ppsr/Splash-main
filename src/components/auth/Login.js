import React, { useState } from 'react';
import VerificationModal from '../common/VerificationModal';
import { Button, Typography, Container, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVerifyCode = (code) => {
    // Add logic to verify the code
    console.log('Verification code entered:', code);
    handleCloseModal();
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <Button onClick={handleOpenModal} variant="contained" color="primary" fullWidth>
            Access Private Records
          </Button>
        </CardContent>
      </Card>
      <VerificationModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleVerify={handleVerifyCode}
      />
    </Container>
  );
};

export default Login;