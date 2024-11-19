// src/models/CandidateModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  email: string;
  position: string;
  status: string;
}

const CandidateSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    status: { type: String, required: true, enum: ['Applied', 'Interviewed', 'Hired', 'Rejected'] },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model<ICandidate>('Candidate', CandidateSchema);
