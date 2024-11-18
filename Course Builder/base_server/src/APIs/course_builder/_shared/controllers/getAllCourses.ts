import {  Response } from 'express';
import { CourseModel } from '../models/course';
import { UserModel } from '../../../useUser/models/userModel';

export const getAllCoursesByAdmins = async (req: any, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated' });
      return;
    }

    console.log("Authenticated User:", user);

    // Find all users with the role 'admin'
    const admins = await UserModel.find({ role: 'admin' });
    if (admins.length === 0) {
      res.status(404).json({ message: 'No admins found in the system' });
      return;
    }

    const adminIds = admins.map(admin => admin._id);
    console.log("Admin IDs:", adminIds);

    // Find all courses created by the admins
    const courses = await CourseModel.find({ createdBy: { $in: adminIds } });
    console.log("Courses Found:", courses);

    if (courses.length === 0) {
      res.status(404).json({ message: "No courses created by admins are available at the moment" });
      return;
    }

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
