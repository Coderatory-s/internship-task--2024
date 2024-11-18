import { Friend, IFriend } from '../models/friendModel'

export const createFriendRequest = async (senderId: string, receiverId: string): Promise<IFriend> => {
    return await Friend.create({ senderId, receiverId })
}

export const getFriendRequestById = async (requestId: string): Promise<IFriend | null> => {
    return await Friend.findById(requestId)
}

export const updateFriendRequestStatus = async (requestId: string, status: 'accepted' | 'rejected'): Promise<IFriend | null> => {
    return await Friend.findByIdAndUpdate(requestId, { status }, { new: true })
}

export const getPendingFriendRequests = async (userId: string): Promise<IFriend[]> => {
    return await Friend.find({ receiverId: userId, status: 'pending' })
}

export const getFriendsList = async (userId: string): Promise<IFriend[]> => {
    return await Friend.find({
        $or: [
            { senderId: userId, status: 'accepted' },
            { receiverId: userId, status: 'accepted' }
        ]
    })
}
