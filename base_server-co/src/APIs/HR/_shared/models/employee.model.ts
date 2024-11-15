// models/employee.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
    name: string;
    email: string;
    // Add other fields as necessary
}

const EmployeeSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    // Add other fields as necessary
});

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);
export default Employee;
