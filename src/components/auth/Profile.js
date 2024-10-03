import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Card, CardContent, Snackbar, Grid, Divider, Box, Tooltip, IconButton, CircularProgress, Accordion, AccordionSummary, AccordionDetails, Avatar } from '@mui/material';
import { Edit, Save, Cancel, Message, Visibility, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import VerificationModal from '../common/VerificationModal';
import MessageModal from '../common/MessageModal';

const Profile = () => {
  const theme = useTheme();
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log('Profile updated:', formData);
      setSnackbarOpen(true);
      setIsEditing(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVerifyCode = (code) => {
    console.log('Verification code entered:', code);
    handleCloseModal();
  };

  const handleOpenMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  return (
    <Container maxWidth="md">
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
                    helperText="Enter your full name"
                    aria-label="Full Name"
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
                    helperText="Enter a valid email address"
                    aria-label="Email"
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
                    helperText="Enter your certification number"
                    aria-label="Certification Number"
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
                    helperText="Enter your address"
                    aria-label="Address"
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
                    helperText="Enter your contact number"
                    aria-label="Contact Number"
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
                    helperText="Enter your date of birth"
                    aria-label="Date of Birth"
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
                  {formData.photoID instanceof File && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <Avatar src={URL.createObjectURL(formData.photoID)} alt="Photo ID" sx={{ width: 100, height: 100 }} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button type="submit" variant="contained" color="primary" startIcon={<Save />} disabled={isLoading}>
                      {isLoading ? <CircularProgress size={24} /> : 'Save'}
                    </Button>
                    <Button variant="outlined" color="secondary" startIcon={<Cancel />} onClick={() => setIsEditing(false)} disabled={isLoading}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          ) : (
            <Box>
              <Typography align="left"><strong>Full Name:</strong> {formData.name}</Typography>
              <Typography align="left"><strong>Email:</strong> {formData.email}</Typography>
              <Typography align="left"><strong>Certification Number:</strong> {formData.certificationNumber}</Typography>
              <Typography align="left"><strong>Address:</strong> {formData.address}</Typography>
              <Typography align="left"><strong>Contact Number:</strong> {formData.contactNumber}</Typography>
              <Typography align="left"><strong>Date of Birth:</strong> {formData.dateOfBirth}</Typography>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Certifications</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {formData.certifications.map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '10px' }}>
                      <Typography align="left"><strong>{cert.name}</strong></Typography>
                      <Typography align="left">Issued by: {cert.issuingBody}</Typography>
                      <Typography align="left">Date Obtained: {cert.dateObtained}</Typography>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Medical Records</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {formData.medicalRecords.map((record) => (
                    <div key={record.id} style={{ marginBottom: '10px' }}>
                      <Typography align="left"><strong>Examination Date:</strong> {record.examinationDate}</Typography>
                      {record.incidentDate && <Typography align="left"><strong>Incident Date:</strong> {record.incidentDate}</Typography>}
                      {record.symptoms && <Typography align="left"><strong>Symptoms:</strong> {record.symptoms}</Typography>}
                      {record.outcome && <Typography align="left"><strong>Outcome:</strong> {record.outcome}</Typography>}
                      {record.fitnessCertificate && <Typography align="left"><strong>Fitness Certificate:</strong> {record.fitnessCertificate}</Typography>}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
              <Box mt={2}>
                <Tooltip title="Edit Profile">
                  <IconButton color="primary" onClick={() => setIsEditing(true)} aria-label="Edit Profile">
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Certifications">
                  <IconButton color="secondary" onClick={handleOpenModal} aria-label="View Certifications">
                    <Visibility />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Message Diver">
                  <IconButton color="primary" onClick={handleOpenMessageModal} aria-label="Message Diver">
                    <Message />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
      <VerificationModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleVerify={handleVerifyCode}
      />
      <MessageModal
        open={isMessageModalOpen}
        handleClose={handleCloseMessageModal}
        diverName={formData.name}
      />
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