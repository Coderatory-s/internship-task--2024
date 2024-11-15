import mongoose, { Schema, Document } from 'mongoose';

export interface IForm extends Document {
    name: string;
    description: string;
    token: string;  // Unique token for sharing
}

const FormSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    token: { type: String, required: true, unique: true }  // Ensure uniqueness
});

export default mongoose.model<IForm>('Form', FormSchema);
