import request from 'supertest';
import initializeApp from '../../src/app';
import { Express } from 'express';
import * as userService from '../../src/database-service/database-service';
import mockUsers from '../unit/mocked-users-tests/mocked-users-data';

jest.mock('../../src/database-service/database-service');

let app: Express;

beforeAll(async () => {
  app = await initializeApp({ skipDb: true });
});

describe('API Endpoints', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the Users API!');
  });

  it('should fetch filtered users with the name "Jan"', async () => {
    const filteredMockUsers = mockUsers.filter((user: { name: string }) => user.name === 'Jan');
    (userService.getFilteredUsers as jest.Mock).mockResolvedValue(filteredMockUsers);

    const response = await request(app).get('/users?name=Jan');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(filteredMockUsers);
    expect(response.body.every((user: { name: string }) => user.name === 'Jan')).toBe(true);
  });

  it('should fetch users by email domain', async () => {
    (userService.getUsersByDomain as jest.Mock).mockResolvedValue(mockUsers);

    const response = await request(app).get('/user?domain=example');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('should fetch users by id', async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue(mockUsers);

    const response = await request(app).get('/user?id=3');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('should return an empty array when no users match the filter', async () => {
    (userService.getFilteredUsers as jest.Mock).mockResolvedValue([]);

    const response = await request(app).get('/users?name=fakeName');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return the total user count', async () => {
    (userService.countUsers as jest.Mock).mockResolvedValue(10);

    const response = await request(app).get('/countusers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ userCount: 10 });
  });

  it('should return the count of women based on names ending with "a"', async () => {
    const womenCount = mockUsers.filter((user: { name: string }) => user.name.endsWith('a')).length;
    (userService.countWomen as jest.Mock).mockResolvedValue(womenCount);

    const response = await request(app).get('/countwomen');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ womenCount });
    expect(response.body.womenCount).toBe(womenCount);
  });

  it('should return a 404 code for an invalid endpoint', async () => {
    const response = await request(app).get('/invalid-endpoint');

    expect(response.status).toBe(404);
  });

  it('should add new users', async () => {
    const createdUsers = mockUsers;
    (userService.addUsers as jest.Mock).mockResolvedValue(createdUsers);

    const response = await request(app).post('/addusers').send(mockUsers);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdUsers);
  });

  it('should handle errors when adding users', async () => {
    (userService.addUsers as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).post('/addusers').send([]);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to add users' });
  });
});

it('should delete a user by id', async () => {
  (userService.deleteUserById as jest.Mock).mockResolvedValue(undefined);

  const response = await request(app).delete('/user/3');

  expect(response.status).toBe(204);
  expect(userService.deleteUserById).toHaveBeenCalledWith(3);
});

it('should return 404 if user to delete is not found', async () => {
  (userService.deleteUserById as jest.Mock).mockRejectedValue(new Error('User with id 999 not found'));

  const response = await request(app).delete('/user/999');

  expect(response.status).toBe(404);
  expect(response.body).toEqual({ error: 'User with id 999 not found' });
});

it('should fetch users within an age range', async () => {
  const filteredUsers = mockUsers.filter(
    (user: { age: number }) => user.age >= 20 && user.age <= 30
  );
  (userService.getFilteredUsers as jest.Mock).mockResolvedValue(filteredUsers);

  const response = await request(app).get('/users?minAge=20&maxAge=30');

  expect(response.status).toBe(200);
  expect(response.body).toEqual(filteredUsers);
  expect(response.body.every((user: { age: number }) => user.age >= 20 && user.age <= 30)).toBe(true);
});