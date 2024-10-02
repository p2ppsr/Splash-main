import React, { useState } from 'react';
import { Button, Container, Typography, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Snackbar, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = [
  { date: '2023-10-01', depth: 30 },
  { date: '2023-10-02', depth: 25 },
  { date: '2023-10-03', depth: 35 },
  { date: '2023-10-04', depth: 20 },
  { date: '2023-10-05', depth: 40 },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setDateRange(e.target.value);
  };

  const handleExport = () => {
    // Implement export functionality here
    console.log('Exporting report...');
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Generate Reports</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Date Range</InputLabel>
            <Select
              name="dateRange"
              value={dateRange}
              onChange={handleChange}
            >
              <MenuItem value="lastWeek">Last Week</MenuItem>
              <MenuItem value="lastMonth">Last Month</MenuItem>
              <MenuItem value="lastYear">Last Year</MenuItem>
            </Select>
          </FormControl>
          <Divider style={{ margin: '20px 0' }} />
          <Button variant="contained" color="primary" onClick={handleExport} style={{ marginTop: '20px' }}>
            Export Report
          </Button>
        </CardContent>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Dive Depths Over Time</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="depth" stroke="#007BFF" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
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
        message="Report exported successfully"
      />
    </Container>
  );
};

export default Reports;