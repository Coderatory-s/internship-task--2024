import Student from '../../models/student.model';
// import { Request, Response } from 'express';

export const getAllStudents = async (req: any, res: any) => {
  const { courseId } = req.params;  // `courseId` is the course ID in the URL

  try {
    // Ensure the logged-in user is an admin (this check is already done by the authenticateToken middleware)
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'You must be an admin to view the enrolled students.' });
    }

    // Find students who are enrolled in this course
    const students = await Student.find({ enrolledCourses: courseId });

    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'No students found for this course.' });
    }

    res.json(students);  // Send the list of students
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Error fetching students.' });
  }
};
