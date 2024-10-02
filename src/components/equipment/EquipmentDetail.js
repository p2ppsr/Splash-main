import React from 'react';
import { Typography, Paper, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const EquipmentDetail = () => {
  const { id } = useParams();
  // Mock data - in a real app, you'd fetch this based on the id
  const equipment = {
    id: id,
    name: 'Diving Suit',
    type: 'Wetsuit',
    serialNumber: 'WS123456',
    purchaseDate: '2022-05-15',
    lastMaintenanceDate: '2023-09-01',
    status: 'Good',
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>Equipment Details</Typography>
        <Typography><strong>Name:</strong> {equipment.name}</Typography>
        <Typography><strong>Type:</strong> {equipment.type}</Typography>
        <Typography><strong>Serial Number:</strong> {equipment.serialNumber}</Typography>
        <Typography><strong>Purchase Date:</strong> {equipment.purchaseDate}</Typography>
        <Typography><strong>Last Maintenance Date:</strong> {equipment.lastMaintenanceDate}</Typography>
        <Typography><strong>Status:</strong> {equipment.status}</Typography>
      </Paper>
    </Container>
  );
};

export default EquipmentDetail;