// express.d.ts

import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string; // Adjust the type based on your user ID type
                // Include any other properties you want to add
            };
        }
    }
}
