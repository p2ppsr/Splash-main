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
import VerifyCredentials from './components/verification/VerifyCredentials';
import VerifyLogs from './components/verification/VerifyLogs';
import Reports from './components/Reports';
import Profile from './components/auth/Profile';
import Settings from './components/Settings';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Router>
      <NavMenu />
      <Box component="main" sx={{ mt: isMediumScreen ? 7 : 8, p: 3 }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/divelogs" element={<DiveLogList />} />
          <Route path="/divelog/new" element={<DiveLogForm />} />
          <Route path="/equipment" element={<EquipmentList />} />
          <Route path="/equipment/new" element={<EquipmentForm />} />
          <Route path="/medicalrecords" element={<MedicalRecords />} />
          <Route path="/qualifications" element={<Qualifications />} />
          <Route path="/verify/credentials" element={<VerifyCredentials />} />
          <Route path="/verify/logs" element={<VerifyLogs />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;