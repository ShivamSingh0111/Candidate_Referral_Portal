import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';

const stats = [
  {
    label: 'Current Target',
    value: '$12,920',
    change: '+31.5%',
    positive: true,
    icon: <TrendingUpIcon color="success" />,
  },
  {
    label: 'Earnings',
    value: '$3,642',
    change: '+51.5%',
    positive: true,
    icon: <AttachMoneyIcon color="success" />,
  },
  {
    label: 'Website Traffic',
    value: '8,391',
    change: '-3.5%',
    positive: false,
    icon: <PersonIcon color="action" />,
  },
];

const StatCards = () => (
  <Grid container spacing={3} sx={{ mb: 3 }}>
    {stats.map((stat, idx) => (
      <Grid item xs={12} md={4} key={idx}>
        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" gutterBottom>{stat.label}</Typography>
              {stat.icon}
            </Box>
            <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
            <Typography variant="body2" color={stat.positive ? 'success.main' : 'error.main'}>
              {stat.change} {stat.positive ? <TrendingUpIcon fontSize="small" color="success" /> : <TrendingDownIcon fontSize="small" color="error" />}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default StatCards;
