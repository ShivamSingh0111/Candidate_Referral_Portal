import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://candidate-referral-portal-9fyf.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Registration failed');
      setSuccess(true);
      setTimeout(() => onRegister(), 1500);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f4f6f8' }}>
      <Paper sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2}>Register</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="email" label="Email" value={form.email} onChange={handleChange} required />
          <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required />
          <Button type="submit" variant="contained">Register</Button>
        </Box>
        <Typography variant="body2" mt={2}>
          Already have an account? <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={onRegister}>Login</span>
        </Typography>
        <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
        <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Registration successful! Redirecting to login...
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default Register;
