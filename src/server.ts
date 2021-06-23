import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import "./database";
import { router } from "./routes";
import { HttpError } from "./exceptions/httpError";

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => { 
  console.log(err);
  console.log(err instanceof HttpError);
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  } else if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }

  return res.status(500).json({ 
    status: 'Error',
    message: 'Internal Server Error'
  });
});

app.listen(3000, () => { console.log('Server is running!') });