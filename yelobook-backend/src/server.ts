import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import bookRoutes from './routes/books';
import adminUserRoutes from './routes/admin/users';
import adminBookRoutes from './routes/admin/books';
import authRoutes from './routes/auth';

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/library')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/books', adminBookRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
