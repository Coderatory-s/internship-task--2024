import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

// Extend the Request interface to include user property
export interface CustomRequest extends Request {
    user?: { id: string } // Adjust the type of user based on your JWT structure
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: 'Access denied, no token provided' })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded as { id: string } // Type assertion to ensure TypeScript recognizes the structure
        next()
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' })
        return
    }
}
