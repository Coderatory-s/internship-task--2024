// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Set a default status code if none is provided
    const statusCode = err.status || 500 // Default to 500 (Internal Server Error)

    res.status(statusCode).json({
        message: err.message || 'An unexpected error occurred',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Hide stack in production
    })
}

export default errorHandler
