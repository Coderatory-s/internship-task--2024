/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// controllers/userController.ts
import { Request, Response } from 'express'
import { registerUser, loginUser, getUserProfile, updateUserProfileDetails } from '../services/userService'
import { registerValidation, loginValidation, profileUpdateValidation } from '../validations/userValidation'
import Joi from 'joi'
import { findUserByEmail, deleteUserById } from '../repositories/userRepository'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid' // Or use JWT for time-limited tokens
import { sendResetEmail, saveResetToken } from '../services/userService' // You'll need to implement this
import { verifyResetToken } from '../services/userService'
import bcrypt from 'bcrypt'
import { searchUsers } from '../services/userService'

// Extend the Request interface to include user property
interface CustomRequest extends Request {
    user?: { id: string | jwt.JwtPayload } // Assuming the user contains an ID or a JWT payload
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
export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { error } = loginValidation.validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })

        const { email, password } = req.body
        const result = await loginUser(email, password)
        return res.status(200).json(result) // Added return here
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

// Get Profile
export const getProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.params.userId
        const user = await getUserProfile(userId)
        if (!user) return res.status(404).json({ message: 'User not found' })
        return res.status(200).json(user) // Ensuring this is returned
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}

// Update Profile Function
export const updateProfile = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        const userId = req.user?.id // TypeScript knows that `user` exists on `req`

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' })
        }

        // Validate request body
        const { error } = profileUpdateValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const updateData = req.body // The new data coming from the request body
        const updatedUser = await updateUserProfileDetails(userId as string, updateData) // Cast to string if necessary

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json(updatedUser) // Return the updated user profile
    } catch (error: unknown) {
        // Log the error for debugging (optional)
        console.error('Error updating profile:', error)

        return res.status(500).json({ message: 'An error occurred while updating the profile' })
    }
}
// The request handler for updating user profile
// export const updateProfile = async (req: CustomRequest, res: Response) => {
//     try {
//         const userId = req.user?.id // Retrieve userId from the authenticated request
//         const updateData = req.body // The new data coming from the request body

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID not provided' })
//         }

//         const updatedUser = await updateUserProfileDetails(userId as string, updateData) // Cast to string if necessary

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' })
//         }

//         return res.status(200).json(updatedUser) // Return the updated user profile
//     } catch (error) {
//         console.error(error) // Log the error for debugging
//         return res.status(500).json({ message: 'An error occurred while updating the profile' })
//     }
// }

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
        const userId = req.user?.id // Same here for accessing `req.user`

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' })
        }

        const deletedUser = await deleteUserById(userId as string) // Cast to string if necessary

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json({ message: 'User account deleted successfully' })
    } catch (error: unknown) {
        return res.status(500).json({ message: 'An error occurred while deleting the account' })
    }
}
// export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { error } = Joi.object({
//             email: Joi.string().email().required().messages({
//                 'string.email': 'Please enter a valid email address',
//                 'any.required': 'Email is required'
//             })
//         }).validate(req.body)

//         if (error) return res.status(400).json({ message: `hello ${error.details[0].message}` })

//         const { email } = req.body
//         const user = await findUserByEmail(email)
//         if (!user) return res.status(404).json({ message: 'User not found' })

//         // Generate a reset token
//         const resetToken = uuidv4() // Or use JWT for a time-limited token
//         const tokenExpiration = Date.now() + 3600000 // 1 hour expiration

//         // Save the token and expiration in the user's record
//         await saveResetToken(user.id, resetToken, tokenExpiration)

//         // Send reset email (implement email service)
//         await sendResetEmail(email, resetToken)

//         return res.status(200).json({ message: 'Password reset email sent' })
//     } catch (error: any) {
//         return res.status(400).json({ message: ` hello 2 ${error.message}` })
//     }
// }
// export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
//     const { email } = req.body

//     const { error } = Joi.object({
//         email: Joi.string().email().required().messages({
//             'string.email': 'Please enter a valid email address',
//             'any.required': 'Email is required'
//         })
//     }).validate(req.body)

//     if (error) {
//         return res.status(400).json({ message: error.details[0].message })
//     }

//     const user = await findUserByEmail(email)
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' })
//     }

//     const resetToken = uuidv4() // Consider using a JWT
//     const tokenExpiration = Date.now() + 3600000 // 1 hour

//     await saveResetToken(user.id, resetToken, tokenExpiration)
//     await sendResetEmail(email, resetToken)

//     return res.status(200).json({ message: 'Password reset email sent' })
// }
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

// export const updatePassword = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { token, newPassword } = req.body

//         // Verify the reset token
//         const user = await verifyResetToken(token)

//         // Hash the new password
//         user.password = await bcrypt.hash(newPassword, 10) // Use bcrypt directly here

//         // Clear the reset token and expiration
//         user.resetPasswordToken = undefined // Ensure your User model allows this field to be undefined
//         user.resetPasswordExpires = undefined // Ensure your User model allows this field to be undefined

//         // Save the updated user document
//         await user.save()

//         return res.status(200).json({ message: 'Password updated successfully' })
//     } catch (error: any) {
//         return res.status(400).json({ message: error.message })
//     }
// }

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
