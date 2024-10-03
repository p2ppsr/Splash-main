import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Snackbar, Box, Typography, DialogContentText } from '@mui/material';

const MessageModal = ({ open, handleClose, diverName }) => {
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChange = (event) => {
    if (event.target.value.length <= 250) {
      setMessage(event.target.value);
    }
  };

  const handleAttachmentChange = (event) => {
    setAttachment(event.target.files[0]);
  };

  const handleSend = () => {
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirmSend = () => {
    // Simulate a network request
    setTimeout(() => {
      if (Math.random() > 0.2) { // Simulate a success rate
        console.log(`Message sent to ${diverName}: ${message}`);
        if (attachment) {
          console.log(`Attachment: ${attachment.name}`);
        }
        setMessage('');
        setAttachment(null);
        setSnackbarOpen(true);
        handleClose();
      } else {
        setError('Failed to send message. Please try again.');
      }
      setConfirmOpen(false);
    }, 1000);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="message-dialog-title">
        <DialogTitle id="message-dialog-title">Send Message to {diverName}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            value={message}
            onChange={handleChange}
            aria-label="Message"
            helperText={`${message.length}/250 characters`}
            multiline
            rows={4}
            variant="outlined"
            error={!!error}
            onFocus={() => setError('')}
          />
          <Box mt={1}>
            <Typography variant="body2" color={message.length > 200 ? 'error' : 'textSecondary'}>
              {message.length > 200 ? 'Approaching character limit!' : 'You can send a message up to 250 characters.'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            component="label"
            fullWidth
            style={{ marginTop: '10px' }}
          >
            Attach File
            <input
              type="file"
              hidden
              onChange={handleAttachmentChange}
            />
          </Button>
          {attachment && (
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
              Attached: {attachment.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary" variant="contained" disabled={!message.trim()}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Send</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to send this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSend} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Message sent successfully"
      />
    </>
  );
};

export default MessageModal;