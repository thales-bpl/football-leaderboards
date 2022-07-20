import { Request, Response, NextFunction } from 'express';

class ErrorFactory extends Error {
  public _status: number;

  constructor (status: number, message: string) {
    super(message);
    this._status = status;
  };
}

export default ErrorFactory;