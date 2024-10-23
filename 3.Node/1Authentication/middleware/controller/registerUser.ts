import { Request, Response, NextFunction } from 'express';
import { getXataClient } from '../../src/xata';
import { CustomError } from '../errors/customErrors';
import bcrypt from 'bcrypt'; 

const client = getXataClient();

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await client.db.userInfo.filter({ email }).getFirst();
    if (existingUser) {
      res.status(409).json({ message: 'User with this email already exists' });
      return;
    }

    const allUsers = await client.db.userInfo.getAll();
    let person_id = 1;
    if (allUsers.length > 0) {
      person_id = Math.max(...allUsers.map(user => user.person_id)) + 1;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    await client.db.userInfo.create({
      email,
      password: hashedPassword, // Store the hashed password
      name,
      person_id
    });

    res.status(201).json({ message: 'User registered successfully', person_id });
  } catch (error) {
    next(new CustomError('Error during registration', 500));
  }
};
