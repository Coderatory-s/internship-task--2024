// import { NextFunction, Request, Response } from 'express'
// import { THttpError } from '../types/types'

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export default (err: THttpError, _: Request, res: Response, __: NextFunction) => {
//     res.status(err.statusCode).json(err)
// }



import { NextFunction, Request, Response } from 'express';
import { THttpError } from '../types/types';

export default (err: THttpError, _: Request, res: Response, __: NextFunction) => {
    const statusCode = err.statusCode || 500; // Default to 500 if no statusCode
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        statusCode,
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { stack: err }), // Optionally include stack trace in development
    });
};
