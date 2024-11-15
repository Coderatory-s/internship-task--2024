import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: 'Unauthorized' }); // Return 401 if token is missing
    }

    try {
        const secret = process.env.JWT_SECRET as string; // Get JWT secret
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const decoded = jwt.verify(token, secret); // Verify token
        console.log("Decoded user:", decoded); // Log decoded user
        req.body.user = decoded; // Attach decoded user to request body
        return next(); // Call next middleware if token is valid
    } catch (error) {
        // Use type assertion to treat error as any
        console.error("Token verification error:", (error as Error).message); // Log the error message
        return res.status(403).json({ message: 'Forbidden', error: (error as Error).message }); // Return 403 if token is invalid
    }
};

export default authMiddleware;
