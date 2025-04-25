import { Request, Response } from 'express';
import * as userService from '../database-service/database-service';
import logger from '../logger';

export const welcome = (req: Request, res: Response) => {
  logger.info('Welcome endpoint called');
  res.send('Welcome to the Users API!');
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const filters = Object.fromEntries(
      Object.entries(req.query).map(([key, value]) => [key, String(value)])
    );
    logger.info(`getUsers called with filters: ${JSON.stringify(filters)}`);
    const users = await userService.getFilteredUsers(filters);
    res.json(users);
  } catch (err) {
    logger.error('Error in getUsers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const countUsers = async (req: Request, res: Response) => {
  try {
    logger.info('countUsers endpoint called');
    const userCount = await userService.countUsers();
    res.json({ userCount });
  } catch (err) {
    logger.error('Error in countUsers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const countWomen = async (req: Request, res: Response) => {
  try {
    logger.info('countWomen endpoint called');
    const womenCount = await userService.countWomen();
    res.json({ womenCount });
  } catch (err) {
    logger.error('Error in countWomen:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id, domain } = req.query;

    if (id) {
      logger.info(`getUser called with id: ${id}`);
      const user = await userService.getUserById(Number(id));
      res.json(user);
      return;
    }
    if (domain) {
      logger.info(`getUser called with domain: ${domain}`);
      const users = await userService.getUsersByDomain(String(domain));
      res.json(users);
      return;
    }
    logger.error('getUser called without id or domain');
    res.status(400).json({ error: 'Missing id or domain parameter' });
  } catch (err) {
    logger.error('Error in getUser:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addUsers = async (req: Request, res: Response) => {
  try {
    logger.info(`addUsers called with body: ${JSON.stringify(req.body)}`);
    const newUsers = req.body;
    const createdUsers = await userService.addUsers(newUsers);
    res.status(201).json(createdUsers);
  } catch (err) {
    logger.error('Error in addUsers:', err);
    res.status(500).json({ error: 'Failed to add users' });
  }
};