import 'reflect-metadata';
require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
// imports database connection from index.ts
import './database/';
import 'express-async-errors';
import { router } from './routes';

const app = express();

app.use(cors({ origin: 'https://dealership-frontend.vercel.app/' }));

app.use(express.json());
app.use(router);
app.use('/api', router);

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
