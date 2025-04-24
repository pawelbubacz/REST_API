import { Request, Response } from 'express';
import * as userService from '../database-service/database-service.ts';

export const welcome = (req: Request, res: Response) => {
  res.send('Welcome to the Users API!');
};

export const getUsers = async (req: Request, res: Response) => {
  const filters = Object.fromEntries(
    Object.entries(req.query).map(([key, value]) => [key, String(value)])
  );
  const users = await userService.getFilteredUsers(filters);
  res.json(users);
};

export const countUsers = async (req: Request, res: Response) => {
  const userCount = await userService.countUsers();
  res.json({ userCount });
};

export const countWomen = async (req: Request, res: Response) => {
  const womenCount = await userService.countWomen();
  res.json({ womenCount });
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(parseInt(req.params.id));
  res.json(user);
};

export const getUsersByDomain = async (req: Request, res: Response) => {
  const domain = req.params.domain;
  const users = await userService.getUsersByDomain(domain);
  res.json(users);
};

export const addUsers = async (req: Request, res: Response) => {
  try {
    const newUsers = req.body;
    const createdUsers = await userService.addUsers(newUsers);
    res.status(201).json(createdUsers);
  } catch {
    res.status(500).json({ error: 'Failed to add users' });
  }
};