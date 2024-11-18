// import mongoose, { Document, Schema } from 'mongoose';

// export interface IStudent extends Document {
//   name: string;
//   email: string;
//   enrolledCourses: mongoose.Types.ObjectId[]; 
// }

// const StudentSchema: Schema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
// });

// const Student = mongoose.model<IStudent>('Student', StudentSchema);

// export default Student;
