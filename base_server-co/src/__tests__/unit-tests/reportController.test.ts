// src/__tests__/unit-tests/reportController.test.ts

import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import reportController from '../../APIs/HR/report/controller'; // Import the report controller
import Report from '../../APIs/HR/_shared/models/reportModel'; // Import the Report model

// Create an instance of an Express app for testing
const app = express();
app.use(express.json());

// Middleware to simulate the Express app routing and handling
app.post('/report', (req: Request, res: Response, next: NextFunction) => {
    reportController.createReport(req, res, next);
});

// Mock the Report model
jest.mock('../../APIs/HR/_shared/models/reportModel');

describe('Report Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock after each test
    });

    it('should create a new report successfully', async () => {
        // Mock Report.findOne to return null (no existing report)
        (Report.findOne as jest.Mock).mockResolvedValueOnce(null);

        // Mock the save method for Report
        const saveMock = jest.spyOn(Report.prototype, 'save').mockResolvedValueOnce({
            title: 'New Report',
            description: 'Test Description',
            content: 'Test Content'
        });

        // Define a sample request body
        const mockReport = {
            title: 'New Report',
            description: 'Test Description',
            content: 'Test Content'
        };

        // Send a POST request
        const response = await request(app).post('/report').send(mockReport);

        // Debugging line to inspect the full response object
        console.log(response.body); 

        // Assertions
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Report created successfully');
        expect(response.body.report.title).toBe(mockReport.title);
        expect(response.body.report.description).toBe(mockReport.description);
        expect(response.body.report.content).toBe(mockReport.content);

        // Ensure save was called
        expect(saveMock).toHaveBeenCalledTimes(1);
    });

    it('should return an error if the report title already exists', async () => {
        // Mock Report.findOne to return an existing report
        (Report.findOne as jest.Mock).mockResolvedValueOnce({
            title: 'Existing Report',
            description: 'Existing Description',
            content: 'Existing Content'
        });

        // Define a sample request body
        const mockReport = {
            title: 'Existing Report',
            description: 'Test Description',
            content: 'Test Content'
        };

        // Send a POST request
        const response = await request(app).post('/report').send(mockReport);

        // Assertions
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Report with this title already exists');
        expect(response.body.report.title).toBe('Existing Report');

        // Ensure save was not called
        expect(Report.prototype.save).not.toHaveBeenCalled();
    });

    it('should handle errors properly', async () => {
        // Mock Report.findOne to throw an error
        (Report.findOne as jest.Mock).mockRejectedValueOnce(new Error('Database Error'));

        // Define a sample request body
        const mockReport = {
            title: 'Error Report',
            description: 'Test Description',
            content: 'Test Content'
        };

        // Send a POST request and expect an error
        const response = await request(app).post('/report').send(mockReport);

        // Assertions
        expect(response.status).toBe(500); // Internal server error status
    });
});
