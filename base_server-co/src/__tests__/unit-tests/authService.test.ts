import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Pser from '../../APIs/HR/_shared/models/pserModel'; // Ensure the correct path to your Mongoose model
import authService from '../../APIs/HR/services/authService'; // Ensure the correct path to your authService

// Mock the bcrypt and jwt to isolate tests
jest.mock('bcrypt');
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockToken'), // Mock token generation
}));

describe('AuthService Tests', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        // Start in-memory MongoDB instance
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri, { dbName: 'testdb' });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        // Clear the database after each test
        await Pser.deleteMany({});
    });

    test('Should register a new user', async () => {
        const name = 'John Doe';
        const email = 'john@example.com';
        const password = 'password123';

        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword'); // Mock bcrypt.hash to return a fake hashed password

        const result = await authService.registerUser(name, email, password);

        expect(result).toHaveProperty('token', 'mockToken'); // Expect the token to be 'mockToken'
        expect(result.message).toBe('User registered successfully');

        const savedUser = await Pser.findOne({ email });
        expect(savedUser).not.toBeNull();
        expect(savedUser?.name).toBe(name);
        expect(savedUser?.password).toBe('hashedPassword'); // Ensure the hashed password was saved
    });

    test('Should not register user if email already exists', async () => {
        const name = 'John Doe';
        const email = 'john@example.com';
        const password = 'password123';

        // Register a user first
        await authService.registerUser(name, email, password);

        // Try to register again with the same email
        await expect(authService.registerUser(name, email, password)).rejects.toThrow('User already exists');
    });

    test('Should log in an existing user', async () => {
        const name = 'John Doe';
        const email = 'john@example.com';
        const password = 'password123';

        // Mock the password hashing and user creation
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        await authService.registerUser(name, email, password);

        (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Mock bcrypt.compare to return true

        // Try to log in
        const result = await authService.loginUser(email, password);

        expect(result).toHaveProperty('token', 'mockToken'); // Expect the token to be 'mockToken'
        expect(result.message).toBe('Login successful');
    });

    test('Should not log in with wrong password', async () => {
        const name = 'John Doe';
        const email = 'john@example.com';
        const password = 'password123';

        // Register the user
        await authService.registerUser(name, email, password);

        (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Mock comparison to return false

        // Try to log in with an incorrect password
        await expect(authService.loginUser(email, 'wrongpassword')).rejects.toThrow('Invalid email or password');
    });

    test('Should not log in non-existing user', async () => {
        const email = 'nonexistent@example.com';
        const password = 'password123';

        await expect(authService.loginUser(email, password)).rejects.toThrow('Invalid email or password');
    });
});