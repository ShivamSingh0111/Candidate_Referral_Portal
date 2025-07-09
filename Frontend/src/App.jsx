import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import { Box } from '@mui/material';
import { GlobalStyles } from '@mui/material';

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setAuth(true);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <>
      <GlobalStyles styles={{
        body: { background: '#181818 !important', minHeight: '100vh' },
        html: { background: '#181818 !important', minHeight: '100vh' }
      }} />
      <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'radial-gradient(circle at 60% 60%, #232323 60%, #181818 100%)' }}>
        {!auth ? <Auth onLogin={handleLogin} /> : <Dashboard onLogout={handleLogout} />}
      </Box>
    </>
  );
}

export default App;
