import { createFriendRequest, findFriendRequestById, updateFriendRequestStatus, getFriendList } from '../repositories/friendRepository'

export const sendFriendRequest = async (senderId: string, receiverId: string) => {
    return await createFriendRequest(senderId, receiverId)
}

export const acceptFriendRequest = async (requestId: string) => {
    const friendRequest = await findFriendRequestById(requestId)
    if (!friendRequest || friendRequest.status !== 'pending') {
        throw new Error('Friend request not found or already processed.')
    }
    return await updateFriendRequestStatus(requestId, 'accepted')
}

export const rejectFriendRequest = async (requestId: string) => {
    const friendRequest = await findFriendRequestById(requestId)
    if (!friendRequest || friendRequest.status !== 'pending') {
        throw new Error('Friend request not found or already processed.')
    }
    return await updateFriendRequestStatus(requestId, 'rejected')
}

export const getFriendsList = async (userId: string) => {
    return await getFriendList(userId)
}
