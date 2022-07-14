import { Request, Response, NextFunction } from 'express';

const MISSING_FIELD = {
  message: "All fields must be filled"
}

const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json(MISSING_FIELD);
  next();
};

export {
  loginValidator,
}