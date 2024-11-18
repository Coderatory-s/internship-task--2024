import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  enrolledStudents: mongoose.Types.ObjectId[]; // Array of student ObjectIds
}

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledStudents: { 
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
  },
  { timestamps: true }
);

// Ensure unique title per admin
CourseSchema.index({ title: 1, createdBy: 1 }, { unique: true });

export const CourseModel = mongoose.model<ICourse>('Course', CourseSchema);
