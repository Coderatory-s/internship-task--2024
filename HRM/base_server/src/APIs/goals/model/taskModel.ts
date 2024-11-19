import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  taskName: string;
  description: string;
  dueDate: Date;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed';  // Ensure this matches exactly
  progress: number; // Assuming this is a percentage or similar metric
}

const TaskSchema: Schema = new Schema<ITask>(
  {
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    assignedTo: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],  // Make sure these values match
    },
    progress: { type: Number, required: true }, // Add this field
  },
  { timestamps: true }
);

// Check if the model already exists before defining it again
export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
