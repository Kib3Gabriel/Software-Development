// import { buildClient } from "@xata.io/client";
// import { getXataClient } from "./xata";
// import dotenv from 'dotenv'
// import express, {Request, Response,Express} from 'express'

// const PORT = 3100

// const client = getXataClient();

// dotenv.config();
// const app= express();
// //middleware to parse JSON bodies
// app.use(express.json()); 

// //Define an interface for the request body
// interface RegistrationRequest{
//     name:string;
//     email:string;
//     password:string;
// }


// app.get('/', (req:Request, res:Response)=>{
//     res.send('Server working ...')
// });
// app.get('/user', async(req:Request, res:Response) =>{
//     try{
//         const personData = await client.db.userInfo.getAll();
//         res.send(personData);
//     }catch(error){
//         console.error(`Error fetching data: ${error}`);
//         res.status(500).send('An error occurred while retrieving data')
//     }
// })


// app.get('/user/:id', async (req:Request, res:Response) =>{
//     const person_id= Number(req.params.id);

//     try{
//         const person = await client.db.userInfo.filter({person_id}).getFirst();

//         if(!person){
//             res.status(404).json({message:'Person not found'});
//         }else{
//             res.json(person);
//         }
//     }catch(error){
//         console.error(`Erro fetching data for person_id ${person_id} ${error}`);
//         res.status(500).send('An error occurred while retrieving data.')
//     }
// });


// //POST
// app.post('/register', async (req: Request, res: Response) => {
//     const { email, password, name } = req.body; // Include person_id if necessary

//     if (!email || !password || !name) { 
//         res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         // Check if a user with the same email already exists
//         const existingUser = await client.db.userInfo.filter({ email }).getFirst();
//         if (existingUser) {
//             res.status(409).json({ message: 'User with this email already exists' });
//         }

//         // Get all users and calculate the next person_id
//         const allUsers = await client.db.userInfo.getAll();
//         let person_id = 1;  // Default to 1 if no users exist

//         if (allUsers.length > 0) {
//             person_id = Math.max(...allUsers.map(user => user.person_id)) + 1;
//         }

//         // Create a new user in the Xata database
//         await client.db.userInfo.create({
//             email,
//             password, // You may want to hash the password here before storing
//             name,
//             person_id
//         });

//         res.status(201).json({ message: 'User registered successfully', person_id });
//     } catch (error) {
//         console.error(`Error during registration: ${error}`);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// //PUT
// app.put('/update/:id', async (req: Request, res: Response) => {
//     const { email, password, name } = req.body;
//     const personId: number = parseInt(req.params.id);

//     // Validate the provided id
//     if (isNaN(personId)) {
//         res.status(400).json({ message: 'Invalid ID format. ID must be a number.' });
//     }

//     // Ensure that both password and name are provided and not empty
//     if (!password || password.trim() === '' || !name || name.trim() === '') {
//         res.status(400).json({ message: 'Both name and password fields are required and cannot be empty.' });
//     }

//     try {
//         // Find the user by person_id
//         const personData = await client.db.userInfo.filter({ person_id: personId }).getFirst(); // Use userInfo

//         if (!personData) {
//             // If no user is found with the provided person_id, return an error
//             res.status(404).json({ message: 'User not found with the provided ID.' });
//             return
//         }

//         // Destructure to get the xata_id
//         const { xata_id } = personData;

//         // Update the user's data in the Xata database
//         await client.db.userInfo.update(xata_id!, {
//             password, // Optionally hash the password
//             name
//         });

//         res.status(200).json({ message: 'User updated successfully' });
//     } catch (error) {
//         console.error(`Error updating user with id ${personId}: ${error}`);
//         res.status(500).json({ message: 'Server error' });
//     }
// });





// // DELETE endpoint to remove a user by email
// app.delete('/delete/:id', async (req: Request, res: Response) => {
//     const personId:number = parseInt(req.params.id);


//     if (isNaN(personId)) {
//         res.status(400).json({ message: 'Invalid ID format. ID must be a number.' });
//     }

//     try{
//         const personData = await client.db.userInfo.filter({person_id:personId}).getFirst();

//         if(!personData){
//             res.status(404).json({message:"User Not found"})
//             return;
//         }else{
//             await client.db.userInfo.delete(personData.xata_id);
//             res.status(200).json({message: 'User deleted successfully...'})
//         }
//     }catch (error){
//         console.log(`Error  deleting user with person_id ${personId}: ${error}`);
//         res.status(500).json({message:'Server error'});
//     }

   
// });


// app.listen(PORT, async() =>{
//     console.log(`Server is running at http://localhost:${PORT}`);
// })






import { buildClient } from "@xata.io/client";
import { getXataClient } from "./xata";
import dotenv from 'dotenv'
import express, {Request, Response,NextFunction} from 'express'

