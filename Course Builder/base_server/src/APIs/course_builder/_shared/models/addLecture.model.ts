// create lecture model
import mongoose, { Document, Schema } from 'mongoose';

export interface ILecture extends Document {
  title: string;
  type: 'video' | 'article' | 'text';
  courseId: mongoose.Types.ObjectId;
  videoUrl?: string;
  articleContent?: string;
  textContent?: string;
  createdAt: Date;
}

// Create the Lecture schema
const LectureSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'article', 'text'], required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  videoUrl: {
    type: String,
    required: function (this: ILecture) {
      return this.type === 'video';
    }
  },
  articleContent: {
    type: String,
    required: function (this: ILecture) {
      return this.type === 'article';
    }
  },
  textContent: {
    type: String,
    required: function (this: ILecture) {
      return this.type === 'text';
    }
  },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the Lecture model
const Lecture = mongoose.model<ILecture>('Lecture', LectureSchema);
export default Lecture;
