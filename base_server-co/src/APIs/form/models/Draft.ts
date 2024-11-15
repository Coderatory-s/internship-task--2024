import mongoose, { Document, Schema, Types } from 'mongoose';

interface Draft extends Document {
  formId?: Types.ObjectId;
  createdBy: Types.ObjectId;
  title: string;
  description: string;
  fields: Array<any>;
  lastSavedAt: Date;
}

const draftSchema = new Schema<Draft>({
  formId: { type: Schema.Types.ObjectId, ref: 'Form' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fields: [{ type: Schema.Types.Mixed }],
  lastSavedAt: { type: Date, default: Date.now },
});

export default mongoose.model<Draft>('Draft', draftSchema);
