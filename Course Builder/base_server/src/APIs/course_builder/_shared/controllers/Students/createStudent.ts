import mongoose from 'mongoose';
import { UserModel } from '../../../../useUser/models/userModel';
import { CourseModel } from '../../models/course';
import Student from '../../models/student.model';

export const createStudent = async (req: any, res: any) => {
  const { email } = req.body; // Email of the student to enroll
  const { courseId } = req.params; // Course ID from the route parameter
  const user = req.user; // User from the middleware (authenticateStudent)

  try {
    // Validate the logged-in user
    if (!user || user.role !== 'student') {
      return res.status(403).json({ error: 'Only authenticated students can enroll in courses.' });
    }

    // Ensure the logged-in user's email matches the provided email
    const loggedInUser = await UserModel.findById(user.id);
    if (!loggedInUser || loggedInUser.email !== email) {
      return res.status(403).json({
        error: 'You can only enroll yourself in a course using your registered email.',
      });
    }

    // Find the course by ID
    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const course = await CourseModel.findById(courseObjectId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Check if the student is already enrolled in this course
    const existingStudent = await Student.findOne({ email: loggedInUser.email });
    if (existingStudent) {
      // If student is already created, just add the course if not already enrolled
      if (!existingStudent.enrolledCourses.some((id:any) => id.equals(courseObjectId))) {
        existingStudent.enrolledCourses.push(courseObjectId);
        await existingStudent.save();
      }
    } else {
      // Create a new Student entry if not already exists
    //   const newStudentData = await Student.create({
    //     email: loggedInUser.email,
    //     enrolledCourses: [courseObjectId],
    //   });
    }

    // Add the student to the course's enrolledStudents if not already present
    if (!course.enrolledStudents.some((id) => id.equals(loggedInUser._id))) {
      course.enrolledStudents.push(loggedInUser.id);
      await course.save();
    }

    // Send success response
    res.status(201).json({
      message: 'Student enrolled successfully.',
      student: {
        id: loggedInUser._id,
        email: loggedInUser.email,
      },
      course: {
        id: course._id,
        title: course.title,
      },
    });
  } catch (error: any) {
    console.error('Enrollment Error:', error.message);
    res.status(500).json({ error: `Error enrolling student: ${error.message}` });
  }
};
