
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'



import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/userModel'; 

interface CustomRequest extends Request {
  user?: any;
}

export const authenticateToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied, no token provided' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }; 
    const user = await UserModel.findById(decoded.id); 
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; 
    }

    req.user = user;
    next(); 
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};


