import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Card, CardContent, Snackbar, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EquipmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serialNumber: '',
    purchaseDate: '',
    lastMaintenanceDate: '',
    status: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Equipment form submitted:', formData);
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/equipment');
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="left">Add/Edit Equipment</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Equipment Name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="type"
                  label="Equipment Type"
                  value={formData.type}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="serialNumber"
                  label="Serial Number"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="purchaseDate"
                  label="Purchase Date"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastMaintenanceDate"
                  label="Last Maintenance Date"
                  type="date"
                  value={formData.lastMaintenanceDate}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="status"
                  label="Status"
                  select
                  value={formData.status}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Needs Maintenance">Needs Maintenance</MenuItem>
                  <MenuItem value="Out of Service">Out of Service</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ margin: '20px 0' }} />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                  Save Equipment
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
        message="Equipment saved successfully"
      />
    </Container>
  );
};

export default EquipmentForm;