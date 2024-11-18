import { Response } from 'express'
import { UserModel } from '../../user/models/userModel'
import { Friend } from '../models/friendModel'
import { sendFriendRequest, rejectFriendRequest } from '../services/friendService'
// import { CustomRequest } from '../../user/middlewares/authMiddleware'

export const searchUserController = async (req: any, res: any) => {
    const { name } = req.query
    try {
        const user = await UserModel.findOne({ name }) // Adjust search based on your schema
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ user })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const sendFriendRequestController = async (req: any, res: any) => {
    const { senderId, receiverId } = req.body
    try {
        const receiver = await UserModel.findById(receiverId)
        if (!receiver) {
            return res.status(404).json({ message: 'User not found' })
        }

        const existingRequest = await Friend.findOne({ senderId, receiverId, status: 'pending' })
        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent' })
        }

        await sendFriendRequest(senderId, receiverId)

        res.status(201).json({
            message: `Friend request sent to ${receiver.name}`,
            receiverName: receiver.name
        })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const getPendingRequestsController = async (req: any, res: any) => {
    const userId = req.user?._id || req.user?.sub // Adjust based on the JWT payload
    console.log('Authenticated user:', req.user, 'Userid:', userId)

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        // Find the requests where the logged-in user is the receiver of the request
        const pendingRequests = await Friend.find({
            receiverId: userId, // Only find requests where the logged-in user is the receiver
            status: 'pending' // Only show pending requests
        })

        // Now manually fetch the user details for the senderId
        const populatedRequests = await Promise.all(
            pendingRequests.map(async (request) => {
                // Fetch user details for the senderId
                const sender = await UserModel.findById(request.senderId)

                // Assign sender's details to the request

                return { request, sender }
            })
        )

        // Send the response with populated pending requests
        res.status(200).json(populatedRequests)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

// export const acceptFriendRequestController = async (req: any, res: Response) => {
//     const { requestId } = req.body
//     try {
//         const acceptedRequest = await acceptFriendRequest(requestId)
//         res.status(200).json(acceptedRequest)
//     } catch (error: any) {
//         res.status(400).json({ message: error.message })
//     }
// }
export const acceptFriendRequestController = async (req: any, res: any) => {
    const { requestId } = req.body

    try {
        const friendRequest = await Friend.findById(requestId)

        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' })
        }

        // Update the status of the friend request to accepted
        friendRequest.status = 'accepted'
        await friendRequest.save()

        // Add both users to each other's friend lists
        const senderId = friendRequest.senderId
        const receiverId = friendRequest.receiverId

        // Add sender to receiver's friend list
        await UserModel.findByIdAndUpdate(receiverId, {
            $push: { friends: senderId }
        })

        // Add receiver to sender's friend list
        await UserModel.findByIdAndUpdate(senderId, {
            $push: { friends: receiverId }
        })

        // Get the updated friend count for the receiver
        await UserModel.findById(receiverId)
        // const friendCount = receiver?.friends.length || 0

        // Return the accepted request along with the updated friend count
        res.status(200).json({
            message: 'Friend request accepted'
            // friendCount
        })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

// export const acceptFriendRequestController = async (req: any, res: any) => {
//     const userId = req.user?._id // Get the authenticated user ID
//     const { friendId } = req.body // The ID of the user whose request is being accepted
//     console.log('Req.body', req.body)
//     if (!userId || !friendId) {
//         return res.status(400).json({ message: 'Invalid data provided' }) // Return error if no IDs are provided
//     }

//     try {
//         // Find the friend request by senderId and receiverId where the status is 'pending'
//         const friendRequest = await Friend.findOne({
//             senderId: userId,
//             receiverId: friendId,
//             status: 'pending'
//         })

//         console.log('Friend Request:', friendRequest)

//         if (!friendRequest) {
//             return res.status(404).json({ message: 'Friend request not found or already accepted' })
//         }

//         // Update the status of the friend request to 'accepted'
//         friendRequest.status = 'accepted'
//         await friendRequest.save()

//         // Increment friend count for both users
//         await UserModel.updateOne({ _id: userId }, { $inc: { friendCount: 1 } })
//         await UserModel.updateOne({ _id: friendId }, { $inc: { friendCount: 1 } })

//         // Fetch the updated friends list for the authenticated user
//         const friends = await Friend.find({
//             $or: [
//                 { senderId: userId, status: 'accepted' },
//                 { receiverId: userId, status: 'accepted' }
//             ]
//         })

//         res.status(200).json(friends)
//     } catch (error: any) {
//         res.status(500).json({ message: error.message })
//     }
// }

export const rejectFriendRequestController = async (req: any, res: Response) => {
    const { requestId } = req.body
    try {
        const rejectedRequest = await rejectFriendRequest(requestId)
        res.status(200).json(rejectedRequest)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
// export const getFriendsListController = async (req: any, res: Response) => {
//     const userId = req.user?.id
//     try {
//         const friends = await fetchFriendsList(userId)

//         // Map user details to friend list
//         const detailedFriends = await Promise.all(
//             friends.map(async (friend) => {
//                 const friendId = friend.senderId === userId ? friend.receiverId : friend.senderId
//                 const friendUser = await UserModel.findById(friendId)
//                 return {
//                     name: friendUser?.name,
//                     bio: friendUser?.bio, // Assuming bio field exists
//                     avatar: friendUser?.avatar // Assuming avatar field exists
//                 }
//             })
//         )

//         res.status(200).json(detailedFriends)
//     } catch (error: any) {
//         res.status(400).json({ message: error.message })
//     }
// }
// export const getFriendsListController = async (req: any, res: any) => {
//     const userId = req.user?._id // Get the authenticated user ID
//     if (!userId) {
//         return res.status(400).json({ message: 'User not found' }) // Return error if no user ID is found
//     }

//     try {
//         // Fetch friends where the user is either the sender or receiver with accepted status
//         const friends = await Friend.find({
//             $or: [
//                 { senderId: userId, status: 'accepted' },
//                 { receiverId: userId, status: 'accepted' }
//             ]
//         })

//         // Return the friends list
//         res.status(200).json(friends)
//     } catch (error: any) {
//         // Handle errors and send appropriate response
//         res.status(500).json({ message: error.message })
//     }
// }

// export const getFriendsListController = async (req: any, res: any) => {
//     const userId = req.user?._id; // Get the authenticated user ID
//     if (!userId) {
//         return res.status(400).json({ message: 'User not found' }); // Return error if no user ID is found
//     }

//     try {
//         // Fetch friends where the user is either the sender or receiver with accepted status
//         const friends = await Friend.find({
//             $or: [
//                 { senderId: userId, status: 'accepted' },
//                 { receiverId: userId, status: 'accepted' }
//             ]
//         }).populate('senderId receiverId', 'name email profilePicture'); // Populate senderId and receiverId fields with relevant info

//         // If no friends are found, send an appropriate response
//         if (friends.length === 0) {
//             return res.status(404).json({ message: 'No friends found' });
//         }

//         // Extract the friend details for each user and format them as required
//         const formattedFriends = friends.map(friend => {
//             return {
//                 friendId: friend.senderId.toString() === userId ? friend.receiverId : friend.senderId,
//                 name: friend.senderId.toString() === userId ? friend.receiverId.name : friend.senderId.name,
//                 email: friend.senderId.toString() === userId ? friend.receiverId.email : friend.senderId.email,
//                 profilePicture: friend.senderId.toString() === userId ? friend.receiverId.profilePicture : friend.senderId.profilePicture,
//             };
//         });

//         // Return the formatted list of friends
//         res.status(200).json(formattedFriends);
//     } catch (error: any) {
//         // Handle errors and send appropriate response
//         res.status(500).json({ message: error.message });
//     }
// };
// export const getFriendsByUserIdController = async (req: any, res: any) => {
//     const { id } = req.params // Get the user ID from the URL parameter

//     if (!id) {
//         return res.status(400).json({ message: 'User ID is required' })
//     }

//     try {
//         // Fetch friends where the user is either the sender or receiver with accepted status
//         const friends = await Friend.find({
//             $or: [
//                 { senderId: id, status: 'accepted' },
//                 { receiverId: id, status: 'accepted' }
//             ]
//         }).populate('senderId receiverId', 'name email profilePicture') // Populate senderId and receiverId fields with relevant info

//         // If no friends are found, send an appropriate response
//         if (friends.length === 0) {
//             return res.status(404).json({ message: 'No friends found' })
//         }

//         // Extract the friend details for each user and format them as required
//         const formattedFriends = friends.map((friend) => {
//             console.log('FRIEND', friend)
//             // return {
//             //     friendId: friend.senderId.toString() === id ? friend.receiverId : friend.senderId,
//             //     name: friend.senderId.toString() === id ? friend.receiverId.name : friend.senderId.name,
//             //     email: friend.senderId.toString() === id ? friend.receiverId.email : friend.senderId.email,
//             //     profilePicture: friend.senderId.toString() === id ? friend.receiverId.profilePicture : friend.senderId.profilePicture
//             // }
//         })

//         // Return the formatted list of friends
//         res.status(200).json(formattedFriends)
//     } catch (error: any) {
//         // Handle errors and send appropriate response
//         res.status(500).json({ message: error.message })
//     }
// }

export const getFriendsByUserIdController = async (req: any, res: any) => {
    const { id } = req.params // Get the user ID from the URL parameter
    const userId = req.user?._id // The ID of the logged-in user

    if (!id || !userId) {
        return res.status(400).json({ message: 'User ID is required' })
    }

    try {
        // Fetch friends where the user is either the sender or receiver with accepted status
        const friends = await Friend.find({
            $or: [
                { senderId: id, status: 'accepted' },
                { receiverId: id, status: 'accepted' }
            ]
        })

        // If no friends are found, send an appropriate response
        if (friends.length === 0) {
            return res.status(404).json({ message: 'No friends found' })
        }

        // Extract the friend details for each user and format them as required
        const formattedFriends = await Promise.all(
            friends.map(async (friend) => {
                // Determine the friend ID (the other user)
                const friendId = friend.senderId.toString() === userId.toString() ? friend.receiverId : friend.senderId

                // Fetch the friend's details from UserModel (excluding the logged-in user)
                const friendDetails = await UserModel.findById(friendId).select('name email bio avatar')
                console.log('FRIEND DETAILS', friendDetails)
                return friendDetails
                // return {
                //     friendId: friendId,
                //     name: friendDetails?.name,
                //     email: friendDetails?.email,
                //     profilePicture: friendDetails?.avatar
                // }
            })
        )

        // Return the formatted list of friends
        res.status(200).json(formattedFriends)
    } catch (error: any) {
        // Handle errors and send appropriate response
        res.status(500).json({ message: error.message })
    }
}

// export const getFriendsListController = async (req: any, res: Response) => {
//     const userId = req.user?._id
//     try {
//         const friends = await Friend.find({
//             $or: [
//                 { senderId: userId, status: 'accepted' },
//                 { receiverId: userId, status: 'accepted' }
//             ]
//         })
//         res.status(200).json(friends)
//     } catch (error: any) {
//         res.status(500).json({ message: error.message })
//     }
// }

export const cancelFriendRequestController = async (req: any, res: any) => {
    const { senderId, receiverId } = req.body // Get the sender and receiver IDs from the request body

    try {
        // Check if there is a pending friend request
        const existingRequest = await Friend.findOne({
            senderId,
            receiverId,
            status: 'pending'
        })

        if (!existingRequest) {
            return res.status(404).json({ message: 'No pending friend request found to cancel' })
        }

        // Find the sender's details (name)
        const sender = await UserModel.findById(senderId) // Assuming you have a User model and it's linked by senderId
        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' })
        }

        // Delete the pending friend request
        await Friend.deleteOne({ senderId, receiverId, status: 'pending' })

        res.status(200).json({ message: `Friend request canceled successfully from ${sender.name}` })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
