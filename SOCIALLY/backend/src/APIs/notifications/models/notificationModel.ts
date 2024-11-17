import mongoose, { Document, Schema } from 'mongoose'

export interface INotification extends Document {
    userId: mongoose.Types.ObjectId // User who will receive the notification
    content: string // Description of the notification
    type: string // e.g., 'like', 'comment', 'friend_request'
    postId?: mongoose.Types.ObjectId // Optional, to associate notifications with a specific post
    timestamp: Date
}

const notificationSchema = new Schema<INotification>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, // User receiving the notification
    content: { type: String, required: true },
    type: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }, // Optional post ID if related to a post
    timestamp: { type: Date, default: Date.now }
})

export default mongoose.model<INotification>('Notification', notificationSchema)
