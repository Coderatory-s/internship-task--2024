import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../../config/config'
// import { RateLimiterUnion } from 'rate-limiter-flexible'

const JWT_SECRET = config.TOKENS.ACCESS.SECRET
export interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload // Adjust based on your JWT payload structure
}
export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
        res.status(401).json({ message: 'Access denied, no token provided' })
        return
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        res.status(401).json({ message: 'Access denied, no token provided' })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        console.log('Decoded token:', decoded) // Log the entire token payload

        req.user = decoded // Attach decoded token to the request
        next()
    } catch (error) {
        console.error('Token verification failed:', error)
        res.status(400).json({ message: 'Invalid token' })
        return
    }
}
