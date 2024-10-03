import React, { useContext, useState } from 'react';
import { Typography, Grid, Container, Card, CardContent, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, useTheme, Tooltip, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip as ChartTooltip } from 'recharts';
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';

const dummyData = [
  { date: '2023-10-01', depth: 30 },
  { date: '2023-10-02', depth: 25 },
  { date: '2023-10-03', depth: 35 },
  { date: '2023-10-04', depth: 20 },
  { date: '2023-10-05', depth: 40 },
];

const Dashboard = () => {
  const { mode } = useContext(ThemeContext);
  const [showAuthRequests, setShowAuthRequests] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const authRequests = [
    { id: 1, stakeholder: 'Dive Company A', requestType: 'View Dive Logs' },
    { id: 2, stakeholder: 'Certification Body B', requestType: 'Verify Certification' },
  ];

  const upcomingDives = [
    { id: 1, date: '2023-10-15', location: 'Great Barrier Reef' },
    { id: 2, date: '2023-10-22', location: 'Red Sea' },
  ];

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAuthorize = () => {
    console.log(`Authorized request from ${selectedRequest.stakeholder}`);
    setOpenDialog(false);
  };

  const handleExport = () => {
    // Implement export functionality here
    console.log('Exporting dashboard data...');
    // You would typically generate a CSV or PDF here
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" align="left">Dashboard</Typography>
        <Tooltip title="Export dashboard data">
          <Button variant="contained" color="primary" onClick={handleExport}>
            Export
          </Button>
        </Tooltip>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Dives</Typography>
              <Typography variant="h4">50</Typography>
              <Button component={Link} to="/divelogs" size="small" color="primary">
                View Logs
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Equipment Status</Typography>
              <Typography variant="h4">All Good</Typography>
              <Button component={Link} to="/equipment" size="small" color="primary">
                Check Equipment
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Certification Status</Typography>
              <Typography variant="body1">Advanced Open Water</Typography>
              <Typography variant="body2">Expires: Dec 31, 2024</Typography>
              <Button component={Link} to="/profile" size="small" color="primary">
                View Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Upcoming Dives</Typography>
              <List dense={isMobile}>
                {upcomingDives.map((dive) => (
                  <ListItem key={dive.id}>
                    <ListItemText primary={`${dive.date} - ${dive.location}`} />
                  </ListItem>
                ))}
              </List>
              <Button component={Link} to="/divelog/new" size="small" color="primary">
                Log New Dive
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Authorizations</Typography>
              <Typography variant="body1">{authRequests.length} requests</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="small" 
                style={{ marginTop: '10px' }}
                onClick={() => setShowAuthRequests(!showAuthRequests)}
              >
                {showAuthRequests ? 'Hide' : 'Review'}
              </Button>
              {showAuthRequests && (
                <List dense={isMobile}>
                  {authRequests.map((request) => (
                    <ListItem key={request.id} button onClick={() => handleRequestClick(request)}>
                      <ListItemText 
                        primary={request.stakeholder} 
                        secondary={request.requestType} 
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Dive Depths Over Time</Typography>
              <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
                <LineChart data={dummyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={!isMobile} />
                  <YAxis />
                  <ChartTooltip />
                  {!isMobile && <Legend />}
                  <Line type="monotone" dataKey="depth" stroke={mode === 'dark' ? "#90caf9" : "#007BFF"} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Authorization Request</DialogTitle>
        <DialogContent>
          <Typography>
            {selectedRequest && `${selectedRequest.stakeholder} is requesting to ${selectedRequest.requestType}. Do you want to authorize this request?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Deny
          </Button>
          <Button onClick={handleAuthorize} color="primary" autoFocus>
            Authorize
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;