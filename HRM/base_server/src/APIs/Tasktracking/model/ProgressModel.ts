// src/models/TaskModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  taskName: string;
  progress: number;
  status: string;
  comments: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema: Schema = new Schema(
  {
    taskName: { type: String, required: true },
    progress: { type: Number, required: true, min: 0, max: 100 },
    status: { type: String, required: true, enum: ['not_started', 'in_progress', 'completed'] },
    comments: { type: String },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

export default mongoose.model<ITask>('Task', TaskSchema);
