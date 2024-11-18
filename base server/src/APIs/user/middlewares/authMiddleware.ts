import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

// Extend the Request interface to include user property
interface CustomRequest extends Request {
    user?: string | JwtPayload
}

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.')
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next() // Proceed to the next middleware
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' })
    }
}
