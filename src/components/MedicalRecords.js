import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Card, CardContent, Snackbar, List, ListItem, ListItemText, Grid, Divider } from '@mui/material';

const MedicalRecords = () => {
  const [formData, setFormData] = useState({
    examinationDate: '',
    fitnessCertificate: null,
    incidentDate: '',
    symptoms: '',
    outcome: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [medicalRecords, setMedicalRecords] = useState([
    {
      id: 1,
      examinationDate: '2023-01-15',
      fitnessCertificate: 'certificate1.pdf',
      incidentDate: '2023-02-20',
      symptoms: 'Mild decompression sickness',
      outcome: 'Full recovery after treatment',
    },
    {
      id: 2,
      examinationDate: '2022-12-10',
      fitnessCertificate: 'certificate2.pdf',
      incidentDate: '',
      symptoms: '',
      outcome: '',
    },
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Medical record submitted:', formData);
    setMedicalRecords([...medicalRecords, { ...formData, id: medicalRecords.length + 1 }]);
    setSnackbarOpen(true);
    setIsEditing(false);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="left">Add/Edit Medical Record</Typography>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="examinationDate"
                    label="Examination Date"
                    type="date"
                    value={formData.examinationDate}
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
                    Upload Fitness Certificate
                    <input
                      type="file"
                      name="fitnessCertificate"
                      hidden
                      onChange={handleChange}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="incidentDate"
                    label="Incident Date"
                    type="date"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="symptoms"
                    label="Symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="outcome"
                    label="Outcome"
                    value={formData.outcome}
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
                    Save Medical Record
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <div>
              <Typography variant="h4" gutterBottom align="left" style={{ marginTop: '20px' }}>Current Medical Records</Typography>
              <Card>
                <CardContent>
                  <List>
                    {medicalRecords.map((record) => (
                      <ListItem key={record.id}>
                        <ListItemText
                          primary={`Examination Date: ${record.examinationDate}`}
                          secondary={
                            <>
                              {record.incidentDate && <div>Incident Date: {record.incidentDate}</div>}
                              {record.symptoms && <div>Symptoms: {record.symptoms}</div>}
                              {record.outcome && <div>Outcome: {record.outcome}</div>}
                              {record.fitnessCertificate && <div>Fitness Certificate: {record.fitnessCertificate}</div>}
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
              <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </div>
          )}
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
        message="Medical record saved successfully"
      />
    </Container>
  );
};

export default MedicalRecords;