import { CustomError, errorHandler } from "../middleware/errors/customErrors";
// import{resolveUserById} from '../middleware/resolveUserById';

const PORT = 3111

const client = getXataClient();

dotenv.config();
const app= express();
//middleware to parse JSON bodies
app.use(express.json()); 

//Define an interface for the request body
interface RegistrationRequest{
    name:string;
    email:string;
    password:string;
    person_id:number;
}


app.get('/', (req:Request, res:Response)=>{
    res.send('Server working ...')
});
app.get('/user', async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const personData = await client.db.userInfo.getAll();
        res.send(personData);
    }catch(error){
        // console.error(`Error fetching data: ${error}`);
        // res.status(500).send('An error occurred while retrieving data')
        next(new CustomError('Error fetching data', 500));
    }
})


app.get('/user/:id', async (req:Request, res:Response, next:NextFunction) =>{
    const person_id= Number(req.params.id);

    try{
        const person = await client.db.userInfo.filter({person_id}).getFirst();

        if(!person){
            // res.status(404).json({message:'Person not found'});
            next(new CustomError('Invalid ID formart. ID must be a number', 400));
            
        }else{
            res.json(person);
        }
    }catch(error){
        // console.error(`Erro fetching data for person_id ${person_id} ${error}`);
        // res.status(500).send('An error occurred while retrieving data.')
        next(new CustomError(`Error fetching data for person_id ${person_id}`, 500));
    }
});


//POST
app.post('/register', async (req: Request, res: Response, next:NextFunction) => {
    const { email, password, name } = req.body; // Include person_id if necessary

    if (!email || !password || !name) { 
        // res.status(400).json({ message: 'All fields are required' });
        next(new CustomError('All fields are required', 400));
    }

    try {
        // Check if a user with the same email already exists
        const existingUser = await client.db.userInfo.filter({ email }).getFirst();
        if (existingUser) {
            res.status(409).json({ message: 'User with this email already exists' });

        }

        // Get all users and calculate the next person_id
        const allUsers = await client.db.userInfo.getAll();
        let person_id = 1;  // Default to 1 if no users exist

        if (allUsers.length > 0) {
            person_id = Math.max(...allUsers.map(user => user.person_id)) + 1;
        }

        // Create a new user in the Xata database
        await client.db.userInfo.create({
            email,
            password, // You may want to hash the password here before storing
            name,
            person_id
        });

        res.status(201).json({ message: 'User registered successfully', person_id });
    } catch (error) {
        // console.error(`Error during registration: ${error}`);
        // res.status(500).json({ message: 'Server error' });
        next(new CustomError('Error during registration', 500));
    }
});



//PUT
app.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    const personId: number = parseInt(req.params.id);

    // Validate the provided id
    if (isNaN(personId)) {
        // =res.status(400).json({ message: 'Invalid ID format. ID must be a number.' });
        next(new CustomError('Invalid ID format. ID must be a number.', 400))
    }

    // Ensure that both password and name are provided and not empty
    if (!password || password.trim() === '' || !name || name.trim() === '') {
        // res.status(400).json({ message: 'Both name and password fields are required and cannot be empty.' });
        next(new CustomError('Both name and password fields are required and cannot be empty.', 400));
    }

    try {
        // Find the user by person_id
        const personData = await client.db.userInfo.filter({ person_id: personId }).getFirst(); // Use userInfo

        if (!personData) {
            // If no user is found with the provided person_id, return an error
            // res.status(404).json({ message: 'User not found with the provided ID.' });
            

            next(new CustomError('User not found with the provided ID', 404))
            return
        }

        // Destructure to get the xata_id
        const { xata_id } = personData;

        // Update the user's data in the Xata database
        await client.db.userInfo.update(xata_id!, {
            password, // Optionally hash the password
            name
        });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        // console.error(`Error updating user with id ${personId}: ${error}`);
        // res.status(500).json({ message: 'Server error' });
        next(new CustomError(`Error updating user with id ${personId}`, 500));
    }
});





// DELETE endpoint to remove a user by email
app.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const personId:number = parseInt(req.params.id);


    if (isNaN(personId)) {
        next(new CustomError('Invalid ID format. ID must be a number.', 400));
    } else {
    }

    try{
        const personData = await client.db.userInfo.filter({person_id:personId}).getFirst();

        if(!personData){
            res.status(404).json({ message: 'User not found' });
        }else{
            await client.db.userInfo.delete(personData.xata_id);
            res.status(200).json({message: 'User deleted successfully...'})
            
        }
    }catch (error){
        next(new CustomError(`Error deleting user with person_id ${personId}`, 500));
    }

   
});


app.use(errorHandler);


app.listen(PORT, async() =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})