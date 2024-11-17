// import * as chatRepository from '../repositories/chatRepository'
// import { IMessage, IConversation, IDeleteMessageResponse } from '../types'

// // Handle sending a message
// export const sendMessage = async (senderId: string, receiverId: string, message: string): Promise<IMessage> => {
//     return chatRepository.saveMessage(senderId, receiverId, message)
// }

// // Get messages between two users
// export const getMessages = async (senderId: string, receiverId: string): Promise<IMessage[]> => {
//     return chatRepository.getMessagesBetweenUsers(senderId, receiverId)
// }

// // Get all conversations for a user
// export const getConversations = async (userId: string): Promise<IConversation> => {
//     return chatRepository.getConversations(userId)
// }

// // Delete a message by ID
// export const deleteMessage = async (messageId: string): Promise<IDeleteMessageResponse> => {
//     const message = await chatRepository.deleteMessageById(messageId)
//     if (!message) {
//         throw new Error('Message not found')
//     }
//     return { message: 'Message deleted successfully' }
// }
