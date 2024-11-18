
import { Schema, model, Document } from 'mongoose';

export interface IJobPost extends Document {
  jobTitle: string;
  department: string;
  jobType: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
}

const JobPostSchema = new Schema<IJobPost>({
  jobTitle: { type: String, required: true },
  department: { type: String, required: true },
  jobType: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

export const JobPost = model<IJobPost>('JobPost', JobPostSchema);
