import React, { useState, useContext, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import BuildIcon from '@mui/icons-material/Build';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReportIcon from '@mui/icons-material/Report';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { ThemeContext } from '../ThemeContext';
import logo from '../assets/splashlogo-dark.png';

const NavMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/dashboard');
  };

  useEffect(() => {
    if (isMediumScreen) {
      setMobileOpen(false);
    }
  }, [isMediumScreen]);

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Dive Logs', path: '/divelogs', icon: <BookIcon /> },
    { text: 'Equipment', path: '/equipment', icon: <BuildIcon /> },
    { text: 'Qualifications', path: '/qualifications', icon: <VerifiedUserIcon /> },
    { text: 'Reports', path: '/reports', icon: <ReportIcon /> },
    { text: 'Profile', path: '/profile', icon: <PersonIcon /> },
    { text: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
        </Box>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            component={Link} 
            to={item.path} 
            key={item.text}
            onClick={isMobile ? handleDrawerToggle : undefined}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: mode === 'dark' ? '#333' : '#fff'
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
          <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
          </Box>
          {!isMobile && (
            <Tooltip title="Login with MetaNet ID">
              <Button color="inherit" onClick={handleLoginClick}>
                Login with MetaNet ID
              </Button>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>MetaNet ID verified</DialogTitle>
        <DialogContent>
          <Typography>Your MetaNet ID has been successfully verified.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" variant="contained">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavMenu;