import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Card, CardContent, Snackbar, Grid, Divider } from '@mui/material';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    certificationNumber: 'CERT123456',
    address: '123 Ocean Drive, Atlantis',
    contactNumber: '+1234567890',
    dateOfBirth: '1985-06-15',
    photoID: 'photoID.jpg',
    certifications: [
      { id: 1, name: 'Open Water Diver', dateObtained: '2020-01-15', issuingBody: 'PADI' },
      { id: 2, name: 'Advanced Open Water Diver', dateObtained: '2021-05-20', issuingBody: 'PADI' },
    ],
    medicalRecords: [
      { id: 1, examinationDate: '2023-01-15', fitnessCertificate: 'certificate1.pdf', incidentDate: '2023-02-20', symptoms: 'Mild decompression sickness', outcome: 'Full recovery after treatment' },
      { id: 2, examinationDate: '2022-12-10', fitnessCertificate: 'certificate2.pdf', incidentDate: '', symptoms: '', outcome: '' },
    ],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    setSnackbarOpen(true);
    setIsEditing(false);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="left">Profile</Typography>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="certificationNumber"
                    label="Certification Number"
                    value={formData.certificationNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    label="Address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="contactNumber"
                    label="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    style={{ marginTop: '20px' }}
                  >
                    Upload Photo ID
                    <input
                      type="file"
                      name="photoID"
                      hidden
                      onChange={handleChange}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ margin: '20px 0' }} />
                  <Typography variant="h6" gutterBottom align="left">Certifications</Typography>
                  {formData.certifications.map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '10px' }}>
                      <Typography align="left"><strong>{cert.name}</strong></Typography>
                      <Typography align="left">Issued by: {cert.issuingBody}</Typography>
                      <Typography align="left">Date Obtained: {cert.dateObtained}</Typography>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ margin: '20px 0' }} />
                  <Typography variant="h6" gutterBottom align="left">Medical Records</Typography>
                  {formData.medicalRecords.map((record) => (
                    <div key={record.id} style={{ marginBottom: '10px' }}>
                      <Typography align="left"><strong>Examination Date:</strong> {record.examinationDate}</Typography>
                      {record.incidentDate && <Typography align="left"><strong>Incident Date:</strong> {record.incidentDate}</Typography>}
                      {record.symptoms && <Typography align="left"><strong>Symptoms:</strong> {record.symptoms}</Typography>}
                      {record.outcome && <Typography align="left"><strong>Outcome:</strong> {record.outcome}</Typography>}
                      {record.fitnessCertificate && <Typography align="left"><strong>Fitness Certificate:</strong> {record.fitnessCertificate}</Typography>}
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <div>
              <Typography align="left"><strong>Full Name:</strong> {formData.name}</Typography>
              <Typography align="left"><strong>Email:</strong> {formData.email}</Typography>
              <Typography align="left"><strong>Certification Number:</strong> {formData.certificationNumber}</Typography>
              <Typography align="left"><strong>Address:</strong> {formData.address}</Typography>
              <Typography align="left"><strong>Contact Number:</strong> {formData.contactNumber}</Typography>
              <Typography align="left"><strong>Date of Birth:</strong> {formData.dateOfBirth}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="h6" gutterBottom align="left">Certifications</Typography>
              {formData.certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <Typography align="left"><strong>{cert.name}</strong></Typography>
                  <Typography align="left">Issued by: {cert.issuingBody}</Typography>
                  <Typography align="left">Date Obtained: {cert.dateObtained}</Typography>
                </div>
              ))}
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="h6" gutterBottom align="left">Medical Records</Typography>
              {formData.medicalRecords.map((record) => (
                <div key={record.id} style={{ marginBottom: '10px' }}>
                  <Typography align="left"><strong>Examination Date:</strong> {record.examinationDate}</Typography>
                  {record.incidentDate && <Typography align="left"><strong>Incident Date:</strong> {record.incidentDate}</Typography>}
                  {record.symptoms && <Typography align="left"><strong>Symptoms:</strong> {record.symptoms}</Typography>}
                  {record.outcome && <Typography align="left"><strong>Outcome:</strong> {record.outcome}</Typography>}
                  {record.fitnessCertificate && <Typography align="left"><strong>Fitness Certificate:</strong> {record.fitnessCertificate}</Typography>}
                </div>
              ))}
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
        message="Profile updated successfully"
      />
    </Container>
  );
};

export default Profile;