import { Request, Response, NextFunction } from 'express';
import { leadSchema } from './leadValidation';

const validateLead = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = leadSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return; // Ensure to return here to stop further execution
  }

  next(); // Or return next();
};

export default validateLead;
