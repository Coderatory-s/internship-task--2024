/* eslint-disable no-console */
// services/userService.ts
import { createUser, findUserByEmail, findUserById, updateUserProfile } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel, IUser } from '../models/userModel'
import { Resend } from 'resend'
import 'dotenv/config'

// Constants for environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'
const EMAIL_API_KEY = process.env.EMAIL_API_KEY || 'your_email_api_key'

// Initialize Resend service with API key
const resend = new Resend(EMAIL_API_KEY)

// Register User
export const registerUser = async (name: string, email: string, password: string): Promise<{ userId: string; token: string }> => {
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser: IUser = await createUser({ name, email, password: hashedPassword })
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' })

    return { userId: newUser._id, token }
}

// Login User
export const loginUser = async (email: string, password: string): Promise<{ token: string; user: IUser }> => {
    const user = await findUserByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password')
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' })
    return { token, user }
}

// Get User Profile
export const getUserProfile = async (userId: string): Promise<IUser | null> => {
    return await findUserById(userId)
}

// Search Users
export const searchUsers = async (query: string) => {
    return await UserModel.find({
        $or: [{ name: { $regex: query, $options: 'i' } }, { email: { $regex: query, $options: 'i' } }]
    }).select('_id name avatar')
}

// Update User Profile Details
export const updateUserProfileDetails = async (userId: string, data: Partial<IUser>): Promise<IUser | null> => {
    return await updateUserProfile(userId, data)
}

// Verify Reset Token
export const verifyResetToken = async (token: string) => {
    const user = await UserModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) throw new Error('Token is invalid or expired')
    return user
}

// Send Reset Email
export const sendResetEmail = async (email: string, token: string) => {
    const resetUrl = `http://localhost:3001/updatePassword?token=${token}`

    try {
        const response = await resend.emails.send({
            to: email,
            from: 'Coderatory <onboarding@resend.dev>',
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`
        })
        console.log('Email sent successfully:', response)
    } catch (error) {
        console.error('Error sending reset email:', error)
        throw new Error('Failed to send reset email')
    }
}

// Save Reset Token
export const saveResetToken = async (userId: string, token: string, expiration: number) => {
    await UserModel.findByIdAndUpdate(userId, {
        resetPasswordToken: token,
        resetPasswordExpires: expiration
    })
}
