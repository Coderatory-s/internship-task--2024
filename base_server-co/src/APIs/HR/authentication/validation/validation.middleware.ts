import { Request, Response, NextFunction } from 'express';
import { registerSchema, loginSchema } from './validation.schema';
import { IRegisterRequest, ILoginRequest } from '../types/authentication.interface';

// Middleware to validate registration data
export const validateRegister = (req: Request<{}, {}, IRegisterRequest>, res: Response, next: NextFunction) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ message: error.details[0].message });
    }
    next();
};

// Middleware to validate login data
export const validateLogin = (req: Request<{}, {}, ILoginRequest>, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ message: error.details[0].message });
    }
    next();
};
