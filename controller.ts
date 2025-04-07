import { Request, Response } from 'express';
import * as userService from './service';

export function welcome(req: Request, res: Response) {
  res.send('Welcome to the Usaaaers API!');
}

export function getUsers(req: Request, res: Response) {
  res.type('json').send(JSON.stringify(userService.getAllUsers(), null, 2));
}

export function countUsers(req: Request, res: Response) {
  res.json({ userCount: userService.countUsers() });
}

export function countWomen(req: Request, res: Response) {
  res.json({ womenCount: userService.countWomen() });
}

export function getUserById(req: Request, res: Response) {
  const user = userService.getUserById(parseInt(req.params.id));
  res.json(user);
}

export function getUsersByEmail(req: Request, res: Response) {
  const domain = req.params.domain;
  const users = userService.getUsersByEmailDomain(domain);
  res.json(users);
}

export function getTshirt(req: Request, res: Response) {
  const { id } = req.params;
  const { logo } = req.body;
  res.send({
    tshirt: `tshirt with your logo ${logo} and an ID of ${id}`
  });
}
