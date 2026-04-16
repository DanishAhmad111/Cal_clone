import express, { Application } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

const app: Application = express();

// Global Middleware setup
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Combine all route domains under /api
app.use('/api', routes);

// Centralized error handling
app.use(errorHandler);

export default app;
