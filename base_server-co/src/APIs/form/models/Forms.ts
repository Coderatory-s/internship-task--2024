import mongoose, { Document, Schema, Types } from 'mongoose';

// Define the Form interface extending mongoose Document
interface Form extends Document {
  title: string;
  description: string;
  fields: Array<any>;
  responses: Array<Types.ObjectId>; // Array of ObjectIds referencing Response documents
  createdBy: Types.ObjectId; // ObjectId referencing the User document
  permissions: object;
}

// Define the schema
const formSchema = new Schema<Form>({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  fields: [{ type: Schema.Types.Mixed, required: true }], // Flexible field type for various field structures
  responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }], // Array of Response references
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  permissions: { type: Schema.Types.Mixed, default: {} }, // Object type for flexible permission structure
});

// Export the model, checking if it already exists to prevent OverwriteModelError
export default mongoose.models.Form || mongoose.model<Form>('Form', formSchema);