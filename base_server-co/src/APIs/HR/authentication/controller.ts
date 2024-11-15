import { NextFunction, Request, Response } from 'express';
import httpResponse from '../../../handlers/httpResponse';
import responseMessage from '../../../constant/responseMessage';
import httpError from '../../../handlers/errorHandler/httpError';
import Attendance from '../_shared/models/attendanceModel'; // Adjusted path to import the Attendance model

// Function to create a new attendance record for check-in
const checkIn = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { userId } = request.body; // Expecting userId in the request body

        // Validate input
        if (!userId) {
            return httpResponse(response, request, 400, 'User ID is required.', null);
        }

        // Create a check-in record
        const attendanceRecord = new Attendance({
            userId,
            type: 'checkIn',
            timestamp: new Date(), // Current date and time
        });

        await attendanceRecord.save(); // Save the attendance record to MongoDB

        return httpResponse(response, request, 201, responseMessage.SUCCESS, attendanceRecord);
    } catch (error) {
        httpError(next, error, request, 500);
    }
};

// Function to create a new attendance record for check-out
const checkOut = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { userId } = request.body; // Expecting userId in the request body

        // Validate input
        if (!userId) {
            return httpResponse(response, request, 400, 'User ID is required.', null);
        }

        // Get the latest attendance record for check-in
        const latestAttendance = await Attendance.findOne({
            userId: userId,
            type: 'checkIn'
        }).sort({ timestamp: -1 }); // Sort by timestamp descending

        // Check if the latest record is a check-in
        if (!latestAttendance) {
            return httpResponse(response, request, 400, 'No check-in record found for this user.', null);
        }

        // Create a check-out record
        const attendanceRecord = new Attendance({
            userId,
            type: 'checkOut',
            timestamp: new Date(), // Current date and time
        });

        await attendanceRecord.save(); // Save the attendance record to MongoDB

        return httpResponse(response, request, 201, responseMessage.SUCCESS, attendanceRecord);
    } catch (error) {
        httpError(next, error, request, 500);
    }
};

export default {
    checkIn,
    checkOut,
};