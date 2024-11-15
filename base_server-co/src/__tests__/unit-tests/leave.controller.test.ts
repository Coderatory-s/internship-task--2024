// tests/leave.controller.test.ts
import request from 'supertest';
import express from 'express';
import leaveController from '../../APIs/HR/authentication/validation/leave.controller'; // Import the leave controller
import Leave from '../../APIs/HR/_shared/models/leave.model'; // Import the Leave model

// Create an instance of an Express app for testing
const app = express();
app.use(express.json());

// Define routes
app.post('/leaves', leaveController.submitLeave);
app.get('/leaves', leaveController.getAllLeaves);
app.put('/leaves/update/:id', leaveController.updateLeave);

describe('Leave Controller', () => {

    afterEach(() => {
        jest.clearAllMocks(); // Clear any mocks after each test
    });

    // Test for submitting a leave request successfully
    it('should submit a leave request successfully', async () => {
        const mockLeave = {
            employeeId: '60f5b6c4c1a6c42c8c123456', // Example ObjectId
            leaveType: 'Vacation',
            startDate: new Date(),
            endDate: new Date(),
            reason: 'Family trip',
        };

        const saveMock = jest.spyOn(Leave.prototype, 'save').mockResolvedValueOnce(mockLeave);

        const response = await request(app).post('/leaves').send(mockLeave);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Leave request submitted successfully');
        expect(response.body.leave).toEqual(mockLeave);
        expect(saveMock).toHaveBeenCalledTimes(1);
    });

    // Test for handling missing required fields
    it('should return an error if required fields are missing', async () => {
        const incompleteLeave = {
            employeeId: '60f5b6c4c1a6c42c8c123456',
            leaveType: 'Vacation',
            // Missing startDate, endDate, and reason
        };

        const response = await request(app).post('/leaves').send(incompleteLeave);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Please provide all required fields.');
    });

    // Test for handling errors when submitting a leave request
    it('should handle errors when submitting a leave request', async () => {
        const mockLeave = {
            employeeId: '60f5b6c4c1a6c42c8c123456',
            leaveType: 'Vacation',
            startDate: new Date(),
            endDate: new Date(),
            reason: 'Family trip',
        };

        const saveMock = jest.spyOn(Leave.prototype, 'save').mockRejectedValueOnce(new Error('Database Error'));

        const response = await request(app).post('/leaves').send(mockLeave);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error submitting leave request');
        expect(saveMock).toHaveBeenCalledTimes(1);
    });

    // Test for getting all leave requests
    it('should get all leave requests successfully', async () => {
        const mockLeaves = [
            { employeeId: '60f5b6c4c1a6c42c8c123456', leaveType: 'Vacation', startDate: new Date(), endDate: new Date(), reason: 'Family trip' },
            { employeeId: '60f5b6c4c1a6c42c8c123457', leaveType: 'Sick', startDate: new Date(), endDate: new Date(), reason: 'Flu' },
        ];

        jest.spyOn(Leave, 'find').mockResolvedValueOnce(mockLeaves);

        const response = await request(app).get('/leaves');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockLeaves);
    });

    // Test for updating a leave request
    it('should update a leave request successfully', async () => {
        const mockUpdate = { status: 'Approved' };
        const leaveId = '60f5b6c4c1a6c42c8c123456';

        const findByIdAndUpdateMock = jest.spyOn(Leave, 'findByIdAndUpdate').mockResolvedValueOnce({
            ...mockUpdate,
            _id: leaveId,
            employeeId: '60f5b6c4c1a6c42c8c123456',
            leaveType: 'Vacation',
            startDate: new Date(),
            endDate: new Date(),
            reason: 'Family trip',
        });

        const response = await request(app).put(`/leaves/update/${leaveId}`).send(mockUpdate);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Leave request updated successfully');
        expect(findByIdAndUpdateMock).toHaveBeenCalledWith(leaveId, mockUpdate, { new: true });
    });

    // Test for handling errors during updating a leave request
    it('should return an error if leave request not found during update', async () => {
        const leaveId = '60f5b6c4c1a6c42c8c123456';
        const mockUpdate = { status: 'Approved' };

        jest.spyOn(Leave, 'findByIdAndUpdate').mockResolvedValueOnce(null); // Simulate not found

        const response = await request(app).put(`/leaves/update/${leaveId}`).send(mockUpdate);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Leave request not found');
    });

    // Test for handling errors during updating a leave request
    it('should handle errors when updating a leave request', async () => {
        const leaveId = '60f5b6c4c1a6c42c8c123456';
        const mockUpdate = { status: 'Approved' };

        jest.spyOn(Leave, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Database Error'));

        const response = await request(app).put(`/leaves/update/${leaveId}`).send(mockUpdate);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error updating leave request');
    });

});
