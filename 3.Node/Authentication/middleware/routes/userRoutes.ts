import express from 'express';
import { validateRegistration , validateUpdate} from '../validator/requestValidation';
import { getAllUsers, getUserById, registerUser, updateUser, deleteUser } from "../controller/userController";


const router = express.Router();

router.get('/', )
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/register', validateRegistration, registerUser);
router.put('/update/:id', validateUpdate, updateUser);

router.delete('/users/:id', deleteUser);

export {router};