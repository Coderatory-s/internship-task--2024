import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            authenticatedUser?: {
                id: string; // Change the type as necessary
                // Add other properties if needed
            };
        }
    }
}
