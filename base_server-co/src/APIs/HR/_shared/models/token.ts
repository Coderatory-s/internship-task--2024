import mongoose from 'mongoose';
import { IToken } from '../../types/token.interface';

// Create token schema for HR
const tokenSchema = new mongoose.Schema<IToken>(
    {
        token: {
            type: String,
            required: true
        },
        employeeId: {
            type: mongoose.Schema.Types.ObjectId, // References an employee
            ref: 'Employee', // Assuming Employee model exists
            required: true
        },
        purpose: {
            type: String,
            enum: ['authentication', 'password-reset', 'email-confirmation'], // You can add more purposes if needed
            required: true
        },
        expiry: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

// Export the token model
export default mongoose.model<IToken>('Token', tokenSchema);
