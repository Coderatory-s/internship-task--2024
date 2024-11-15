import mongoose from "mongoose";

export interface IToken {
    token: string;
    employeeId: mongoose.Types.ObjectId; // Linking token to an employee
    purpose: string; // Token purpose, e.g., 'authentication', 'password-reset', etc.
    expiry: Date; // Token expiry date
    createdAt?: Date;
    updatedAt?: Date;
}
