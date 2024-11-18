// controllers/userController.ts
import { Request, Response } from 'express'
import { registerUser, loginUser, updateUserProfileDetails, getUserByIdService } from '../services/userService'
import { registerValidation, loginValidation, profileUpdateValidation } from '../validations/userValidation'
import Joi from 'joi'
import { findUserByEmail, deleteUserById } from '../repositories/userRepository'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid' // Or use JWT for time-limited tokens
import { sendResetEmail, saveResetToken } from '../services/userService' // You'll need to implement this
import { verifyResetToken } from '../services/userService'
import bcrypt from 'bcrypt'
import { searchUsers } from '../services/userService'
import cloudinary from '../../../config/cloudinaryConfig' // Path to your cloudinaryConfig file
import { UserModel } from '../models/userModel'
import config from '../../../config/config'

interface CustomRequest extends Request {
    user?: { _id: string | jwt.JwtPayload } // Assuming the user contains an ID or a JWT payload
}

export const searchUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name } = req.query

        // If name is not provided in the query string, return an error
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' })
        }

        // Search for users by name (case-insensitive)
        const users = await UserModel.find({
            name: { $regex: new RegExp(name as string, 'i') } // case-insensitive search
        })

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found with that name' })
        }

        return res.status(200).json({ users }) // Ensure to return the response
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ message: error?.message || 'Internal Server Error' }) // Explicit return in case of error
    }
}
// Function to search users by name
export const searchUsersByName = async (name: string) => {
    if (!name) {
        throw new Error('Name parameter is required')
    }
    return findUserByName(name)
}

// Function to find users based on name
export const findUserByName = async (name: string) => {
    return UserModel.find({ name: { $regex: name, $options: 'i' } }) // Case-insensitive search
}

// Register
export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { error } = registerValidation.validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })

        const { name, email, password } = req.body
        const result = await registerUser(name, email, password)
        return res.status(201).json(result) // Added return here
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

// Login
const JWT_SECRET = config.TOKENS.ACCESS.SECRET

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { error } = loginValidation.validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })

        const { email, password } = req.body
        const user = await UserModel.findOne({ email })

        if (!user) return res.status(404).json({ message: 'User not found' })
        const result = await loginUser(email, password)

        // Verify the password (you should use bcrypt to compare hashed passwords)
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' })

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' }) // Token expires in 1 hour

        // Send token back in the response
        return res.status(200).json({ message: 'Login successful', token, result })
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

export const getProfile = async (req: any, res: any) => {
    try {
        console.log('User in request:', req.user) // Log req.user to ensure it contains the correct _id

        const userId = req.user?._id // Ensure you are getting the correct _id from the token
        if (!userId) {
            return res.status(400).json({ message: 'User ID not found in token' })
        }

        const user = await UserModel.findById(userId) // Use findById with the correct ObjectId
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error', error })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
        const user = await getUserByIdService(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error })
    }
}
export const updateProfile = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        const userId = req.user?._id
        console.log('update profile user id', userId)
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' })
        }

        const { error } = profileUpdateValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        // Check if a file was uploaded
        let avatarUrl: string | undefined
        if (req.file) {
            // Use Promise to handle async upload and return the result
            avatarUrl = await new Promise<string | undefined>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'user_profiles' }, // You can set the folder to organize images in Cloudinary
                    (error, result) => {
                        if (error) {
                            reject('Error uploading image to Cloudinary') // Reject promise if error occurs
                        }
                        resolve(result?.secure_url) // Resolve promise with the URL returned by Cloudinary
                    }
                )
                stream.end(req.file?.buffer) // Upload the image buffer to Cloudinary
            })
        }

        const updateData = { ...req.body }

        // If avatar URL exists (after successful upload), add it to the update data
        if (avatarUrl) {
            updateData.avatar = avatarUrl
        }

        const updatedUser = await updateUserProfileDetails(userId as string, updateData)

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json(updatedUser)
    } catch (error: any) {
        return res.status(500).json({ message: 'An error occurred while updating the profile' })
    }
}

// Logout
export const logout = async (_: Request, res: Response): Promise<Response> => {
    try {
        // If using a blacklist mechanism for JWT, invalidate the token here
        // For simplicity, let's assume token is removed client-side
        return res.status(200).json({ message: 'Logged out successfully' })
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

// Delete User Function
export const deleteUser = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        const userId = req.user?._id // Same here for accessing `req.user`

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' })
        }

        const deletedUser = await deleteUserById(userId as string) // Cast to string if necessary

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json({ message: 'User account deleted successfully' })
    } catch (error: any) {
        return res.status(500).json({ message: 'An error occurred while deleting the account' })
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body

    // Validate email input
    const { error } = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required'
        })
    }).validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    // Find user by email
    const user = await findUserByEmail(email)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    // Generate a reset token and expiration time
    const resetToken = uuidv4() // Consider using a JWT for more security
    const tokenExpiration = Date.now() + 3600000 // 1 hour

    // Save reset token and expiration
    await saveResetToken(user.id, resetToken, tokenExpiration)
    await sendResetEmail(email, resetToken)

    return res.status(200).json({ message: 'Password reset email sent' })
}

const passwordValidation = (password: string) => {
    const upperCasePattern = /[A-Z]/ // At least one uppercase letter
    const numberPattern = /[0-9]/ // At least one number
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/ // At least one special character

    return (
        upperCasePattern.test(password) && numberPattern.test(password) && specialCharacterPattern.test(password) && password.length >= 8 // Optional: enforce minimum length
    )
}

export const updatePassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { token, newPassword } = req.body

        // Validate the new password
        if (!passwordValidation(newPassword)) {
            return res.status(400).json({
                message: 'Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long.'
            })
        }

        // Verify the reset token
        const user = await verifyResetToken(token)

        // Hash the new password
        user.password = await bcrypt.hash(newPassword, 10)

        // Clear the reset token and expiration
        user.resetPasswordToken = undefined // Ensure your User model allows this field to be undefined
        user.resetPasswordExpires = undefined // Ensure your User model allows this field to be undefined

        // Save the updated user document
        await user.save()

        return res.status(200).json({ message: 'Password updated successfully' })
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

export const searchUserController = async (req: Request, res: Response) => {
    const { query } = req.query

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' })
    }

    try {
        const users = await searchUsers(query as string)
        return res.json({ users })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
