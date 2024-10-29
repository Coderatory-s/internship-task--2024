import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  leadSource: string;
  status: string;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String,unique:true },
    leadSource: { type: String, required: true },
    status: { type: String, required: true, enum: ['New', 'In Progress', 'Closed',"Qualified"] }
  },
  {
    timestamps: true // Enable timestamps
  }
);

export default mongoose.model<ILead>('Lead', LeadSchema);
