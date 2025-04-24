import { EntityManager, EntityRepository, wrap, FilterQuery } from '@mikro-orm/core';

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
    const filterQuery: FilterQuery<User> = {};

    Object.entries(filters).forEach(([key, value]) => {
      (filterQuery as Record<string, { $ilike: string }>)[key] = { $ilike: `%${value}%` };
    });

    return await this.userRepository.find(filterQuery);
  }

  async countUsers(): Promise<number> {
    return await this.userRepository.count();
  }

  async countWomen(): Promise<number> {
    return await this.userRepository.count({
      name: { $like: '%a' }
    });
  }

  async getUserById(id: number): Promise<User> {
    if (isNaN(id)) {
      throw new Error('Id has to be a number');
    }

    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  async getUsersByDomain(domain: string): Promise<User[]> {
    if (domain.length < 3) {
      throw new Error(`Domain ${domain} is too short`);
    }

    const users = await this.userRepository.find({
      email: { $like: `%${domain}%` }
    });

    if (users.length === 0) {
      throw new Error(`No users found with email domain ${domain}`);
    }

    return users;
  }

  async addUsers(userDtos: UserDto[]): Promise<User[]> {
    const users = userDtos.map(dto => {
      const user = new User();
      wrap(user).assign(dto);
      return user;
    });

    await this.em.persistAndFlush(users);
    return users;
  }
}

let userService: MikroOrmUserService | null = null;

export const setEntityManager = (em: EntityManager) => {
  userService = new MikroOrmUserService(em.fork());
};

const getService = (): MikroOrmUserService => {
  if (!userService) {
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