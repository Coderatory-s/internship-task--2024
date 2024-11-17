import mongoose, { Schema, Document } from 'mongoose'

export interface IFriendRequest extends Document {
    senderId: string
    receiverId: string
    status: 'pending' | 'accepted' | 'rejected'
}

const FriendRequestSchema: Schema = new Schema(
    {
        senderId: { type: String, required: true },
        receiverId: { type: String, required: true },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
    },
    {
        timestamps: true
    }
)

export const FriendRequest = mongoose.model<IFriendRequest>('FriendRequest', FriendRequestSchema)
