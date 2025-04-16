it('should fetch filtered users with the name "Jan"', async () => {
    const filteredMockUsers = mockUsers.filter((user: any) => user.name === 'Jan');
    (userService.getFilteredUsers as jest.Mock).mockResolvedValue(filteredMockUsers);

    const response = await request(app).get('/users?name=Jan');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(filteredMockUsers);
    expect(response.body.every((user: any) => user.name === 'Jan')).toBe(true);
  });


  it('should fetch a user by ID and verify the name is "Jan Kowalski"', async () => {
    const filteredMockUsers = mockUsers.filter((user: any) => user.name === 'Jan');
    (userService.getFilteredUsers as jest.Mock).mockResolvedValue(filteredMockUsers);

    const response = await request(app).get('/userbyid/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(filteredMockUsers);
    expect(response.body.every((user: any) => user.name === 'Jan Kowalski')).toBe(true);
  });