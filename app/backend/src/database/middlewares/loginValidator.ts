import { Request, Response, NextFunction } from 'express';
import ErrorFactory from '../utils/errorFactory';

const MISSING_FIELD = new ErrorFactory(400, 'All fields must be filled');

// TO-DO: VALIDAR FORMAT DO EMAIL E PASSWORD (JOI?);
const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) next(MISSING_FIELD);
  next();
};

export default loginValidator;
