import { Request, Response } from 'express';
import authService from '../services/authService'; 

// Controller for registering a new user
const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const result = await authService.registerUser(name, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message }); // Type assertion for the error message
    }
};

// Controller for logging in a user
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authService.loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message }); // Type assertion for the error message
    }
};

export default {
    register,
    login,
};
