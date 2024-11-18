// models/chatModel.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IChat extends Document {
    users: string[] // User IDs involved in the chat
    group: boolean // Whether the chat is a group chat or not
    groupName?: string // Only for group chats
    createdBy: string // User ID of the person who created the group
}

const ChatSchema: Schema = new Schema(
    {
        users: { type: [String], required: true },
        group: { type: Boolean, default: false },
        groupName: { type: String },
        createdBy: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

export const ChatModel = mongoose.model<IChat>('Chat', ChatSchema)
