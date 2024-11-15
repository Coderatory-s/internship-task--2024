// userController.ts

import { Request, Response } from 'express';
import User from '../models/userModel';
import mongoose from 'mongoose';

// Function to get all forms for a specific user
export const getUserForms = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        // Validate user ID format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        // Find user and populate forms
        const user = await User.findById(userId).populate('forms'); // Assuming forms are stored in user
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ forms: user.forms });
    } catch (error) {
        console.error('Error fetching user forms:', error);
        return res.status(500).json({ message: 'Failed to retrieve forms.' });
    }
};
