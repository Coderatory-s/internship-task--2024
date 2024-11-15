import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for your model
export interface IPser extends Document {
    name: string;
    email: string;
    password: string;
}

// Create a schema for the model
const PserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Check if the model already exists to prevent overwriting
const Pser = mongoose.models.Pser || mongoose.model<IPser>('Pser', PserSchema);

export default Pser;
