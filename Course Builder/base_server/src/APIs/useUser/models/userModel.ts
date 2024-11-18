// models/userModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'student';
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'student'], required: true }, 
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
