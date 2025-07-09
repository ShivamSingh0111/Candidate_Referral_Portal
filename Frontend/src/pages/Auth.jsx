import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const YellowButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #FFD600 60%, #FFC400 100%)',
  color: '#222',
  fontWeight: 700,
  fontSize: 18,
  borderRadius: 12,
  boxShadow: '0 2px 12px 0 #FFD60055',
  textTransform: 'none',
  height: 48,
  letterSpacing: 1,
  '&:hover': {
    background: 'linear-gradient(90deg, #FFC400 60%, #FFD600 100%)',
    boxShadow: '0 4px 24px 0 #FFD60099',
  },
}));

const OutlinedInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'transparent',
    color: '#FFD600',
    fontWeight: 600,
    fontSize: 16,
    borderRadius: 8,
    paddingLeft: 2,
    '& fieldset': {
      borderColor: '#FFD600',
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: '#FFD600',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFD600',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#FFD600',
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: 0.5,
  },
  '& .MuiInputBase-input': {
    color: '#FFD600',
    fontWeight: 600,
    fontSize: 16,
    padding: '14px 12px',
    '::placeholder': {
      color: '#FFD600',
      opacity: 0.7,
    },
  },
}));

const Auth = ({ onLogin }) => {
  const [tab, setTab] = useState(0);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (_, newValue) => setTab(newValue);

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginForm(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://candidate-referral-portal-9fyf.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.email); // Store email for profile
      onLogin();
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://candidate-referral-portal-9fyf.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      });
      if (!res.ok) throw new Error('Registration failed');
      setSuccess(true);
      setTimeout(() => {
        setTab(0);
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  // Branding left panel
  const Branding = (
    <Box sx={{
      flex: 1.2,
      minWidth: { xs: '100%', sm: 350 },
      maxWidth: { xs: '100%', sm: 500 },
      height: { xs: 'auto', sm: 560 },
      bgcolor: '#191919',
      borderRadius: { xs: '32px 32px 0 0', sm: '32px 0 0 32px' },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      px: { xs: 3, sm: 6 },
      py: { xs: 4, sm: 0 },
      boxShadow: { xs: '0 0 32px 0 #FFD60033', sm: '0 0 64px 0 #FFD60033' },
      position: 'relative',
      width: { xs: '100%', sm: 'auto' },
    }}>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: 110, height: 110, bgcolor: '#111', borderRadius: '50%', boxShadow: '0 0 60px 10px #FFD600', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Typography variant="h2" sx={{ color: '#FFD600', fontWeight: 700, fontFamily: 'serif', letterSpacing: 2, textShadow: '0 0 24px #FFD600', fontSize: 48 }}>R</Typography>
        </Box>
        <Typography variant="h3" sx={{ color: '#FFD600', fontWeight: 800, fontFamily: 'serif', mb: 1, textShadow: '0 0 12px #FFD60099', fontSize: 32, textAlign: 'center', lineHeight: 1.15 }}>
          Referral<br />Web
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#FFD600', fontWeight: 600, mb: 2, letterSpacing: 0.5, fontSize: 18, textAlign: 'center', textShadow: '0 0 8px #FFD60055' }}>
          Candidate Referral Portal
        </Typography>
        <Typography variant="body2" sx={{ color: '#eee', opacity: 0.95, fontWeight: 400, fontSize: 15, textAlign: 'center', maxWidth: 340, fontFamily: 'sans-serif', mt: 1 }}>
          Welcome to the Referral Web Candidate Referral Portal. Login or register to refer candidates for job opportunities and track your referrals with ease.
        </Typography>
      </Box>
    </Box>
  );

  // Auth card right panel
  const AuthCard = (
    <Box sx={{
      flex: 1,
      minWidth: { xs: '100%', sm: 370 },
      maxWidth: { xs: '100%', sm: 440 },
      height: { xs: 'auto', sm: 560 },
      bgcolor: '#181818',
      borderRadius: { xs: '0 0 32px 32px', sm: '0 32px 32px 0' },
      boxShadow: { xs: '0 0 24px 6px #FFD600', sm: '0 0 40px 10px #FFD600' },
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      justifyContent: 'center',
      px: { xs: 3, sm: 6 },
      py: { xs: 4, sm: 4 },
      width: { xs: '100%', sm: 'auto' },
    }}>
     
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 3, mt: 1, bgcolor: '#232323', borderRadius: 3, boxShadow: '0 0 8px #FFD60033',
          '& .MuiTab-root': {
            color: '#FFD600',
            fontWeight: 700,
            fontSize: 20,
            borderRadius: 2,
            minHeight: 48,
            letterSpacing: 1,
            fontFamily: 'inherit',
            textTransform: 'none',
          },
          '& .Mui-selected': {
            color: '#181818',
            bgcolor: '#FFD600',
            borderRadius: 2,
            boxShadow: '0 2px 12px #FFD60055',
            fontWeight: 700,
          },
        }}
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        <Tab label="LOGIN" sx={{ mr: 1 }} />
        <Tab label="SIGN UP" />
      </Tabs>
      <Box sx={{ mt: 1 }}>
        {tab === 0 ? (
          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ color: '#FFD600', fontWeight: 700, mb: 0.5, fontSize: 16, letterSpacing: 0.5 }}>Email Address</Typography>
            <OutlinedInput
              name="email"
              placeholder="Enter your email"
              value={loginForm.email}
              onChange={e => handleChange(e, 'login')}
              required
              fullWidth
              autoComplete="email"
            />
            <Typography sx={{ color: '#FFD600', fontWeight: 700, mb: 0.5, fontSize: 16, letterSpacing: 0.5 }}>Password</Typography>
            <OutlinedInput
              name="password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              value={loginForm.password}
              onChange={e => handleChange(e, 'login')}
              required
              fullWidth
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(s => !s)} edge="end" sx={{ color: '#FFD600' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <YellowButton type="submit" variant="contained" fullWidth sx={{ mt: 1, fontSize: 18 }}>Login</YellowButton>
           
          
          </Box>
        ) : (
          <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ color: '#FFD600', fontWeight: 700, mb: 0.5, fontSize: 16, letterSpacing: 0.5 }}>Email Address</Typography>
            <OutlinedInput
              name="email"
              placeholder="Enter your email"
              value={registerForm.email}
              onChange={e => handleChange(e, 'register')}
              required
              fullWidth
              autoComplete="email"
            />
            <Typography sx={{ color: '#FFD600', fontWeight: 700, mb: 0.5, fontSize: 16, letterSpacing: 0.5 }}>Password</Typography>
            <OutlinedInput
              name="password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              value={registerForm.password}
              onChange={e => handleChange(e, 'register')}
              required
              fullWidth
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(s => !s)} edge="end" sx={{ color: '#FFD600' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <YellowButton type="submit" variant="contained" fullWidth sx={{ mt: 1, fontSize: 18 }}>Sign Up</YellowButton>
          </Box>
        )}
      </Box>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Registration successful! You can now login.
        </Alert>
      </Snackbar>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'radial-gradient(circle at 60% 60%, #232323 60%, #181818 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          borderRadius: 8,
          boxShadow: '0 0 80px 0 #FFD60055',
          overflow: 'hidden',
          bgcolor: 'transparent',
          mt: { xs: 0, sm: 2 },
          mb: { xs: 0, sm: 2 },
          width: { xs: '100%', sm: 'auto' },
          maxWidth: { xs: '100%', sm: 950 },
        }}
      >
        {Branding}
        {AuthCard}
      </Box>
    </Box>
  );
};

export default Auth;
