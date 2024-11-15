import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for a team document
interface ITeam extends Document {
    teamName: string;
    description: string;
    leader: {
        name: string;
        email: string;
    };
    members: Array<{
        name: string;
        email: string;
        role: string;
    }>;
    createdAt: Date;
}

// Create a Mongoose schema for the team
const TeamSchema: Schema = new Schema({
    teamName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    leader: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        }
    },
    members: [
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                match: [/.+\@.+\..+/, 'Please fill a valid email address'],
            },
            role: {
                type: String,
                required: true,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
const Team = mongoose.model<ITeam>('Team', TeamSchema);

export default Team;
