import { Request, Response, NextFunction } from 'express';
import ErrorFactory from '../utils/errorFactory';

const missingField = new ErrorFactory(400, 'All fields must be filled');

const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) next(missingField);
  next();
};

export default loginValidator;
