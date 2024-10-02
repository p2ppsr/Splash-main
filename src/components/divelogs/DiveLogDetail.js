import React from 'react';
import { Typography, Container, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';

const DiveLogDetail = () => {
  const { id } = useParams();
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

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Dive Log Details</Typography>
          <Typography><strong>Date:</strong> {diveLog.date}</Typography>
          <Typography><strong>Location:</strong> {diveLog.location}</Typography>
          <Typography><strong>Depth:</strong> {diveLog.depth}</Typography>
          <Typography><strong>Duration:</strong> {diveLog.duration}</Typography>
          <Typography><strong>Water Temperature:</strong> {diveLog.waterTemperature}</Typography>
          <Typography><strong>Visibility:</strong> {diveLog.visibility}</Typography>
          <Typography><strong>Notes:</strong> {diveLog.notes}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DiveLogDetail;