import { buildClient } from "@xata.io/client";
import { getXataClient } from "./xata";
import dotenv from 'dotenv'
import express, {Request, Response,NextFunction} from 'express'

import { CustomError, errorHandler } from "../middleware/errors/customErrors";
import {router} from '../middleware/routes/userRoutes';

const PORT = 3111

const client = getXataClient();

dotenv.config();
const app= express();
//middleware to parse JSON bodies
app.use(express.json()); 

interface RegistrationRequest{
    name:string;
    email:string;
    password:string;
    person_id:number;
}
app.get('/', (req:Request, res:Response)=>{
    res.send('Server working ...')
});

app.use(router);
app.use(errorHandler);

app.listen(PORT, async() =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})