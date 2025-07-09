require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const candidateRoutes = require('./routes/candidateRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // frontend dev server
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/candidates', candidateRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

module.exports = app;