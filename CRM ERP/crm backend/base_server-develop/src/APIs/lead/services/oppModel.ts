import mongoose, { Document, Schema } from 'mongoose';

export interface IOpportunity extends Document {
  leadId: string;
  name: string;
  email: string;
  phone: string;
  leadSource: string;
  // Add other fields as needed
}

const OpportunitySchema = new Schema<IOpportunity>({
  leadId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  leadSource: { type: String, required: true },
  // Define other fields and properties
});

export default mongoose.model<IOpportunity>('Opp', OpportunitySchema);
