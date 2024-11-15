// models/timeEntry.model.ts
import mongoose, { Schema, Document } from 'mongoose';
//import Employee from '../models/employee.model'; // Remove this if not used
// Assuming you also have a Project model

export interface ITimeEntry extends Document {
    employeeId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    startTime: Date;
    endTime: Date;
    description?: string;
}

const TimeEntrySchema: Schema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    description: { type: String },
});

const TimeEntry = mongoose.model<ITimeEntry>('TimeEntry', TimeEntrySchema);
export default TimeEntry;
