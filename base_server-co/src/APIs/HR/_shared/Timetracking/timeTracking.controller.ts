import { Request, Response } from 'express';
import TimeEntry from '../../_shared/models/timeEntry.model'; // Adjust the import based on your structure
import Employee from '../../_shared/models/employee.model'; // Import the Employee model
import Project from '../../_shared/models/project.model'; // Import the Project model

// Track Time Entry
export const trackTime = async (req: Request, res: Response) => {
    try {
        const { employeeId, projectId, startTime, endTime, description } = req.body;

        // Validate required fields
        if (!employeeId || !projectId || !startTime || !endTime) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Check if the employee exists
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        // Check if the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Create a new TimeEntry document
        const timeEntry = new TimeEntry({
            employeeId,
            projectId,
            startTime,
            endTime,
            description,
        });

        // Save the time entry to the database
        await timeEntry.save();
        return res.status(201).json({ message: 'Time entry tracked successfully', timeEntry });
    } catch (error) {
        const errorMessage = (error as Error).message || 'Unknown error occurred';
        console.error('Error tracking time entry:', errorMessage);
        return res.status(500).json({ message: 'Error tracking time entry', error: errorMessage });
    }
};

// Get Time Entries
export const getTimeEntries = async (_req: Request, res: Response) => {
    try {
        // Retrieve all time entries from the database and populate the referenced fields
        const timeEntries = await TimeEntry.find().populate('employeeId projectId');

        // Check if no time entries were found
        if (!timeEntries || timeEntries.length === 0) {
            return res.status(404).json({ message: 'No time entries found' });
        }

        return res.status(200).json(timeEntries);
    } catch (error) {
        const errorMessage = (error as Error).message || 'Unknown error occurred';
        console.error('Error fetching time entries:', errorMessage);
        return res.status(500).json({ message: 'Error fetching time entries', error: errorMessage });
    }
};
