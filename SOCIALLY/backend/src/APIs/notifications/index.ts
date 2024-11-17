import express from 'express'
import {
    sendLikeNotificationController,
    sendCommentNotificationController,
    sendFriendRequestNotificationController,
    getNotificationsController
} from './controllers/notificationController'

const router = express.Router()

router.post('/send-like', sendLikeNotificationController)
router.post('/send-comment', sendCommentNotificationController)
router.post('/send-friend-request', sendFriendRequestNotificationController)
router.get('/', getNotificationsController)

export default router
