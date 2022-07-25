import { Request, Response, NextFunction } from 'express';
import ErrorFactory from '../utils/errorFactory';
import { verifyToken } from '../utils/jwt';

const missingToken = new ErrorFactory(401, 'Token must be provided');
const unauthorizedToken = new ErrorFactory(401, 'Token must be a valid token');

const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const token = authorization as string;
  if (!token) next(missingToken);

  if (token) {
    try {
      const authorized = await verifyToken(token);
      req.body.email = authorized.email;
    } catch (error) {
      next(unauthorizedToken);
    }
  }

  next();
};

export default tokenValidator;
