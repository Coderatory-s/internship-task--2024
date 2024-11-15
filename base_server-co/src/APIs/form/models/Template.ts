import mongoose, { Document, Schema, Types } from 'mongoose';

interface Template extends Document {
  title: string;
  description: string;
  fields: Array<any>;
  createdBy: Types.ObjectId; // Updated to Types.ObjectId
  createdAt: Date;
}

const templateSchema = new Schema<Template>({
  title: { type: String, required: true },
  description: String,
  fields: [{ type: Schema.Types.Mixed, required: true }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Template>('Template', templateSchema);
