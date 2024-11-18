import { Request, Response } from 'express';
import { CourseModel } from '../models/course';

interface CustomRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

export const uploadCourse = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const user = req.user; // Comes from middleware

    if (!user) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated' });
      return; // Stop further execution
    }

    if (user.role !== 'admin') {
      res.status(403).json({ error: 'Only admins can upload courses' });
      return; // Stop further execution
    }

    const course = new CourseModel({ title, description, createdBy: user._id });
    await course.save();

    res.status(201).json({ message: 'Course uploaded successfully', course });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
