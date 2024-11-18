import { createFriendRequest, updateFriendRequestStatus, getPendingFriendRequests, getFriendsList } from '../repositories/friendRepository'

export const sendFriendRequest = async (senderId: string, receiverId: string) => {
    return await createFriendRequest(senderId, receiverId)
}

export const acceptFriendRequest = async (requestId: string) => {
    return await updateFriendRequestStatus(requestId, 'accepted')
}

export const rejectFriendRequest = async (requestId: string) => {
    return await updateFriendRequestStatus(requestId, 'rejected')
}

export const fetchPendingFriendRequests = async (userId: string) => {
    return await getPendingFriendRequests(userId)
}

export const fetchFriendsList = async (userId: string) => {
    return await getFriendsList(userId)
}
