import React from 'react';
import { Typography, Container, Card, CardContent, Box, Button, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DiveLogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Mock data - in a real app, you'd fetch this based on the id
  const diveLog = {
    id: id,
    date: '2023-10-01',
    location: 'Caribbean Sea',
    depth: '30m',
    duration: '45 minutes',
    waterTemperature: '26°C',
    visibility: '20m',
    notes: 'Excellent visibility, saw a school of barracudas.',
  };

  const handleEdit = () => {
    navigate(`/divelogs/edit/${id}`);
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log(`Dive log ${id} deleted`);
    navigate('/divelogs');
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">Dive Log Details</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom><strong>Date:</strong> {diveLog.date}</Typography>
            <Typography variant="h6" gutterBottom><strong>Location:</strong> {diveLog.location}</Typography>
            <Typography variant="h6" gutterBottom><strong>Depth:</strong> {diveLog.depth}</Typography>
            <Typography variant="h6" gutterBottom><strong>Duration:</strong> {diveLog.duration}</Typography>
            <Typography variant="h6" gutterBottom><strong>Water Temperature:</strong> {diveLog.waterTemperature}</Typography>
            <Typography variant="h6" gutterBottom><strong>Visibility:</strong> {diveLog.visibility}</Typography>
            <Typography variant="h6" gutterBottom><strong>Notes:</strong> {diveLog.notes}</Typography>
          </Box>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DiveLogDetail;