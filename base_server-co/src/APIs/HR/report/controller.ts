// src/APIs/HR/report/controller.ts

import { Request, Response, NextFunction } from 'express';
import Report from '../_shared/models/reportModel'; // Import the Report model

// Function to create a new report
const createReport = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { title } = req.body;

        // Check if a report with the same title already exists
        const existingReport = await Report.findOne({ title });

        if (existingReport) {
            return res.status(400).json({
                message: 'Report with this title already exists',
                report: existingReport
            });
        }

        // Create a new report
        const newReport = new Report(req.body);
        await newReport.save(); // Save to MongoDB

        // Respond with the created report
        return res.status(201).json({
            message: 'Report created successfully',
            report: newReport // Ensure this returns a valid report object
        });
    } catch (error: any) {
        next(error);
        return; // Ensure this returns no value in the error case
    }
};

export default {
    createReport
};
