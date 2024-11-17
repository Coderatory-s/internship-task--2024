import { Request, Response } from 'express'
import {
    sendLikeNotification,
    sendCommentNotification,
    sendFriendRequestNotification,
    getNotificationsByUserId
} from '../services/notificationService'

// Controller to send like notification
export const sendLikeNotificationController = async (req: Request, res: Response) => {
    const { postId, postOwnerId, likerId } = req.body

    if (!postId || !postOwnerId || !likerId) {
        return res.status(400).json({ message: 'postId, postOwnerId, and likerId are required' })
    }

    try {
        const notification = await sendLikeNotification(postId, postOwnerId, likerId)
        return res.json({ notificationId: notification._id, status: 'Sent' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

// Controller to send comment notification
export const sendCommentNotificationController = async (req: Request, res: Response) => {
    const { postId, postOwnerId, commenterId, commentText } = req.body

    if (!postId || !postOwnerId || !commenterId || !commentText) {
        return res.status(400).json({ message: 'postId, postOwnerId, commenterId, and commentText are required' })
    }

    try {
        const notification = await sendCommentNotification(postId, postOwnerId, commenterId, commentText)
        return res.json({ notificationId: notification._id, status: 'Sent' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

// Controller to send friend request notification
export const sendFriendRequestNotificationController = async (req: Request, res: Response) => {
    const { receiverId, requesterId } = req.body

    if (!receiverId || !requesterId) {
        return res.status(400).json({ message: 'receiverId and requesterId are required' })
    }

    try {
        const notification = await sendFriendRequestNotification(receiverId, requesterId)
        return res.json({ notificationId: notification._id, status: 'Sent' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

// Controller to get notifications for a user
export const getNotificationsController = async (req: Request, res: Response) => {
    const { userId } = req.query

    if (!userId) {
        return res.status(400).json({ message: 'userId query parameter is required' })
    }

    try {
        const notifications = await getNotificationsByUserId(userId as string)
        return res.json({ notifications })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
