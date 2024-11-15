// src/APIs/form/models/formResponseModel.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IFormResponse extends Document {
    formId: string; // The ID of the form to which the response belongs
    response: any; // The response data (you can specify a more detailed structure based on your requirements)
    submittedAt: Date; // Timestamp of when the response was submitted
}

const FormResponseSchema: Schema = new Schema({
    formId: { type: String, required: true },
    response: { type: Object, required: true }, // Change to a more specific structure if needed
    submittedAt: { type: Date, default: Date.now }
});

const FormResponse = mongoose.model<IFormResponse>('FormResponse', FormResponseSchema);
export default FormResponse;
