import 'reflect-metadata';
require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
// imports database connection from index.ts
import './database/';
import 'express-async-errors';
import { router } from './routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://dealership-frontend.vercel.app',
    'https://dealership-frontend-git-testing-rafaelcardamoni.vercel.app',
    'http://localhost:3000'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  app.use(cors());
  next();
});
app.use(router);
app.use('/api', router);
router.options('*', cors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
        type: err.name,
        description: err.stack
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: 'Internal Server Error'
    });
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
