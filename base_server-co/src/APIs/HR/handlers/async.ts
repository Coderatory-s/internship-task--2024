import { Request, Response, NextFunction } from 'express';

/**
 * A higher-order function that wraps async route handlers.
 * @param fn - The async function to wrap.
 * @returns A function that takes req, res, and next, and calls the async function.
 */
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next); // Call the async function and catch errors
    };

export default asyncHandler;
