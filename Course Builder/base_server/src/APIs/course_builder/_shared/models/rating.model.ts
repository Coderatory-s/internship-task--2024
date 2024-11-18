
import mongoose, { Document, Schema } from 'mongoose';

export interface IRating extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  rating: number;
  createdAt: Date;
}

const RatingSchema: Schema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const Rating = mongoose.models.Rating || mongoose.model<IRating>('Rating', RatingSchema);
export default Rating;
