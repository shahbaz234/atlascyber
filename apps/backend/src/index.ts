import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { authRouter } from './routes/auth.routes';
import { assetRouter } from './routes/asset.routes';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(morgan('combined'));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests, please try again later',
});

app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/assets', assetRouter);

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'backend' }));

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

export default app;
