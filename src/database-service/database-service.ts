import { EntityManager, EntityRepository, wrap, FilterQuery } from '@mikro-orm/core';
import { loggerInterface } from '../logger/logger-interface';
import { WinstonLogger } from '../logger/winston-logger';
import { User } from '../entities/entity';

const logger: loggerInterface = new WinstonLogger();

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

class MikroOrmUserService implements IUserService {
  private userRepository: EntityRepository<User>;
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
    this.userRepository = em.getRepository(User);
  }

  async getFilteredUsers(filters: UserFilter): Promise<User[]> {
    const filterQuery: FilterQuery<User> = {};

    if (filters.minAge || filters.maxAge) {
      filterQuery.age = {};
      if (filters.minAge) {
        filterQuery.age.$gte = Number(filters.minAge);
      }
      if (filters.maxAge) {
        filterQuery.age.$lte = Number(filters.maxAge);
      }
      delete filters.minAge;
      delete filters.maxAge;
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'name') {
        (filterQuery as Record<string, { $ilike: string }>)[key] = { $ilike: `${value} %` };
      } else {
        (filterQuery as Record<string, { $ilike: string }>)[key] = { $ilike: `%${value}%` };
      }
    });

    try {
      const users = await this.userRepository.find(filterQuery);
      return users;
    } catch (error) {
      logger.error(`Error filtering users: ${error}`);
      throw new Error('Error filtering users');
    }
  }

  async countUsers(): Promise<number> {
    try {
      const count = await this.userRepository.count();
      return count;
    } catch (error) {
      logger.error(`Error counting users: ${error}`);
      throw new Error('Error counting users');
    }
  }

  async countWomen(): Promise<number> {
    try {
      const count = await this.userRepository.count({
        name: { $like: '%a' }
      });
      return count;
    } catch (error) {
      logger.error(`Error counting women: ${error}`);
      throw new Error('Error counting women');
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

      return user;
    } catch (error) {
      logger.error(`Error retrieving user by id ${id}: ${error}`);
      throw error;
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

      return users;
    } catch (error) {
      logger.error(`Error retrieving users by domain ${domain}: ${error}`);
      throw new Error(`Error retrieving users by domain ${domain}`);
    }
  }

  async addUsers(userDtos: UserDto[]): Promise<User[]> {
    const users = userDtos.map(dto => {
      const user = new User();
      wrap(user).assign(dto);
      return user;
    });

    const emailRegex = /\S+@\S+\.\S+/;

    for (const dto of userDtos) {
      if (!emailRegex.test(dto.email)) {
        throw new Error(`Invalid email: ${dto.email}`);
      }
    }

    try {
      await this.em.persistAndFlush(users);
      return users;
    } catch (error) {
      logger.error(`Error adding users: ${error}`);
      throw new Error('Error adding users');
    }
  }

  async deleteUserById(id: number): Promise<void> {
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
      await this.em.removeAndFlush(user);
      logger.info(`User with id ${id} deleted`);
    } catch (error) {
      logger.error(`Error deleting user by id ${id}: ${error}`);
      throw new Error(`Error deleting user by id ${id}`);
    }
  }

  async updateUserById(id: number, update: Partial<UserDto>): Promise<User> {
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
      wrap(user).assign(update);
      await this.em.persistAndFlush(user);
      logger.info(`User with id ${id} updated`);
      return user;
    } catch (error) {
      logger.error(`Error updating user by id ${id}: ${error}`);
      throw new Error(`Error updating user by id ${id}`);
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
export const deleteUserById = (id: number) => getService().deleteUserById(id);
export const updateUserById = (id: number, update: Partial<UserDto>) => getService().updateUserById(id, update);
