import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import DashboardHeader from '../components/DashboardHeader';

import ReferralForm from '../components/ReferralForm';
import CandidateList from '../components/CandidateList';
import { Grid } from '@mui/material';

const Dashboard = ({ onLogout }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://candidate-referral-portal-9fyf.onrender.com/api/candidates', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch candidates');
        const data = await res.json();
        setCandidates(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <Layout onLogout={onLogout}>
      <DashboardHeader />
     
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
        
          <ReferralForm setCandidates={setCandidates} />
          <CandidateList candidates={candidates} setCandidates={setCandidates} loading={loading} error={error} />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Yahan aap charts, stats by location, ya extra cards add kar sakte hain */}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
