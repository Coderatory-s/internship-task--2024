import mongoose, { Schema, Document } from 'mongoose';

export interface IProgressTracker extends Document {
  taskName: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  comments?: string;
}

const ProgressTrackerSchema: Schema = new Schema(
  {
    taskName: { type: String, required: true },
    progress: { type: Number, required: true, min: 0, max: 100 },
    status: { 
      type: String, 
      required: true, 
      enum: ['not_started', 'in_progress', 'completed'] 
    },
    comments: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProgressTracker>('ProgressTracker', ProgressTrackerSchema);
