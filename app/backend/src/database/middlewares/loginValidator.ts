import { Request, Response, NextFunction } from 'express';
import ErrorFactory from '../utils/errorFactory';

const MISSING_FIELD = {
  message: "All fields must be filled"
}

const missingField = new ErrorFactory(400, "All fields must be filled");

const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // if (!email || !password) return res.status(400).json(MISSING_FIELD);
  if (!email || !password) next(missingField);
  next();
};

export {
  loginValidator,
}