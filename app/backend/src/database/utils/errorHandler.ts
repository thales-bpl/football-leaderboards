import { Request, Response, NextFunction } from 'express';
import ErrorFactory from './errorFactory';

const errorHandler = (err: ErrorFactory, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  if (err._status) return res.status(err._status).json({ message: err.message })
  return res.status(500).json({ message: "Internal Server Error" })
};

export default errorHandler;