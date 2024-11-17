import mongoose, { Schema } from 'mongoose'

// Define the schema for the Message model
const messageSchema: Schema = new Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

// Check if the model already exists in mongoose.models to prevent redefinition
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

export default Message
