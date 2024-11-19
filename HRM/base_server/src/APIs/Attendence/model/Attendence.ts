// src/schemas/attendance.schema.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  employeeId: string;
  date: Date;
  status: string; // e.g., "present", "absent"
  checkInTime: Date | null;
  checkOutTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema: Schema = new Schema<IAttendance>(
  {
    employeeId: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    checkInTime: { type: Date, default: null },
    checkOutTime: { type: Date, default: null },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
