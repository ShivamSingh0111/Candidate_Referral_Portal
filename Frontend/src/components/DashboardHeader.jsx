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
    <Alert severity="info" sx={{ mt: 2 }}>
      Welcome to the Candidate Referral Portal! Here you can manage your referrals and track their progress.  
      If you have any questions, feel free to reach out to support.
    </Alert>
    
  </Box>
);

export default DashboardHeader;
