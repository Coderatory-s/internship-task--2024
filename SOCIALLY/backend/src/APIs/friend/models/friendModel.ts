import mongoose, { Schema, Document } from 'mongoose'

export interface IFriend extends Document {
    senderId: string
    receiverId: string
    status: 'pending' | 'accepted' | 'rejected'
}

const friendSchema: Schema = new Schema(
    {
        senderId: { type: String, required: true },
        receiverId: { type: String, required: true },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
    },
    { timestamps: true }
)

export const Friend = mongoose.model<IFriend>('Friend', friendSchema)
