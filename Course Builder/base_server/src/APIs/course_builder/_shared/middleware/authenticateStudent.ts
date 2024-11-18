import { Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../../useUser/models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

interface CustomRequest extends Request {
  user?: { id: string; role: string };
}

export const authenticateStudent = async (
  req: CustomRequest,
  res: any,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided. Please log in.' });
  }

  try {
    // Decode the token to get the user ID
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // Ensure the user exists in the database
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found. Please log in again.' });
    }

    // Check if the user's role is 'student'
    if (user.role !== 'student') {
      return res.status(403).json({ error: 'Only students can enroll in courses.' });
    }

    // Attach the user ID and role to the request object
    req.user = { id: user._id.toString(), role: user.role };
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error); // Optionally log the error for debugging
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
