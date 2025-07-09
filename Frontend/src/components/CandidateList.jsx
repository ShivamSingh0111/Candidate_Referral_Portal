import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, InputLabel, FormControl, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import CandidateCard from './CandidateCard';

const CandidateList = ({ candidates, setCandidates, loading, error }) => {
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');

  // Filter logic here
  const filtered = candidates.filter(c =>
    (
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
      c.status?.toLowerCase().includes(search.toLowerCase())
    ) &&
    (status ? c.status === status : true)
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Type a name"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>All Statuses</InputLabel>
          <Select
            value={status}
            label="All Statuses"
            onChange={e => setStatus(e.target.value)}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Reviewed">Reviewed</MenuItem>
            <MenuItem value="Hired">Hired</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Snackbar open={!!error} autoHideDuration={4000}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      ) : candidates.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 4, color: 'gray' }}>No candidates found.</Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(candidate => (
                <CandidateCard key={candidate._id} candidate={candidate} setCandidates={setCandidates} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CandidateList;
