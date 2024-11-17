import { Request, Response } from 'express'
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriendsList } from '../services/friendService'
import { CustomRequest } from '../middlewares/authenticateUser'
export const sendFriendRequestController = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body
    try {
        const friendRequest = await sendFriendRequest(senderId, receiverId)
        res.status(201).json(friendRequest)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const acceptFriendRequestController = async (req: Request, res: Response) => {
    const { requestId } = req.body
    try {
        const updatedRequest = await acceptFriendRequest(requestId)
        res.status(200).json(updatedRequest)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const rejectFriendRequestController = async (req: Request, res: Response) => {
    const { requestId } = req.body
    try {
        const updatedRequest = await rejectFriendRequest(requestId)
        res.status(200).json(updatedRequest)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

// export const getFriendsListController = async (req: Request, res: Response) => {
//     const userId = req.user?.id // Assuming you have middleware for user authentication
//     try {
//         const friends = await getFriendsList(userId)
//         res.status(200).json(friends)
//     } catch (error: any) {
//         res.status(400).json({ message: error.message })
//     }
// }
export const getFriendsListController = async (req: CustomRequest, res: Response) => {
    const userId: any = req.user?.id // This should now be recognized properly
    try {
        const friends = await getFriendsList(userId)
        res.status(200).json(friends)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
