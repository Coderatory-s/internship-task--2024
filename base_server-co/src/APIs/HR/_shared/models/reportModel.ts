import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for a report document
interface IReport extends Document {
    title: string;
    description: string;
    progress: number; // Progress percentage (0-100)
    author: {
        name: string;
        email: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

// Create a Mongoose schema for the report
const ReportSchema: Schema = new Schema({
    title: {
        type: String,
        required: true, // The report title is required
    },
    description: {
        type: String,
        required: true, // The description is required
    },
    progress: {
        type: Number,
        required: true, // Progress is required (between 0 and 100)
        min: 0,
        max: 100,
    },
    author: {
        name: {
            type: String,
            required: true, // The author's name is required
        },
        email: {
            type: String,
            required: true, // The author's email is required
            match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Email validation
        }
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the current date and time
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically set the current date and time
    }
});

// Add a pre-save hook to update the `updatedAt` field before each save
ReportSchema.pre<IReport>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Export the model
const Report = mongoose.model<IReport>('Report', ReportSchema);

export default Report;
