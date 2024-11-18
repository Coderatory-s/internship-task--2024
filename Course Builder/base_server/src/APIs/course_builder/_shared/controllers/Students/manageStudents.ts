// // import mongoose from 'mongoose';
// import { Request, Response } from 'express';
// import { enrollInCourse } from '../Students/enrollInCourse';
// // import  Course  from '../../models/course.model';

// export const enrollStudent = async (req: Request, res: Response) => {
//   const { studentId, courseId } = req.body;

//   try {
//     const result = await enrollInCourse(studentId, courseId);
//     res.json(result);
//   } catch (error: any) {
//     res.status(500).send(error.message);
//   }
// };

