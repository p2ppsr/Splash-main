import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Card, CardContent, Snackbar, Grid, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Qualifications = () => {
  const [formData, setFormData] = useState({
    certificationName: '',
    issuingBody: '',
    dateObtained: '',
    expiryDate: '',
    certificateFile: null,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [qualifications, setQualifications] = useState([
    { id: 1, certificationName: 'Open Water Diver', issuingBody: 'PADI', dateObtained: '2020-01-15', expiryDate: '2025-01-15' },
    { id: 2, certificationName: 'Advanced Open Water Diver', issuingBody: 'PADI', dateObtained: '2021-05-20', expiryDate: '2026-05-20' },
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQualifications([...qualifications, { ...formData, id: qualifications.length + 1 }]);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="left">Add/Edit Certification</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="certificationName"
                  label="Certification Name"
                  value={formData.certificationName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="issuingBody"
                  label="Issuing Body"
                  value={formData.issuingBody}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dateObtained"
                  label="Date Obtained"
                  type="date"
                  value={formData.dateObtained}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="expiryDate"
                  label="Expiry Date"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  style={{ marginTop: '20px' }}
                >
                  Upload Certificate
                  <input
                    type="file"
                    name="certificateFile"
                    hidden
                    onChange={handleChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ margin: '20px 0' }} />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                  Save Certification
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Certification Name</TableCell>
              <TableCell>Issuing Body</TableCell>
              <TableCell>Date Obtained</TableCell>
              <TableCell>Expiry Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {qualifications.map((qualification) => (
              <TableRow key={qualification.id}>
                <TableCell>{qualification.certificationName}</TableCell>
                <TableCell>{qualification.issuingBody}</TableCell>
                <TableCell>{qualification.dateObtained}</TableCell>
                <TableCell>{qualification.expiryDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Certification saved successfully"
      />
    </Container>
  );
};

export default Qualifications;