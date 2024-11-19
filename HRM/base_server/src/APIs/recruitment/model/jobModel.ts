// src/models/JobModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  jobTitle: string;
  department: string;
  jobType: string;
  location: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

const JobSchema: Schema = new Schema(
  {
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
    jobType: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model<IJob>('Job', JobSchema);
