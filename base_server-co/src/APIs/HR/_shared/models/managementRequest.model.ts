// models/managementRequest.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IManagementRequest extends Document {
    employeeId: mongoose.Types.ObjectId; // Reference to the employee
    requestType: string; // e.g., Leave, Performance, Onboarding, Time Tracking, Payroll, Analytics, Feedback
    requestDetails: any; // Can store details specific to the request type
    status: string; // e.g., Pending, Approved, Rejected
}

const ManagementRequestSchema: Schema = new Schema({
    employeeId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    requestType: { type: String, required: true, enum: ['Leave', 'Performance', 'Onboarding', 'Time Tracking', 'Payroll', 'Analytics', 'Feedback'] },
    requestDetails: { type: Schema.Types.Mixed, required: true }, // Flexible structure for different types of requests
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
}, { timestamps: true });

const ManagementRequest = mongoose.model<IManagementRequest>('ManagementRequest', ManagementRequestSchema);
export default ManagementRequest;
