import { Request, Response, NextFunction } from 'express';
import Team from '../_shared/models/teamModel';  // Import the Team model

// Function to create a new team
const createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newTeam = new Team(req.body); // Get the team data from request body
        const savedTeam = await newTeam.save(); // Save the new team to MongoDB
        res.status(201).json({ message: 'Team created successfully', team: savedTeam });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        next(error); // Pass any errors to the next middleware
    }
};

export default {
    createTeam
};
