import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for your model
interface IAttendance extends Document {
    userId: string; // Reference to the user
    type: 'checkIn' | 'checkOut'; // Type of attendance
    timestamp: Date; // Date and time of attendance
}

// Create a schema for the attendance model
const attendanceSchema: Schema = new Schema({
    userId: { type: String, required: true }, // Ensure userId is required
    type: { type: String, enum: ['checkIn', 'checkOut'], required: true }, // Only allow 'checkIn' or 'checkOut'
    timestamp: { type: Date, default: Date.now }, // Default to current date and time
});

// Check if the model already exists to prevent overwriting
const Attendance = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', attendanceSchema);

export default Attendance;
