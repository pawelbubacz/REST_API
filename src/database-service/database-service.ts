import { EntityManager, EntityRepository, wrap, FilterQuery } from '@mikro-orm/core';
import logger from '../logger';

interface UserFilter {
  [key: string]: string;
}

interface IUserService {
  getFilteredUsers(filters: UserFilter): Promise<User[]>;
  countUsers(): Promise<number>;
  countWomen(): Promise<number>;
  getUserById(id: number): Promise<User>;
  getUsersByDomain(domain: string): Promise<User[]>;
  addUsers(users: UserDto[]): Promise<User[]>;
}

interface UserDto {
  name: string;
  email: string;
  age: number;
}

import { User } from '../entities/entity';

class MikroOrmUserService implements IUserService {
  private userRepository: EntityRepository<User>;
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
    this.userRepository = em.getRepository(User);
  }

  async getFilteredUsers(filters: UserFilter): Promise<User[]> {
    logger.info(`Filtering users with filters: ${JSON.stringify(filters)}`);
    const filterQuery: FilterQuery<User> = {};

    Object.entries(filters).forEach(([key, value]) => {
      (filterQuery as Record<string, { $ilike: string }>)[key] = { $ilike: `%${value}%` };
    });

    try {
      const users = await this.userRepository.find(filterQuery);
      logger.info(`Found ${users.length} users with given filters`);
      return users;
    } catch (err) {
      logger.error('Error filtering users:', err);
      throw err;
    }
  }

  async countUsers(): Promise<number> {
    try {
      const count = await this.userRepository.count();
      logger.info(`Total users counted: ${count}`);
      return count;
    } catch (err) {
      logger.error('Error counting users:', err);
      throw err;
    }
  }

  async countWomen(): Promise<number> {
    try {
      const count = await this.userRepository.count({
        name: { $like: '%a' }
      });
      logger.info(`Total women counted: ${count}`);
      return count;
    } catch (err) {
      logger.error('Error counting women:', err);
      throw err;
    }
  }

  async getUserById(id: number): Promise<User> {
    if (isNaN(id)) {
      logger.error('Id has to be a number');
      throw new Error('Id has to be a number');
    }

    try {
      const user = await this.userRepository.findOne({ id });

      if (!user) {
        logger.error(`User with id ${id} not found`);
        throw new Error(`User with id ${id} not found`);
      }

      logger.info(`User with id ${id} retrieved`);
      return user;
    } catch (err) {
      logger.error(`Error retrieving user by id ${id}:`, err);
      throw err;
    }
  }

  async getUsersByDomain(domain: string): Promise<User[]> {
    if (domain.length < 3) {
      logger.error(`Domain ${domain} is too short`);
      throw new Error(`Domain ${domain} is too short`);
    }

    try {
      const users = await this.userRepository.find({
        email: { $like: `%${domain}%` }
      });

      if (users.length === 0) {
        logger.error(`No users found with email domain ${domain}`);
        throw new Error(`No users found with email domain ${domain}`);
      }

      logger.info(`Found ${users.length} users with domain ${domain}`);
      return users;
    } catch (err) {
      logger.error(`Error retrieving users by domain ${domain}:`, err);
      throw err;
    }
  }

  async addUsers(userDtos: UserDto[]): Promise<User[]> {
    logger.info(`Adding users: ${JSON.stringify(userDtos)}`);
    const users = userDtos.map(dto => {
      const user = new User();
      wrap(user).assign(dto);
      return user;
    });

    try {
      await this.em.persistAndFlush(users);
      logger.info(`Successfully added ${users.length} users`);
      return users;
    } catch (err) {
      logger.error('Error adding users:', err);
      throw err;
    }
  }
}

let userService: MikroOrmUserService | null = null;

export const setEntityManager = (em: EntityManager) => {
  userService = new MikroOrmUserService(em.fork());
};

const getService = (): MikroOrmUserService => {
  if (!userService) {
    logger.error('UserService not initialized. Call setEntityManager(em) first.');
    throw new Error('UserService not initialized. Call setEntityManager(em) first.');
  }
  return userService;
};

export const getFilteredUsers = (filters: UserFilter) => getService().getFilteredUsers(filters);
export const countUsers = () => getService().countUsers();
export const countWomen = () => getService().countWomen();
export const getUserById = (id: number) => getService().getUserById(id);
export const getUsersByDomain = (domain: string) => getService().getUsersByDomain(domain);
export const addUsers = (users: UserDto[]) => getService().addUsers(users);