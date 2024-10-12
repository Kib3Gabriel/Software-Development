import { buildClient } from "@xata.io/client";
import { getXataClient } from "./xata";
import dotenv from 'dotenv'
import express, {Request, Response,Express} from 'express'

const PORT = 3100

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
}


app.get('/', (req:Request, res:Response)=>{
    res.send('Server working ...')
});
app.get('/user', async(req:Request, res:Response) =>{
    try{
        const personData = await client.db.personInfo.getAll();
        res.send(personData);
    }catch(error){
        console.error(`Error fetching data: ${error}`);
        res.status(500).send('An error occurred while retrieving data')
    }
})

app.get('/user/:name', async (req:Request, res:Response) =>{
    const personName:string = req.params.name.toLowerCase();
    try{
        const personData = await client.db.personInfo.getAll();
        const foundPerson = personData.find( person => person.name?.toLowerCase() === personName);

        if(foundPerson){
            res.send(foundPerson);
        }else{
            res.status(404).send("Person not found");
        }
    }catch (error){
        console.log(`Error fetching data for person ${personName}: ${error}`);
        res.status(500).send('An error occurred while retrieving data.');
    }
});

app.post('/register', async (req: Request<{}, {}, RegistrationRequest>, res: Response) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        res.status(400).json({ message: 'All fields are required' }); // Return after sending response
    }

    const client = getXataClient();

    try {
        // Hash the password before saving it to the database
        //const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the Xata database
        await client.db.personInfo.create({
            email,
            password: password, // Store the hashed password
            name
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE endpoint to remove a user by email
app.delete('/user/:email', async (req: Request, res: Response) => {
    const userEmail: string = req.params.email.toLowerCase();

    try {
        // Search for the user by email
        const personData = await client.db.personInfo.filter({ email: userEmail }).getFirst();

        if (!personData) {
            res.status(404).json({ message: 'User not found' });
        } else {
            // Assuming `personData` contains the record's unique ID field, use it to delete
            await client.db.personInfo.delete(personData.xata_id || personData.email); 
            res.status(200).json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        console.error(`Error deleting user with email ${userEmail}: ${error}`);
        res.status(500).json({ message: 'Server error' });
    }
});






app.listen(PORT, async() =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})