import { Request, Response, NextFunction } from 'express';
import { getXataClient } from '../../src/xata';
import { CustomError } from '../errors/customErrors';

const client = getXataClient();

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const personData = await client.db.userInfo.getAll();
    res.send(personData);
  } catch (error) {
    next(new CustomError('Error fetching data', 500));
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const person_id = Number(req.params.id);

  try {
    const person = await client.db.userInfo.filter({ person_id }).getFirst();

    if (!person) {
      next(new CustomError('Invalid ID format. ID must be a number', 400));
    } else {
      res.json(person);
    }
  } catch (error) {
    next(new CustomError(`Error fetching data for person_id ${person_id}`, 500));
  }
};

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

    await client.db.userInfo.create({
      email,
      password,
      name,
      person_id
    });

    res.status(201).json({ message: 'User registered successfully', person_id });
  } catch (error) {
    next(new CustomError('Error during registration', 500));
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, name } = req.body;
  const personId: number = parseInt(req.params.id);

  try {
    const personData = await client.db.userInfo.filter({ person_id: personId }).getFirst();
    if (!personData) {
      next(new CustomError('User not found with the provided ID', 404));
      return;
    }

    const { xata_id } = personData;
    await client.db.userInfo.update(xata_id!, { password, name });

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    next(new CustomError(`Error updating user with id ${personId}`, 500));
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const personId: number = parseInt(req.params.id);

  try {
    const personData = await client.db.userInfo.filter({ person_id: personId }).getFirst();
    if (!personData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await client.db.userInfo.delete(personData.xata_id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(new CustomError(`Error deleting user with person_id ${personId}`, 500));
  }
};
