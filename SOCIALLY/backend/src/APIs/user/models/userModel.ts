// models/userModel.ts

import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    _id: string
    name: string
    email: string
    password: string
    bio?: string
    avatar?: string
    resetPasswordToken?: string // Optional
    resetPasswordExpires?: Date // Optional
    postsId: [string]
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        bio: { type: String },
        avatar: { type: String },
        resetPasswordToken: { type: String, default: null },
        resetPasswordExpires: { type: Date, default: null }
    },
    {
        timestamps: true
    }
)

export const UserModel = mongoose.model<IUser>('User', UserSchema)
