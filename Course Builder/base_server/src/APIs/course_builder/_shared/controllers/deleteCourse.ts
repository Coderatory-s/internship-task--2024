import { Request, Response } from 'express';
import { CourseModel } from '../models/course';

interface CustomRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

const deleteCourse = async (req: CustomRequest, res: Response) => {
  const { courseId } = req.params; // Use a clear parameter name like 'courseId'
  const user = req.user; // Extract user from middleware

  // Ensure the user is authenticated
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
  }

  try {
    // Find the course by ID and ensure it belongs to the authenticated user
    const course = await CourseModel.findOne({ _id: courseId, createdBy: user._id });

    if (!course) {
      return res.status(404).json({ error: 'Course not found or does not belong to the user' });
    }

    // Delete the course
    const deletedCourse = await CourseModel.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(500).json({ error: 'Failed to delete the course' });
    }

    return res.json({ message: 'Course deleted successfully', deletedCourse });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default deleteCourse;
