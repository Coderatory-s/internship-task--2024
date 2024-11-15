import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Pser from '../_shared/models/pserModel'; // Ensure you're using the new model
// Remove this line if jwt is not used anywhere



const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register a new user
const registerUser = async (name: string, email: string, password: string) => {
    // Check if the user already exists
    const existingUser = await Pser.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Pser({
        name,
        email,
        password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    return { token, message: 'User registered successfully' };
};

// Login user
const loginUser = async (email: string, password: string) => {
    // Find user by email
    const user = await Pser.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return { token, message: 'Login successful' };
};

export default {
    registerUser,
    loginUser,
};