import React from 'react';
import { Box, Typography, Button, Breadcrumbs, Link, Alert } from '@mui/material';

const DashboardHeader = () => (
  <Box sx={{ mb: 3 }}>
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="#">HOME</Link>
      <Link underline="hover" color="inherit" href="#">DASHBOARD</Link>
    </Breadcrumbs>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
      <Typography variant="h3" fontWeight={700}>Dashboard</Typography>
      <Button variant="contained" color="success">New Report</Button>
    </Box>
    <Alert severity="warning" sx={{ mt: 2 }}>
      <b>API gateways are now Offline.</b> Please try the API later. If you want to stay up to date follow our <a href="#" style={{ color: '#1976d2' }}>Status Page</a>
    </Alert>
  </Box>
);

export default DashboardHeader;
