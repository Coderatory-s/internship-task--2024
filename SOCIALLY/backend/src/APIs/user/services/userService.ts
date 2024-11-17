// services/userService.ts
import { createUser, findUserByEmail, findUserById, updateUserProfile } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel, IUser } from '../models/userModel'
import { Resend } from 'resend'
import config from '../../../config/config'
import { findUserByName } from '../repositories/userRepository'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

export const registerUser = async (name: string, email: string, password: string): Promise<{ userId: string; token: string }> => {
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Ensure newUser has the correct type
    const newUser: IUser = await createUser({ name, email, password: hashedPassword })

    // Token generation with correct _id as string
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' })

    return { userId: newUser._id, token } // Now TypeScript knows _id is a string
}
export const loginUser = async (email: string, password: string): Promise<{ token: string; user: IUser }> => {
    const user = await findUserByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password')
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' })
    return { token, user }
}

export const getUserProfile = async (userId: string): Promise<IUser | null> => {
    return await findUserById(userId)
}
export const searchUsers = async (query: string) => {
    return await UserModel.find({
        $or: [
            { name: { $regex: query, $options: 'i' } }, // case-insensitive search
            { email: { $regex: query, $options: 'i' } }
        ]
    }).select('userId name avatar') // Select only the fields you need
}
export const updateUserProfileDetails = async (userId: string, data: Partial<IUser>): Promise<IUser | null> => {
    return await updateUserProfile(userId, data)
}

// Fetch user by ID from the database
export const getUserByIdService = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId) // Using Mongoose's findById method
        return user
    } catch (error) {
        throw error
    }
}

export const searchUsersByName = async (name: string) => {
    if (!name) {
        throw new Error('Name parameter is required')
    }
    return findUserByName(name)
}

export const verifyResetToken = async (token: string) => {
    const user = await UserModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() } // Ensure token hasn't expired
    })

    if (!user) throw new Error('Token is invalid or expired')
    return user
}

const EMAIL_API_KEY = config.EMAIL_API_KEY

const resend = new Resend(EMAIL_API_KEY)
export const sendResetEmail = async (email: string, token: string) => {
    const resetUrl = `http://localhost:3001/updatePassword?token=${token}`

    try {
        // Use a verified domain in the 'from' field
        const response = await resend.emails.send({
            to: email,
            from: `Coderatory <onboarding@resend.dev>`,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`
        })

        console.log('Email sent successfully:', response)
    } catch (error) {
        console.error('Error sending reset email:', error)
        throw new Error('Failed to send reset email')
    }
}
export const saveResetToken = async (userId: string, token: string, expiration: number) => {
    // Update the user with the reset token and expiration
    await UserModel.findByIdAndUpdate(userId, {
        resetPasswordToken: token,
        resetPasswordExpires: expiration
    })
}
