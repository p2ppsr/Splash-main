import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import NavMenu from './components/NavMenu';
import Dashboard from './components/Dashboard';
import DiveLogList from './components/divelogs/DiveLogList';
import DiveLogForm from './components/divelogs/DiveLogForm';
import EquipmentList from './components/equipment/EquipmentList';
import EquipmentForm from './components/equipment/EquipmentForm';
import MedicalRecords from './components/MedicalRecords';
import Qualifications from './components/Qualifications';
import Reports from './components/Reports';
import Profile from './components/auth/Profile';
import Settings from './components/Settings';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Router>
      <Box 
        sx={{ 
          display: 'flex',
          minHeight: '100vh',
          maxWidth: '100vw',
          overflow: 'hidden'
        }}
      >
        <NavMenu />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ height: { xs: '64px', sm: '64px', md: '72px' } }} />
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              p: { xs: 2, sm: 3 },
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/divelogs" element={<DiveLogList />} />
                <Route path="/divelog/new" element={<DiveLogForm />} />
                <Route path="/equipment" element={<EquipmentList />} />
                <Route path="/equipment/new" element={<EquipmentForm />} />
                <Route path="/medicalrecords" element={<MedicalRecords />} />
                <Route path="/qualifications" element={<Qualifications />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
