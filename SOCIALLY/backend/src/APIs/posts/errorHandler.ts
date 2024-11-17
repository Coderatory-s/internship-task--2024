import { Request, Response, NextFunction } from 'express'

export default function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    const statusCode = err.statusCode || 500 // Fallback to 500 if no status code is provided
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Only include stack trace in development
    })
}
