import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
  email: string;
  enrolledCourses: mongoose.Types.ObjectId[]; // Array of course ObjectIds
}

const StudentSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
