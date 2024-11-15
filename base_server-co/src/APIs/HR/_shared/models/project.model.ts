import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    name: string;
    description?: string;
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
