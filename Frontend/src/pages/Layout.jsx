import React from 'react';
import { Box, CssBaseline, Drawer, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppsIcon from '@mui/icons-material/Apps';
import PagesIcon from '@mui/icons-material/Pages';
import LayersIcon from '@mui/icons-material/Layers';

const drawerWidth = 260;

const Layout = ({ children, onLogout }) => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const userEmail = localStorage.getItem('userEmail');
  // Extract name from email (before @, capitalize first letter)
  let userName = '';
  if (userEmail) {
    userName = userEmail.split('@')[0].replace(/\./g, ' ');
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: '#f8fafc' },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ width: 64, height: 64, mb: 1 }} src="/avatar.png" />
          <Typography variant="h6">{userName || 'User'}</Typography>
          <Typography variant="body2" color="text.secondary">ACCOUNT</Typography>
        </Box>
        <List>
          <ListItem selected>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboards" />
          </ListItem>
          <ListItem>
            <ListItemIcon><AppsIcon /></ListItemIcon>
            <ListItemText primary="Apps" />
          </ListItem>
          <ListItem>
            <ListItemIcon><PagesIcon /></ListItemIcon>
            <ListItemText primary="Pages" />
          </ListItem>
          <ListItem>
            <ListItemIcon><LayersIcon /></ListItemIcon>
            <ListItemText primary="Layouts" />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        {isLoggedIn && (
          <Box sx={{ p: 2 }}>
            <Button variant="contained" color="primary" fullWidth onClick={onLogout}>Logout</Button>
          </Box>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh', p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
