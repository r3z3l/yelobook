import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';


import userRoutes from './routes/users';
import bookRoutes from './routes/books';
import adminUserRoutes from './routes/admin/users';
import adminBookRoutes from './routes/admin/books';
import authRoutes from './routes/auth';
import reservationRoutes from './routes/reservation';
import { errorMiddleware } from './middleware/errorMiddleware';


dotenv.config();
const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_BASE_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(logger('dev'));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/library')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/books', bookRoutes); 
app.use('/api/admin/users', adminUserRoutes); 
app.use('/api/admin/books', adminBookRoutes); 
app.use('/api/reserve', reservationRoutes);
app.use('/api/auth', authRoutes); 

app.use(errorMiddleware);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
