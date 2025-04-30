import { Request, Response } from 'express';
import * as userService from '../database-service/database-service';
import { loggerInterface } from '../logger/logger-interface';
import { WinstonLogger } from '../logger/winston-logger';

const logger: loggerInterface = new WinstonLogger();

export const welcome = (req: Request, res: Response) => {
  logger.info('Welcome endpoint called');
  res.send('Welcome to the Users API!');
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    logger.debug(`getUsers called with query: ${JSON.stringify(req.query)}`);
    const { minAge, maxAge, ...otherFilters } = req.query;

    const filters = Object.fromEntries(
      Object.entries(otherFilters).map(([key, value]) => [key, String(value)])
    );

    if (minAge || maxAge) {
      if (minAge) {
        filters['minAge'] = String(minAge);
      }
      if (maxAge) {
        filters['maxAge'] = String(maxAge);
      }
    }

    logger.info(`getUsers called with filters: ${JSON.stringify(filters)}`);
    const users = await userService.getFilteredUsers(filters);
    logger.debug(`getUsers found ${users.length} users`);
    res.json(users.map(({ id, ...rest }) => rest));
  } catch (error) {
    logger.error(`Error in getUsers: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const countUsers = async (req: Request, res: Response) => {
  try {
    logger.info('countUsers endpoint called');
    const userCount = await userService.countUsers();
    logger.debug(`countUsers result: ${userCount}`);
    res.json({ userCount });
  } catch (error) {
    logger.error(`Error in countUsers: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const countWomen = async (req: Request, res: Response) => {
  try {
    logger.info('countWomen endpoint called');
    const womenCount = await userService.countWomen();
    logger.debug(`countWomen result: ${womenCount}`);
    res.json({ womenCount });
  } catch (error) {
    logger.error(`Error in countWomen: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    logger.debug(`getUser called with query: ${JSON.stringify(req.query)}`);
    const { id, domain } = req.query;

    if (id) {
      logger.info(`getUser called with id: ${id}`);
      const user = await userService.getUserById(Number(id));
      logger.debug(`getUserById result: ${JSON.stringify(user)}`);
      res.json((({ id, ...rest }) => rest)(user));
      return;
    }
    if (domain) {
      logger.info(`getUser called with domain: ${domain}`);
      const users = await userService.getUsersByDomain(String(domain));
      logger.debug(`getUsersByDomain found ${users.length} users`);
      res.json(users.map(({ id, ...rest }) => rest));
      return;
    }
    logger.error('getUser called without id or domain');
    res.status(400).json({ error: 'Missing id or domain parameter' });
  } catch (error) {
    logger.error(`Error in getUser: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addUsers = async (req: Request, res: Response) => {
  try {
    logger.info(`addUsers called with body: ${JSON.stringify(req.body)}`);
    const newUsers = req.body;
    logger.debug(`Calling addUsers with ${Array.isArray(newUsers) ? newUsers.length : 0} users`);
    const createdUsers = await userService.addUsers(newUsers);
    logger.debug(`addUsers created ${createdUsers.length} users`);
    res.status(201).json(createdUsers.map(({ id, ...rest }) => rest));
  } catch (error) {
    logger.error(`Error in addUsers: ${error}`);
    res.status(500).json({ error: 'Failed to add users' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    logger.info(`deleteUser called with id: ${id}`);
    await userService.deleteUserById(id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error in deleteUser: ${error}`);
    res.status(404).json({ error: 'Failed to delete user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    logger.info(`updateUser called with id: ${id} and body: ${JSON.stringify(req.body)}`);
    const updateResult = await userService.updateUserById(id, req.body);
    if (updateResult !== undefined && updateResult !== null) {
        res.json(updateResult);
    } else {
        res.status(404).json({ error: 'User not found or update failed' });
    }
  } catch (error) {
    logger.error(`Error in updateUser: ${error}`);
    res.status(404).json({ error: 'Failed to update users' });
  }
};