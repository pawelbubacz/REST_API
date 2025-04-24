import { Request, Response } from 'express';
import * as userService from '../database-service/database-service';

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

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id, domain } = req.query;

    if (id) {
      const user = await userService.getUserById(Number(id));
      res.json(user);
      return;
    }
    if (domain) {
      const users = await userService.getUsersByDomain(String(domain));
      res.json(users);
      return;
    }
    res.status(400).json({ error: 'Missing id or domain parameter' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
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