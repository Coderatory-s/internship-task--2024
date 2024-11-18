
import jwt from 'jsonwebtoken';
import { Request,  NextFunction } from 'express';
import { UserModel } from '../../../useUser/models/userModel'; // Adjust the path if necessary

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

interface CustomRequest extends Request {
  user?: any; // Attach user object to request for easy access later
}

export const authenticateUser = async (
  req: CustomRequest,
  res: any,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the header

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' }); // No token in the request
  }

  try {
    // Decode the token to get the user ID (JWT payload)
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // Find the user in the database using the decoded ID
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // User does not exist
    }

    // Check if the user has the 'admin' role
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, only admins can perform this action' }); // Only admin allowed
    }

    // Attach the user object to the request for further use in routes
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token or token expired' }); // Invalid or expired token
  }
};


