import jwt from 'jsonwebtoken'
import { NextFunction } from 'express'

const authenticateUser = (req: any, res: any, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1] // Bearer token format

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) // Verify JWT token
        req.user = decoded // Attach the user info to req.user (no optional chaining here)
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

export default authenticateUser
