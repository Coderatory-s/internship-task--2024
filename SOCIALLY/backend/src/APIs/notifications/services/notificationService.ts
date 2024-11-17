import Notification from '../models/notificationModel'

// Send a notification for likes
export const sendLikeNotification = async (postId: string, postOwnerId: string, likerId: string) => {
    const content = `User ${likerId} liked your post.`
    const type = 'like'

    const notification = new Notification({ userId: postOwnerId, content, type, postId })
    await notification.save()
    return notification
}

// Send a notification for comments
export const sendCommentNotification = async (postId: string, postOwnerId: string, commenterId: string, commentText: string) => {
    const content = `User ${commenterId} commented: "${commentText}" on your post.`
    const type = 'comment'

    const notification = new Notification({ userId: postOwnerId, content, type, postId })
    await notification.save()
    return notification
}

// Send a notification for friend requests
export const sendFriendRequestNotification = async (receiverId: string, requesterId: string) => {
    const content = `User ${requesterId} sent you a friend request.`
    const type = 'friend_request'

    const notification = new Notification({ userId: receiverId, content, type })
    await notification.save()
    return notification
}

// Fetch notifications for a user
export const getNotificationsByUserId = async (userId: string) => {
    return await Notification.find({ userId }).select('notificationId content timestamp type postId').sort({ timestamp: -1 })
}
