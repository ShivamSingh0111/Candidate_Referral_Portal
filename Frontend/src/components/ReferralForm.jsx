import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';

const ReferralForm = ({ setCandidates }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    resume: null
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://candidate-referral-portal-9fyf.onrender.com/api/candidates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (!res.ok) throw new Error('Failed to refer candidate');
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', jobTitle: '', resume: null });
      // Fetch updated candidates and update parent
      const fetchRes = await fetch('https://candidate-referral-portal-9fyf.onrender.com/api/candidates', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (fetchRes.ok) {
        const data = await fetchRes.json();
        setCandidates(data);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField name="name" label="Candidate Name" value={form.name} onChange={handleChange} required size="small" />
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} required size="small" />
        <TextField name="phone" label="Phone Number" value={form.phone} onChange={handleChange} required size="small" />
        <TextField name="jobTitle" label="Job Title" value={form.jobTitle} onChange={handleChange} required size="small" />
        <Button variant="contained" component="label" size="small">
          Upload Resume (PDF)
          <input type="file" name="resume" accept="application/pdf" hidden onChange={handleChange} />
        </Button>
        {form.resume && (
          <Box sx={{ ml: 1, alignSelf: 'center', color: '#1976d2', fontSize: 14 }}>
            {typeof form.resume === 'object' ? form.resume.name : form.resume}
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary" size="small">Refer Candidate</Button>
      </Box>
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Candidate referred successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ReferralForm;
