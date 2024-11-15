// models/leave.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ILeave extends Document {
    employeeId: mongoose.Types.ObjectId;
    leaveType: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    status: string; // Pending, Approved, Rejected
}

const LeaveSchema: Schema = new Schema({
    employeeId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
}, { timestamps: true });

const Leave = mongoose.model<ILeave>('Leave', LeaveSchema);
export default Leave;
