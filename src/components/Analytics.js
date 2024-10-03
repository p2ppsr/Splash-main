import React from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = ({ diveData }) => {
  const handleExportAnalytics = () => {
    // Implement export functionality for analytics
    console.log('Exporting analytics data...');
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Dive Analytics</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={diveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="depth" stroke="#007BFF" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          <Button variant="contained" color="primary" onClick={handleExportAnalytics} style={{ marginTop: '20px', marginLeft: '10px' }}>
            Export Analytics
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Analytics;