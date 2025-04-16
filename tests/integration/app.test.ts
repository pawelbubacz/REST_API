import request from 'supertest';
import app from '../../src/app';
import * as userService from '../../src/databaseService/databaseService';
import mockUsers from '../unit/mocked-users-tests/mocked-users-data';

jest.mock('../../src/databaseService/databaseService');

describe('API Endpoints', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the Users API!');
  });

  it('should fetch filtered users with the name "Alice"', async () => {
    const filteredMockUsers = mockUsers.filter((user: any) => user.name === 'Alice');
    (userService.getFilteredUsers as jest.Mock).mockResolvedValue(filteredMockUsers);

    const response = await request(app).get('/users?name=Alice');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(filteredMockUsers);
    expect(response.body.every((user: any) => user.name === 'Alice')).toBe(true);
  });

  it('should return the total user count', async () => {
    (userService.countUsers as jest.Mock).mockResolvedValue(10);

    const response = await request(app).get('/countusers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ userCount: 10 });
  });

  it('should return the count of women', async () => {
    (userService.countWomen as jest.Mock).mockResolvedValue(5);

    const response = await request(app).get('/countwomen');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ womenCount: 5 });
  });

  it('should fetch a user by ID', async () => {
    const mockUser = mockUsers[0];
    (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get('/userbyid/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should fetch users by email domain', async () => {
    (userService.getUsersByDomain as jest.Mock).mockResolvedValue(mockUsers);

    const response = await request(app).get('/usersbydomain/example.com');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
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