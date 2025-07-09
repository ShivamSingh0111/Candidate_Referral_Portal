import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';

const Login = ({ onLogin, onShowRegister }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://candidate-referral-portal-9fyf.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      onLogin();
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f4f6f8' }}>
      <Paper sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2}>Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="email" label="Email" value={form.email} onChange={handleChange} required />
          <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required />
          <Button type="submit" variant="contained">Login</Button>
        </Box>
        <Typography variant="body2" mt={2}>
          Don't have an account? <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={onShowRegister}>Register</span>
        </Typography>
        <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default Login;
