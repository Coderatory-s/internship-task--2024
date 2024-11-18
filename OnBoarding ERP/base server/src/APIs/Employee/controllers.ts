import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import Models1 from '../Employee/shared/model/Employee.model'
import jwt from 'jsonwebtoken'
import config from '../../config/config'
import transporter from './shared/emailconfig.ts/emailcon'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/

interface secret {
    JWT_SECRET_KEY: string // Define JWT_SECRET_KEY as a string
}
const CONFIG: secret = {
    JWT_SECRET_KEY: config.JWT_SECRET_KEY || '' // Provide a fallback
}

export const register = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, position, department, salary, isActive, password } = req.body

    try {
        // Check if all required fields are provided
        if (!firstName || !lastName || !email || !position || !department || !salary || !password) {
            res.status(400).json({ message: 'All fields are required' })
            return
        }

        // Email validation (basic format check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Invalid email format' })
            return
        }

        // Validate the plain text password against the regex pattern
        if (!passwordRegex.test(password)) {
            res.status(400).json({
                message:
                    'Password must be between 8 to 20 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
            })
            return
        }

        // Check if employee with the same email already exists
        const existingEmployee = await Models1.findOne({ email })
        if (existingEmployee) {
            res.status(400).json({ message: 'Employee with this email already exists' })
            return
        }

        // Hash the password after validation
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        // Create new employee
        const newEmployee = new Models1({
            firstName,
            lastName,
            email,
            position,
            department,
            salary,
            isActive,
            password: hashPassword // Store hashed password
        })

        // Save the employee to the database
        await newEmployee.save()

        // Send success response
        res.status(201).json({ message: `Employee registered successfully: ${firstName} ${lastName}` })
    } catch (error) {
        // Handle any server errors
        res.status(500).json({ message: 'Server error', error })
    }
}

export const loginHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const email: string = req.body.email
        const password: string = req.body.password

        // Check if the user exists
        const user = await Models1.findOne({ email })
        if (!user) {
            return res.status(400).send('Login not successful: User not found')
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            // Generate JWT token
            const token = jwt.sign({ id: user._id, email: user.email }, CONFIG.JWT_SECRET_KEY, {
                expiresIn: '1h' // Adjust expiration as needed
            })

            // Set the token in an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true, // Helps prevent client-side JS from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
                sameSite: 'strict', // Ensures cookie is sent only to same-site requests
                maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
            })

            return res.status(200).send('Login successful')
        } else {
            return res.status(400).send('Login not successful: Incorrect password')
        }
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
}

export const logoutHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Log the cookies to check if the token exists
        console.log('Cookies:', req.cookies)

        // Extract the token from the cookies
        const token = req.cookies.token // Assuming the JWT is stored in a cookie named 'token'
        if (!token) {
            return res.status(400).json({ message: 'No token found' })
        }

        // Clear the JWT token stored in cookies
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
            sameSite: 'strict', // Ensures cookie is sent only to same-site requests
            path: '/' // Adjust path if necessary
        })

        return res.status(200).send('Logout successful')
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
}

export const UserPasswordResetEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body

    if (email) {
        const user = await Models1.findOne({ email: email })

        if (user) {
            // Generate a token for resetting the password
            const secret = user._id.toString() + CONFIG.JWT_SECRET_KEY
            const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })

            // Create a link to the reset password page with the user ID and token
            const link = `http://localhost:3001/ResetPassword/${user._id}/${token}` // Updated link

            // Send Email
            let info = await transporter.sendMail({
                from: config.EMAIL_FROM,
                to: user.email,
                subject: 'GeekShop - Password Reset Link',
                html: `
                    <div style="text-align: center; font-family: Arial, sans-serif;">
                        <h2>Password Reset Request</h2>
                        <p>You requested a password reset. Click the button below to reset your password:</p>
                        <a href="${link}" style="text-decoration: none;">
                            <button style="
                                background-color: #28a745;
                                color: white;
                                padding: 10px 20px;
                                border: none;
                                border-radius: 5px;
                                font-size: 16px;
                                cursor: pointer;
                            ">
                                Reset Password
                            </button>
                        </a>
                        <p>If you did not request this, please ignore this email.</p>
                    </div>
                `
            })

            res.send({ status: 'success', message: 'Password Reset Email Sent. Please check your email.', info: info })
        } else {
            res.send({ status: 'failed', message: "Email doesn't exist" })
        }
    } else {
        res.send({ status: 'failed', message: 'Email field is required' })
    }
}

// In `pages/api/reset-password/[id]/[token].ts`

export const userPasswordReset = async (req: Request, res: Response): Promise<Response> => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params

    try {
        const user = await Models1.findById(id)

        if (!user) {
            return res.status(404).send({ status: 'failed', message: 'User not found' })
        }

        const new_secret = user._id.toString() + CONFIG.JWT_SECRET_KEY
        jwt.verify(token, new_secret)

        // Regex for password validation: at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!password || !password_confirmation) {
            return res.status(400).send({ status: 'failed', message: 'All Fields are Required' })
        }

        // Check if password matches the regex
        if (!passwordRegex.test(password)) {
            return res.status(400).send({
                status: 'failed',
                message:
                    'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
            })
        }

        if (password !== password_confirmation) {
            return res.status(400).send({ status: 'failed', message: "New Password and Confirm New Password don't match" })
        }

        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)

        await Models1.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })

        // Send a success response
        return res.send({ status: 'success', message: 'Password Reset Successfully' })
    } catch (error) {
        // console.error(error) // Log the error for debugging
        return res.status(500).send({ status: 'failed', message: 'Invalid Token or Server Error' })
    }
}
