import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import slotRoutes from './routes/slots.js';
import zoneRoutes from './routes/zones.js';

dotenv.config();

const app = express();

/* ✅ CORS — FIXED & SAFE */
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/slots', slotRoutes);
app.use('/api/zones', zoneRoutes);

app.listen(5001, () => {
  console.log('Backend running on http://localhost:5001');
});
