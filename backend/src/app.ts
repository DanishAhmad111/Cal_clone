import express, { Application, Request, Response } from 'express';
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

// Health check route - verify backend is running
app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Cal Clone API is running' });
});

// Combine all route domains under /api
app.use('/api', routes);

// Centralized error handling
app.use(errorHandler);

export default app;
