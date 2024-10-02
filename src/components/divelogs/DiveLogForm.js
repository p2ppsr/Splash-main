import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Card, CardContent, Snackbar, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DiveLogForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    location: '',
    depth: '',
    duration: '',
    waterTemperature: '',
    visibility: '',
    notes: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setFormData((prevData) => ({ ...prevData, date: currentDate }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dive Log submitted:', formData);
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/divelogs');
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Add/Edit Dive Log</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="date"
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="depth"
                  label="Depth (m)"
                  type="number"
                  value={formData.depth}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="duration"
                  label="Duration (minutes)"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="waterTemperature"
                  label="Water Temperature (°C)"
                  type="number"
                  value={formData.waterTemperature}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="visibility"
                  label="Visibility (m)"
                  type="number"
                  value={formData.visibility}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="notes"
                  label="Notes"
                  value={formData.notes}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ margin: '20px 0' }} />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Dive log saved successfully"
      />
    </Container>
  );
};

export default DiveLogForm;