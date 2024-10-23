import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 500; 
  }
}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500;
  const errorMessage = error.message || 'Internal server error';

  res.status(statusCode).json({ message: errorMessage });
};

export { CustomError, errorHandler };
