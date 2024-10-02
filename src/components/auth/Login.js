import React, { useState } from 'react';
import { Button, Typography, Container, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLoginClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <Button onClick={handleLoginClick} variant="contained" color="primary" fullWidth>
            Login with MetaNet ID
          </Button>
        </CardContent>
      </Card>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>MetaNet ID verified</DialogTitle>
        <DialogContent>
          <Typography>Your MetaNet ID has been successfully verified.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" variant="contained">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;