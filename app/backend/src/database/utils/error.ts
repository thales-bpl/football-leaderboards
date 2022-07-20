import { Request, Response, NextFunction } from 'express';
// import { Error } from '../interfaces/interfaces';

// const errorMiddleware = (error: Error,req: Request, res: Response, next: NextFunction) => {
// 	if ()
// 	return res.status().json();
// }

class ErrorFactory extends Error {
  private _status: number;

  constructor (status: number, message: string) {
    super(message);
    this._status = status;
  };
}

export default ErrorFactory;