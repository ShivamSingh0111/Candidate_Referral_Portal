import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Tabs, Tab } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';

const activities = [
  { name: 'Jenell D. Matney', time: '4 days ago', amount: '$573', icon: <AttachMoneyIcon color="primary" /> },
  { name: 'Sherri J. Cardenas', time: '3 days ago', amount: '', icon: <EmailIcon color="success" /> },
  { name: 'Joseph S. Ferland', time: '2 days ago', amount: '$244', icon: <AttachMoneyIcon color="primary" /> },
  { name: 'Bryan K. Davis', time: '1 day ago', amount: '$664', icon: <AttachMoneyIcon color="primary" /> },
  { name: 'Kaci M. Langston', time: 'just now', amount: '$631', icon: <DescriptionIcon color="info" /> },
];

const RecentActivity = () => (
  <Card sx={{ borderRadius: 2, mb: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>Recent Activity</Typography>
      <Tabs value={0} sx={{ mb: 2 }}>
        <Tab label="All" />
        <Tab label="Purchases" />
        <Tab label="Emails" />
        <Tab label="Quotes" />
      </Tabs>
      <List>
        {activities.map((a, idx) => (
          <ListItem key={idx} divider={idx !== activities.length - 1}>
            <ListItemAvatar>
              <Avatar>{a.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={a.name} secondary={a.time} />
            <Typography variant="body2">{a.amount}</Typography>
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default RecentActivity;
