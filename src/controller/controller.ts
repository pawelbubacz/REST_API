import { Request, Response } from 'express';
import * as userService from '../service/service';

export async function welcome(req: Request, res: Response) {
  res.send('Welcome to the Users API!');
}

export async function getUsers(req: Request, res: Response) {
    const filters = Object.fromEntries(
        Object.entries(req.query).map(([key, value]) => [key, String(value)])
    );
    const users = await userService.getFilteredUsers(filters);
    res.json(users);
}

export async function countUsers(req: Request, res: Response) {
    const userCount = await userService.countUsers();
    res.json({ userCount });
}

export async function countWomen(req: Request, res: Response) {
    const womenCount = await userService.countWomen();
    res.json({ womenCount });
}

export async function getUserById(req: Request, res: Response) {
    const user = await userService.getUserById(parseInt(req.params.id));
    res.json(user);
}

export async function getUsersByDomain(req: Request, res: Response) {
    const domain = req.params.domain;
    const users = await userService.getUsersByDomain(domain);
    res.json(users);
}

export async function addUsers(req: Request, res: Response) {
    try {
        const newUsers = req.body;
        const createdUsers = await userService.addUsers(newUsers);
        res.status(201).json(createdUsers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add users' });
    }
}