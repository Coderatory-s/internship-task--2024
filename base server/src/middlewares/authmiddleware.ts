import { Request, Response, NextFunction } from 'express'
import config from '../config/config'
import jwt from 'jsonwebtoken'
import { IAuthenticateRequest } from '../../src/APIs/recruitment/types/type'
import { IDecryptedJwt } from '../../src/APIs/recruitment/types/type'

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Extract token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: 'No token provided' })
        return
    }

    // Check if ACCESS_TOKEN_SECRET is properly loaded
    if (!config.TOKENS.ACCESS.SECRET) {
        res.status(500).json({ message: 'Server configuration error' })
        return
    }

    // Verify token with the secret key
    jwt.verify(token, config.TOKENS.ACCESS.SECRET, (err, decoded) => {
        if (err) {
             // Logs specific error details
            if (err.name === 'TokenExpiredError') {
                res.status(403).json({ message: 'Token has expired' })
            } else if (err.name === 'JsonWebTokenError') {
                res.status(403).json({ message: 'Token is invalid' })
            } else {
                res.status(403).json({ message: 'Failed to authenticate token' })
            }
            return
        }

        // Attach the decoded user information to the request
        ;(req as unknown as IAuthenticateRequest).authenticatedUser = decoded as IDecryptedJwt
        next()
    })
}
