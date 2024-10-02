import React, { useState } from 'react';
import { TextField, Button, Typography, Container, List, ListItem, ListItemText } from '@mui/material';

const VerifyLogs = () => {
  const [diverName, setDiverName] = useState('');
  const [verifiedLogs, setVerifiedLogs] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock verification - in a real app, you'd call an API
    setVerifiedLogs([
      { id: 1, date: '2023-09-15', location: 'Great Barrier Reef', verified: true },
      { id: 2, date: '2023-09-20', location: 'Red Sea', verified: true },
      { id: 3, date: '2023-09-25', location: 'Caribbean', verified: false },
    ]);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Verify Dive Logs</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Diver Name"
          value={diverName}
          onChange={(e) => setDiverName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Verify Logs
        </Button>
      </form>
      {verifiedLogs && (
        <List>
          {verifiedLogs.map((log) => (
            <ListItem key={log.id}>
              <ListItemText
                primary={`${log.date} - ${log.location}`}
                secondary={log.verified ? 'Verified' : 'Not Verified'}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default VerifyLogs;