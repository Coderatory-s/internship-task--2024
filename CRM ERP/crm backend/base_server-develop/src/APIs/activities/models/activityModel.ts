// /src/features/activities/models/activityModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  leadId: mongoose.Types.ObjectId; // Reference to the Lead
  activityType: 'Call' | 'Email' | 'Meeting';
  description: string;
  dateTime: Date;
  assignedSalesRep: string; // Name or ID of the sales representative
}

const activitySchema: Schema<IActivity> = new Schema({
  leadId: { type: Schema.Types.ObjectId, required: true, ref: 'Lead' },
  activityType: { type: String, enum: ['Call', 'Email', 'Meeting'], required: true },
  description: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  assignedSalesRep: { type: String, required: true },
});

export default mongoose.model<IActivity>('Activity', activitySchema);
