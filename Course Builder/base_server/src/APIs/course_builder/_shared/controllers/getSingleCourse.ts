import { Request } from 'express';
import { CourseModel } from '../models/course';

interface CustomRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

const getSingleCourse = async (req: CustomRequest, res: any) => {
  const { userId, courseId } = req.params; // Extract userId and courseId from the route parameters
  const user = req.user;  // Comes from the middleware (authentication)

  // Ensure user is authenticated
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
  }

  // Check if the authenticated user matches the userId in the route
  if (user._id.toString() !== userId) {
    return res.status(403).json({ error: 'You can only view your own courses' });
  }

  try {
    // Find the course by its ID
    const course = await CourseModel.findOne({ _id: courseId, createdBy: user._id });

    // If course is not found, return 404 error
    if (!course) {
      return res.status(404).json({ error: 'Course not found or does not belong to the user' });
    }

    // Send the course details along with the enrolled students (if any)
    res.json({
      ...course.toObject(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching the course' });
  }
};

export default getSingleCourse;
