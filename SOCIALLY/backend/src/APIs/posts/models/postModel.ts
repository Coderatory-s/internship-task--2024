import mongoose, { Document, Schema } from 'mongoose'

// Interface for the comment structure
export interface IComment {
    id: string
    userId: string
    comment: string
    type: 'text' | 'voice' | 'image' // Enum for type of comment
    opinion: 'against' | 'favor' | 'neutral' | 'opinion' // Enum for opinion types
    replies?: IComment[] // For replies on comments
    reactions?: { userId: string; reactionType: string }[] // Array of reactions (userId + reactionType)
}

// Interface for the post structure
export interface IPost extends Document {
    title: string
    content: {
        text?: string
        images?: string[]
        videos?: string[]
        documents?: string[] // pdf, word, excel
        voice?: string
        poll?: {
            question: String
            options: [String] // Poll options
            votes: [Number] // Votes per option (initially set to 0)
            voters: [
                {
                    // Track which users have already voted
                    userId: { type: mongoose.Schema.Types.ObjectId; ref: 'User' }
                    votedOptionIndex: Number // Which option the user voted for
                }
            ]
        }
    }
    likes: number
    comments: IComment[] // Array of comments
    likedBy: string[] // List of user IDs who liked the post
    // userName: string // New field to store the user's name
}

// Define the schema for replies
const replySchema: Schema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        comment: { type: String, required: true },
        type: {
            type: String,
            enum: ['text', 'voice', 'image'],
            required: true,
            default: 'text'
        },
        opinion: {
            type: String,
            enum: ['against', 'favor', 'neutral', 'opinion'],
            required: true,
            default: 'neutral'
        },
        reactions: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, required: true },
                reactionType: { type: String, required: true }
            }
        ] // Array of reactions for replies
    },
    { timestamps: true }
)

// Define the schema for comments
const commentSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        comment: { type: String, required: true },
        type: {
            type: String,
            enum: ['text', 'voice', 'image'],
            default: 'text'
        },
        opinion: {
            type: String,
            enum: ['against', 'favor', 'neutral', 'opinion'],
            default: 'neutral'
        },
        replies: [replySchema], // Array of replies
        reactions: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, required: true },
                reactionType: { type: String, required: true }
            }
        ] // Array of reactions for comments
    },
    { timestamps: true }
)

const postSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        content: {
            text: { type: String }, // Optional text content
            images: [{ type: String }], // Optional array of image URLs
            videos: [{ type: String }], // Optional array of video URLs
            documents: [{ type: String }], // Optional array of document URLs
            voice: { type: String }, // Optional voice content URL
            poll: {
                question: { type: String },
                options: [{ type: String }], // Poll options
                votes: [{ type: Number }] // Vote counts
            }
        },
        likes: { type: Number, default: 0 }, // Likes count
        comments: [commentSchema], // Array of comments
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of user IDs who liked the post
    },
    { timestamps: true }
)

export default mongoose.model<IPost>('Post', postSchema)
