import mongoose, { Document, Schema, Types } from 'mongoose';

interface Response extends Document {
  formId: Types.ObjectId;  // Use Types.ObjectId instead of string
  submittedBy: Types.ObjectId;  // Use Types.ObjectId instead of string
  answers: Array<{ fieldId: string; answer: string | number | boolean }>;
  submittedAt: Date;
}

const responseSchema = new Schema<Response>({
  formId: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
  submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  answers: [
    {
      fieldId: { type: String, required: true },
      answer: { type: Schema.Types.Mixed, required: true },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model<Response>('Response', responseSchema);
