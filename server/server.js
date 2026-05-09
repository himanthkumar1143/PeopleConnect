import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import agricultureRoutes from './routes/agriculture.routes.js';
import healthcareRoutes from './routes/healthcare.routes.js';
import educationRoutes from './routes/education.route.js';
import grievanceRoutes from './routes/grievance.route.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
connectDB();

const app = express();

// Security & logging
app.use(helmet());
app.use(morgan('dev'));

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/agriculture', agricultureRoutes);
app.use('/api/healthcare', healthcareRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/users', userRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌿 VillageConnect server running on port ${PORT}`));
