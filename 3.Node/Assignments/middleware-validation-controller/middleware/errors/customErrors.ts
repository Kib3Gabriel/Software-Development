// import { Request, Response, NextFunction } from "express";

// const error = new Error();

// interface CustomError extends Error{
//     status ?:number
// }

// const errorHandler =(error:any, req:Request, res:Response, next:NextFunction)=>{
//     const statusCode = error.status || 500;
//     const errorMessage = error.Message || 'Internal server error';

//     res.status(statusCode).json({message:errorMessage});
// }


// export {CustomError, errorHandler};




import { Request, Response, NextFunction } from "express";

// Define a custom error class that extends the built-in Error class
class CustomError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 500; 
  }
}

// Error handling middleware function
const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500;
  const errorMessage = error.message || 'Internal server error';

  res.status(statusCode).json({ message: errorMessage });
};

export { CustomError, errorHandler };
