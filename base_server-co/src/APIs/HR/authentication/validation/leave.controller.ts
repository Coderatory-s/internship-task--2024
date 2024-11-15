// controllers/leave.controller.ts
import { Request, Response } from 'express';
import Leave from '../../_shared/models/leave.model';

// Submit Leave Request
export const submitLeave = async (req: Request, res: Response) => {
    try {
        const { employeeId, leaveType, startDate, endDate, reason } = req.body;

        // Validate required fields
        if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const leave = new Leave({
            employeeId,
            leaveType,
            startDate,
            endDate,
            reason,
        });

        await leave.save();
        return res.status(201).json({ message: 'Leave request submitted successfully', leave });
    } catch (error) {
        // Type assertion approach for error handling
        const errorMessage = (error as Error).message || 'Unknown error occurred';
        console.error('Error submitting leave request:', errorMessage);
        return res.status(500).json({ message: 'Error submitting leave request', error: errorMessage });
    }
};

// Get All Leave Requests
export const getAllLeaves = async (req: Request, res: Response) => {
    try {
        // Optional: Log request details if needed
        console.log('Fetching all leave requests');
        console.log('Request Params:', req.params);
        console.log('Request Query:', req.query);

        const leaves = await Leave.find().populate('employeeId');
        return res.status(200).json(leaves);
    } catch (error) {
        // Type assertion approach for error handling
        const errorMessage = (error as Error).message || 'Unknown error occurred';
        console.error('Error fetching leave requests:', errorMessage);
        return res.status(500).json({ message: 'Error fetching leave requests', error: errorMessage });
    }
};

// Update Leave Request
export const updateLeave = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status input
        if (!status) {
            return res.status(400).json({ message: 'Please provide a status to update the leave request.' });
        }

        const updatedLeave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        return res.status(200).json({ message: 'Leave request updated successfully', updatedLeave });
    } catch (error) {
        // Type assertion approach for error handling
        const errorMessage = (error as Error).message || 'Unknown error occurred';
        console.error('Error updating leave request:', errorMessage);
        return res.status(500).json({ message: 'Error updating leave request', error: errorMessage });
    }
};
export default {
    submitLeave,
    getAllLeaves,
    updateLeave

}
    

