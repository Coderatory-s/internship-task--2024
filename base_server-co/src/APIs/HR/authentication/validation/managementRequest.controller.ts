import { Request, Response } from 'express';
import mongoose from 'mongoose'; // Import mongoose for ObjectId validation
import ManagementRequest from '../../_shared/models/managementRequest.model';

// Request Management Request
export const requestManagement = async (req: Request, res: Response) => {
    try {
        // Use req.body to get values
        const { employeeId, requestType, requestDetails } = req.body;

        // Check if the necessary fields are provided
        if (!employeeId || !requestType || !requestDetails) {
            return res.status(400).json({ message: 'Please provide employeeId, requestType, and requestDetails.' });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: 'Invalid employeeId format.' });
        }

        const managementRequest = new ManagementRequest({
            employeeId,
            requestType,
            requestDetails,
        });

        await managementRequest.save();
        return res.status(201).json({ message: 'Management request submitted successfully', managementRequest });
    } catch (error) {
        console.error('Error submitting management request:', error);
        return res.status(500).json({ message: 'Error submitting management request', error: (error as Error).message });
    }
};

// Get all Management Requests
export const getManagementRequests = async (req: Request, res: Response) => {
    try {
        // Log the request method and URL
        console.log(`Received a ${req.method} request at ${req.originalUrl}`);

        // Fetch all management requests from the database
        const managementRequests = await ManagementRequest.find().populate('employeeId');
        return res.status(200).json(managementRequests);
    } catch (error) {
        console.error('Error fetching management requests:', error);
        return res.status(500).json({ message: 'Error fetching management requests', error: (error as Error).message });
    }
};

// Update Management Request
export const updateManagementRequest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Use req.params to get the request ID
        const { status } = req.body; // Use req.body to get the status

        // Validate input
        if (!status) {
            return res.status(400).json({ message: 'Please provide a status to update the request.' });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid management request ID format.' });
        }

        const updatedManagementRequest = await ManagementRequest.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedManagementRequest) {
            return res.status(404).json({ message: 'Management request not found' });
        }

        return res.status(200).json({ message: 'Management request updated successfully', updatedManagementRequest });
    } catch (error) {
        console.error('Error updating management request:', error);
        return res.status(500).json({ message: 'Error updating management request', error: (error as Error).message });
    }
};
