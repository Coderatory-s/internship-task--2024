// controllers/chatController.ts
import { Request, Response } from 'express'
import { ChatModel } from '../models/chatModel'
import Message from '../models/messageModel'
// import { CustomRequest } from '../../user/middlewares/authMiddleware'

// Create a new chat (either one-on-one or group)
export const createChat = async (req: any, res: Response) => {
    const { users, groupName } = req.body
    const userId = req.user?._id // assuming user ID is stored in req.user after authentication

    if (!users || users.length < 2) {
        return res.status(400).send('You need at least 2 users for a chat.')
    }

    // Check if it's a group chat
    const isGroupChat = users.length > 2
    let chatData = {
        users: [...users, userId],
        group: isGroupChat,
        createdBy: userId,
        groupName: isGroupChat ? groupName : null
    }

    const newChat = await ChatModel.create(chatData)

    return res.status(201).json(newChat)
}

// Send a message in a chat
export const sendMessage = async (req: any, res: Response) => {
    const { chatId, message } = req.body
    const senderId = req.user._id

    const chat = await ChatModel.findById(chatId)
    if (!chat) {
        return res.status(404).send('Chat not found')
    }

    const newMessage = await Message.create({
        chatId: chat._id,
        sender: senderId,
        message: message,
        timestamp: new Date()
    })

    return res.status(201).json(newMessage)
}

// Get all chats for a user
export const getChats = async (req: any, res: Response) => {
    const userId = req.user._id
    const chats = await ChatModel.find({ users: userId })

    return res.status(200).json(chats)
}

// Get all messages in a chat
export const getMessages = async (req: Request, res: Response) => {
    const { chatId } = req.params
    const messages = await Message.find({ chatId })

    return res.status(200).json(messages)
}

// Delete a chat
export const deleteChat = async (req: Request, res: Response) => {
    const { chatId } = req.params
    const chat = await ChatModel.findByIdAndDelete(chatId)

    if (!chat) {
        return res.status(404).send('Chat not found')
    }

    return res.status(200).send('Chat deleted successfully')
}

// Create a group chat
export const createGroup = async (req: any, res: Response) => {
    const { groupName, users } = req.body
    const userId = req.user._id

    const newGroup = await createChat({ body: { users: [...users, userId], groupName } }, res)
    return res.status(201).json(newGroup)
}

// Add user to group
export const addUserToGroup = async (req: Request, res: Response) => {
    const { chatId, userIdToAdd } = req.body
    const chat = await ChatModel.findById(chatId)

    if (!chat || !chat.group) {
        return res.status(404).send('Group not found')
    }

    if (!chat.users.includes(userIdToAdd)) {
        chat.users.push(userIdToAdd)
        await chat.save()
    }

    return res.status(200).send('User added to group')
}

// Remove user from group (Admin functionality)
export const removeUserFromGroup = async (req: any, res: Response) => {
    const { chatId, userIdToRemove } = req.body
    const chat = await ChatModel.findById(chatId)

    if (!chat || !chat.group) {
        return res.status(404).send('Group not found')
    }

    if (chat.createdBy !== req.user._id) {
        return res.status(403).send('Only the group creator can remove users.')
    }

    chat.users = chat.users.filter((userId) => userId !== userIdToRemove)
    await chat.save()

    return res.status(200).send('User removed from group')
}

// Leave a group
export const leaveGroup = async (req: any, res: Response) => {
    const { chatId } = req.body
    const userId = req.user._id

    const chat = await ChatModel.findById(chatId)
    if (!chat || !chat.group) {
        return res.status(404).send('Group not found')
    }

    chat.users = chat.users.filter((user) => user !== userId)
    await chat.save()

    return res.status(200).send('You have left the group.')
}

// Delete a group
export const deleteGroup = async (req: any, res: Response) => {
    const { chatId } = req.body
    const chat = await ChatModel.findById(chatId)

    if (!chat || !chat.group) {
        return res.status(404).send('Group not found')
    }

    if (chat.createdBy !== req.user._id) {
        return res.status(403).send('Only the group creator can delete the group.')
    }

    await chat.deleteOne() // Deletes the document

    return res.status(200).send('Group deleted successfully.')
}
