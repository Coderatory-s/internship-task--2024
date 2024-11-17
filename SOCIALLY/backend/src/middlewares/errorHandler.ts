// import { NextFunction, Request, Response } from 'express'
// import { THttpError } from '../types/types'

import { Request, Response, NextFunction } from 'express'

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export default (err: THttpError, _: Request, res: Response, __: NextFunction) => {
//     res.status(err.statusCode).json(err)
// }

// src/middlewares/errorHandler.ts
const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack) // Log the error for debugging

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode // Ensure the status code is set
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Hide stack in production
    })
}

export default errorHandler

