// import Message from '../models/chatModel'
// import { IMessage, IConversation } from '../types'

// // Save a new message to the database
// export const saveMessage = async (senderId: string, receiverId: string, message: string): Promise<IMessage> => {
//     const newMessage = new Message({
//         senderId,
//         receiverId,
//         message
//     })
//     return await newMessage.save()
// }

// // Fetch messages between two users
// export const getMessagesBetweenUsers = async (senderId: string, receiverId: string): Promise<IMessage[]> => {
//     return Message.find({
//         $or: [
//             { senderId, receiverId },
//             { senderId: receiverId, receiverId: senderId }
//         ]
//     }).sort({ createdAt: 1 })
// }

// // Fetch all conversations for a user
// // Fetch all conversations for a user
// export const getConversations = async (userId: string): Promise<IConversation[]> => {
//     const senderConversations = await Message.distinct('receiverId', { senderId: userId })
//     const receiverConversations = await Message.distinct('senderId', { receiverId: userId })

//     // Merge both sender and receiver conversations
//     const conversations = [...senderConversations, ...receiverConversations]

//     // Return the correct structure
//     return [
//         {
//             userId,
//             conversations // This now contains an array of ObjectId values
//         }
//     ]
// }

// // Delete a specific message
// export const deleteMessageById = async (messageId: string): Promise<IMessage | null> => {
//     return Message.findByIdAndDelete(messageId)
// }
