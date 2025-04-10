const mockedUsers = require('./mocked-users');

describe('Mocked Users Tests', () => {
    test('should have 55 mocked users', () => {
        expect(mockedUsers.length).toBe(55);
    });

    test('should find user with ID 1', () => {
        const user = mockedUsers.find((u) => u.id === 1);
        expect(user).toBeDefined();
        expect(user?.name).toBe('Jan Kowalski');
    });

    test('should filter users by email domain "example.com"', () => {
        const exampleUsers = mockedUsers.filter((u) => u.email.includes('example.com'));
        expect(exampleUsers.length).toBeGreaterThan(0);
        expect(exampleUsers.every((u) => u.email.includes('example.com'))).toBe(true);
    });

    test('should count users with names ending in "a"', () => {
        const count = mockedUsers.filter((u) => u.name.endsWith('a')).length;
        expect(count).toBeGreaterThan(0);
    });

    test('should throw error if user with specific ID is not found', () => {
        const user = mockedUsers.find((u) => u.id === 999);
        expect(user).toBeUndefined();
    });
    test('should verify all users have valid ages', () => {
        const allValidAges = mockedUsers.every((u) => Number.isInteger(u.age) && u.age > 0);
        expect(allValidAges).toBe(true);
    });
    test('should verify all users have unique IDs', () => {
        const ids = mockedUsers.map((u) => u.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    test('should verify no user has an empty name', () => {
        const hasEmptyName = mockedUsers.some((u) => !u.name || u.name.trim() === '');
        expect(hasEmptyName).toBe(false);
    });

    test('should verify all users have valid email addresses', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const allValidEmails = mockedUsers.every((u) => emailRegex.test(u.email));
        expect(allValidEmails).toBe(true);
    });

    test('should find users older than 30', () => {
        const usersOlderThan30 = mockedUsers.filter((u) => u.age > 30);
        expect(usersOlderThan30.length).toBeGreaterThan(0);
    });

    test('should verify no user has a negative age', () => {
        const hasNegativeAge = mockedUsers.some((u) => u.age < 0);
        expect(hasNegativeAge).toBe(false);
    });
});