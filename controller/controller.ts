import { Request, Response } from 'express';
import * as userService from '../service/service';

export async function welcome(req: Request, res: Response) {
  res.send('Welcome to the Useaaars API!');
}

export async function getUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();
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

export async function getUsersByEmail(req: Request, res: Response) {
    const domain = req.params.domain;
    const users = await userService.getUsersByEmail(domain);
    res.json(users);
}
