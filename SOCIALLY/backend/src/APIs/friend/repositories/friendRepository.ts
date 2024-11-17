import { FriendRequest, IFriendRequest } from '../models/friendModel'

export const createFriendRequest = async (senderId: string, receiverId: string): Promise<IFriendRequest> => {
    const request = new FriendRequest({ senderId, receiverId })
    return await request.save()
}

export const findFriendRequestById = async (requestId: string): Promise<IFriendRequest | null> => {
    return await FriendRequest.findById(requestId)
}

export const updateFriendRequestStatus = async (requestId: string, status: 'accepted' | 'rejected'): Promise<IFriendRequest | null> => {
    return await FriendRequest.findByIdAndUpdate(requestId, { status }, { new: true })
}

export const getFriendList = async (userId: string): Promise<IFriendRequest[]> => {
    return await FriendRequest.find({
        $or: [
            { senderId: userId, status: 'accepted' },
            { receiverId: userId, status: 'accepted' }
        ]
    })
}
