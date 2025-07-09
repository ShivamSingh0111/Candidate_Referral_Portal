import React from 'react';
import { TableRow, TableCell, Avatar, Chip, Select, MenuItem, Box, Snackbar, Alert } from '@mui/material';

const statusColors = {
  'ADMIN': 'warning',
  'USER': 'success',
  'MANAGER': 'info',
  'Pending': 'warning',
  'Reviewed': 'info',
  'Hired': 'success',
};

const CandidateCard = ({ candidate, setCandidates }) => {
  const [snack, setSnack] = React.useState('');

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await fetch(`https://candidate-referral-portal-9fyf.onrender.com/api/candidates/${candidate._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      setCandidates(prev => prev.map(c => c._id === candidate._id ? { ...c, status: newStatus } : c));
      setSnack('Status updated!');
    } catch (err) {
      setSnack('Status update failed');
    }
  };

  return (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={candidate.avatarUrl || '/default-avatar.png'} alt={candidate.name} />
          {candidate.name}
        </Box>
      </TableCell>
      <TableCell>{candidate.jobTitle}</TableCell>
      <TableCell>
        <Chip label={candidate.status} color={statusColors[candidate.status] || 'default'} size="small" />
      </TableCell>
    </TableRow>
  );
};

export default CandidateCard;
