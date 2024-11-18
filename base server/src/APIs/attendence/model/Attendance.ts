import { Schema, Document, model } from 'mongoose'

interface IAttendance extends Document {
    employeeId: string // employee ID
    date: Date
    status: 'present' | 'absent' | 'leave'
    checkInTime?: Date
    checkOutTime?: Date
    createdAt: Date
    updatedAt: Date
}

const AttendanceSchema = new Schema<IAttendance>(
    {
        employeeId: { type: String, required: true },
        date: { type: Date, required: true },
        status: { type: String, enum: ['present', 'absent', 'leave'], required: true },
        checkInTime: { type: Date },
        checkOutTime: { type: Date }
    },
    {
        timestamps: true
    }
)
const Attendance = model<IAttendance>('Attendence', AttendanceSchema)

export default Attendance
export type { IAttendance }
