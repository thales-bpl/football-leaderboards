import { Request, Response, NextFunction } from 'express';
import ErrorFactory from './errorFactory';

const errorHandler = (err: ErrorFactory, _req: Request, res: Response, _next: NextFunction) => {
  // console.error(err.stack);
  console.log(err.status || 500);
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
