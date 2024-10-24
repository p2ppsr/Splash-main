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
import logoLight from '../assets/splashlogo-lite.png';
import logoDark from '../assets/splashlogo-dark.png';

const NavMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

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
          <img src={logoLight} alt="Logo" style={{ height: 40 }} />
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
          backgroundColor: mode === 'dark' ? '#121212' : '#ffffff',
          boxShadow: 'none',
          borderBottom: `1px solid ${mode === 'dark' ? '#333333' : '#e0e0e0'}`
        }}
      >
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between',
            backgroundColor: mode === 'dark' ? '#121212' : '#ffffff',
          }}
        >
          {isMobile ? (
            <>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: mode === 'dark' ? '#ffffff' : '#000000',
                }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                sx={{ 
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <img 
                  src={mode === 'dark' ? logoDark : logoLight} 
                  alt="Logo" 
                  style={{ height: 40 }} 
                />
              </Box>
            </>
          ) : (
            <>
              <Box display="flex" alignItems="center">
                <img 
                  src={mode === 'dark' ? logoDark : logoLight} 
                  alt="Logo" 
                  style={{ height: 40, marginRight: 16 }} 
                />
              </Box>
              <Tooltip title="Login with MetaNet ID">
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={handleLoginClick}
                >
                  Login with MetaNet ID
                </Button>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={isMobile ? handleDrawerToggle : undefined}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              backgroundColor: mode === 'dark' ? '#121212' : '#ffffff',
              color: mode === 'dark' ? '#ffffff' : '#000000',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Dialog 
        open={modalOpen} 
        onClose={handleCloseModal}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        <DialogTitle>MetaNet ID verified</DialogTitle>
        <DialogContent>
          <Typography>Your MetaNet ID has been successfully verified.</Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseModal} 
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: '#ffffff',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavMenu;
