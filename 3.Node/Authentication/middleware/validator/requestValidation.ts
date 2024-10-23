import {Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/customErrors';



export const validateRegistration  =(req:Request, res:Response, next:NextFunction) =>{
    const {email, password, name} = req.body;

    if(!email || ! password || !name){
        return next(new CustomError('All fields are required', 400));
    }
    next();
}

export const validateUpdate =(req:Request, res:Response, next:NextFunction) =>{
 const {name, password}   = req.body;

 if(!name || !password){
    return next(new CustomError("Both password and name are required", 400));
 }
 next();
}