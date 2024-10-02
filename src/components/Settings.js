import React, { useContext, useState } from 'react';
import { Container, Typography, TextField, Button, FormControlLabel, Switch, Select, MenuItem, FormControl, InputLabel, Snackbar, Grid, Divider, Card, CardContent } from '@mui/material';
import { ThemeContext } from '../ThemeContext';

const Settings = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({
    notifications: true,
    email: 'john@example.com',
    units: 'metric', // 'metric' or 'imperial'
    language: 'en', // 'en' for English, 'es' for Spanish, etc.
    dataSync: true,
    privacyMode: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings updated:', settings);
    setSnackbarOpen(true);
    setIsEditing(false);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Settings</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={handleChange}
                name="notifications"
                color="primary"
              />
            }
            label="Enable Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.dataSync}
                onChange={handleChange}
                name="dataSync"
                color="primary"
              />
            }
            label="Enable Data Sync"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.privacyMode}
                onChange={handleChange}
                name="privacyMode"
                color="primary"
              />
            }
            label="Privacy Mode (Hide sensitive data)"
          />
          <FormControlLabel
            control={
              <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                name="theme"
                color="primary"
              />
            }
            label="Theme"
          />
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Units</InputLabel>
                    <Select
                      name="units"
                      value={settings.units}
                      onChange={handleChange}
                    >
                      <MenuItem value="metric">Metric (meters, bar)</MenuItem>
                      <MenuItem value="imperial">Imperial (feet, psi)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Language</InputLabel>
                    <Select
                      name="language"
                      value={settings.language}
                      onChange={handleChange}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                      <MenuItem value="fr">Français</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ margin: '20px 0' }} />
                  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Save Settings
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <div>
              <Typography><strong>Email:</strong> {settings.email}</Typography>
              <Typography><strong>Units:</strong> {settings.units === 'metric' ? 'Metric (meters, bar)' : 'Imperial (feet, psi)'}</Typography>
              <Typography><strong>Language:</strong> {settings.language === 'en' ? 'English' : settings.language === 'es' ? 'Español' : 'Français'}</Typography>
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
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Settings saved successfully"
      />
    </Container>
  );
};

export default Settings;