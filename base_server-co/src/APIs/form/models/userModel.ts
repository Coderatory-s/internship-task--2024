// userModel.ts

import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the user model
export interface IUser extends Document {
    email: string;
    password: string;
    profile: {
        name: string;
        // other fields
    };
}

// Create the user schema
const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        name: { type: String, required: true },
        // other fields
    },
});

// Check if the model is already defined
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
