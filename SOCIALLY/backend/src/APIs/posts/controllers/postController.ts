import { Request, Response, NextFunction } from 'express'
import Post from '../models/postModel'
import Cloudinary from '../../../config/cloudinaryConfig' // Assuming Cloudinary config is correctly set up
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import * as postService from '../services/postService'
import { IComment } from '../models/postModel'
import config from '../../../config/config'
import jwt from 'jsonwebtoken'

const uploadsDir = path.join(__dirname, './uploads')
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
}

// Multer storage for handling different file types
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, uploadsDir) // Temporary storage location
    },
    filename: function (_req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Unique filename to prevent overwrites
    }
})

// Configure multer to handle multiple uploads (images, videos, documents, and voice files)
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit (adjust if needed)
}).fields([
    { name: 'images', maxCount: 5 }, // Multiple images
    { name: 'videos', maxCount: 2 }, // Multiple videos
    { name: 'documents', maxCount: 3 }, // Multiple documents
    { name: 'voice', maxCount: 1 } // Single voice file
])

export const createPost = async (req: any, res: any) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error uploading files', error: err.message })
            }

            const uploadedImages: string[] = []
            const uploadedVideos: string[] = []
            const uploadedDocuments: string[] = []
            let uploadedVoice: string | null = null

            // Upload logic for images, videos, documents, and voice (same as your code)
            // Upload images to Cloudinary
            if (req.files.images) {
                for (const image of req.files.images) {
                    const result = await Cloudinary.uploader.upload(image.path, {
                        resource_type: 'image',
                        folder: 'social_media_posts/images'
                    })
                    uploadedImages.push(result.secure_url)
                    fs.unlinkSync(image.path) // Delete the local temporary file
                }
            }

            // Upload videos to Cloudinary
            if (req.files.videos) {
                for (const video of req.files.videos) {
                    const result = await Cloudinary.uploader.upload(video.path, {
                        resource_type: 'video',
                        folder: 'social_media_posts/videos',
                        format: 'mp4'
                    })
                    uploadedVideos.push(result.secure_url)
                    fs.unlinkSync(video.path) // Delete the local temporary file
                }
            }

            // Upload documents to Cloudinary
            if (req.files.documents) {
                for (const document of req.files.documents) {
                    const result = await Cloudinary.uploader.upload(document.path, {
                        resource_type: 'raw', // 'raw' is used for documents like PDFs, Word files, etc.
                        folder: 'social_media_posts/documents'
                    })
                    uploadedDocuments.push(result.secure_url)
                    fs.unlinkSync(document.path) // Delete the local temporary file
                }
            }

            // Upload voice file to Cloudinary
            if (req.files.voice && req.files.voice[0]) {
                const voiceFile = req.files.voice[0]
                const result = await Cloudinary.uploader.upload(voiceFile.path, {
                    resource_type: 'video', // Cloudinary treats audio as 'video'
                    folder: 'social_media_posts/voice',
                    format: 'mp3'
                })
                uploadedVoice = result.secure_url
                fs.unlinkSync(voiceFile.path) // Delete the local temporary file
            }

            // Poll data (optional)
            let pollData = null
            if (req.body.pollQuestion && req.body.pollOptions) {
                const pollOptions = JSON.parse(req.body.pollOptions)
                const pollVotes = Array(pollOptions.length).fill(0)
                pollData = {
                    question: req.body.pollQuestion,
                    options: pollOptions,
                    votes: pollVotes
                }
            }

            // Extract user info from the decoded token in req.user
            const userName = req.user?.name || 'Anonymous'
            const userAvatar = req.user?.avatar || null // Assuming you store the avatar URL in the token
            console.log(userName, userAvatar)
            // Create post data with the user information
            const postData = {
                title: req.body.title,
                content: {
                    text: req.body.text,
                    images: uploadedImages,
                    videos: uploadedVideos,
                    documents: uploadedDocuments,
                    voice: uploadedVoice,
                    poll: pollData
                },
                likes: 0,
                comments: [],
                likedBy: [],
                user: {
                    name: userName,
                    avatar: userAvatar
                }
            }

            const post = new Post(postData)
            await post.save()

            return res.status(201).json(post)
        })
    } catch (error: any) {
        return res.status(500).json({ message: error?.message || 'An unknown error occurred' })
    }
}

export const getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get 'page' and 'limit' from query parameters (default to 1 and 10 if not provided)
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10

        // Fetch total posts and posts for the current page
        const totalPosts = await Post.countDocuments() // Get total number of posts
        const posts = await Post.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })

        // Return the result as a JSON response
        res.status(200).json({
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            posts
        })
    } catch (error) {
        // Pass the error to the next middleware (Express error handler)
        next(error)
        return // Explicit return to satisfy TypeScript
    }
}
export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await postService.getPostById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'Post not found' })
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}

export const updatePost = async (req: any, res: any) => {
    try {
        const postId = req.params.id // Extract post ID from URL params
        const updatedData = req.body // Extract the updated data from the request body

        // Find the post by ID and update it
        const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
            new: true, // Return the updated post
            runValidators: true // Ensure that validation rules are applied
        })

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' })
        }

        // Respond with the updated post
        res.status(200).json(updatedPost)
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await postService.deletePost(req.params.id)
        if (post) {
            res.status(200).json({ message: 'Post deleted successfully' })
        } else {
            res.status(404).json({ message: 'Post not found' })
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}

export const likePost = async (req: any, res: any) => {
    const userId = req.body.userId

    console.log('UserID in backend:', userId) // Log to verify

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' })
    }

    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        const hasLiked = post.likedBy.some((id) => id.toString() === userId)

        if (hasLiked) {
            post.likedBy = post.likedBy.filter((id) => id.toString() !== userId)
            post.likes -= 1
        } else {
            post.likedBy.push(userId)
            post.likes += 1
        }

        await post.save()

        res.status(200).json({
            post,
            hasLiked: !hasLiked
        })
    } catch (error: any) {
        console.error('Error in backend:', error)
        res.status(500).json({ message: error?.message })
    }
}

export const commentOnPost = async (req: any, res: any) => {
    try {
        const { comment, type, opinion } = req.body

        // Decode the token to get userId and name
        const token = req.headers.authorization?.split(' ')[1] // Assuming token is sent in 'Authorization' header
        if (!token) return res.status(403).json({ message: 'No token provided' })

        const decoded: any = jwt.verify(token, config.TOKENS.ACCESS.SECRET) // Add your JWT secret key
        const userId = decoded._id // Fetch the userId from token
        // const userName = decoded?.name // Assuming user name is part of the token

        const post = await postService.commentOnPost(req.params.id, {
            userId,
            comment,
            type: type || 'text',
            opinion: opinion || 'neutral'
        })

        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'Post not found' })
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}

export const editComment = async (req: Request, res: Response) => {
    const { userId, comment } = req.body
    try {
        const updatedPost = await postService.editComment(req.params.id, req.params.commentId, userId, comment)
        if (updatedPost) {
            res.status(200).json(updatedPost)
        } else {
            res.status(404).json({ message: 'Post or comment not found' })
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    const userId = req.body.userId // Assuming the user ID is sent in the request body
    try {
        const updatedPost = await postService.deleteComment(req.params.id, req.params.commentId, userId)
        if (updatedPost) {
            res.status(200).json(updatedPost)
        } else {
            res.status(404).json({ message: 'Post or comment not found' })
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
export const replyToComment = async (req: Request, res: Response) => {
    const { userId, comment, type = 'text', opinion = 'neutral' } = req.body

    // Create a valid IComment object
    const commentData: IComment = {
        id: req.params.commentId, // Assuming this comes from the URL parameter
        userId,
        comment,
        type, // Default to 'text' if not provided
        opinion // Default to 'neutral' if not provided
    }

    try {
        const updatedPost = await postService.replyToComment(req.params.id, req.params.commentId, commentData)

        if (updatedPost) {
            res.status(200).json(updatedPost)
        } else {
            res.status(404).json({ message: 'Post or comment not found' })
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}

export const reactToComment = async (req: Request, res: Response) => {
    const { userId, reactionType } = req.body // Reaction type (like, funny, etc.)
    try {
        const updatedPost = await postService.reactToComment(req.params.id, req.params.commentId, userId, reactionType)
        if (updatedPost) {
            res.status(200).json(updatedPost)
        } else {
            res.status(404).json({ message: 'Post or comment not found' })
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
// export const voteInPoll = async (req: Request, res: Response) => {
//     try {
//         const { postId, optionIndex } = req.body // Expecting the post ID and selected option index
//         const userId = req.user?._id // Assuming user ID is available via authentication middleware

//         // Find the post with the poll
//         const post = await Post.findById(postId)

//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' })
//         }

//         const poll = post.content.poll

//         if (!poll) {
//             return res.status(400).json({ message: 'This post does not have a poll' })
//         }

//         // Check if the user has already voted
//         const hasVoted = poll.voters.some((voter) => voter.userId.toString() === userId.toString())
//         if (hasVoted) {
//             return res.status(400).json({ message: 'You have already voted' })
//         }

//         // Ensure the selected option is valid
//         if (optionIndex < 0 || optionIndex >= poll.options.length) {
//             return res.status(400).json({ message: 'Invalid option' })
//         }

//         // Increment the vote count for the selected option
//         poll.votes[optionIndex] += 1

//         // Add the voter to the voters array
//         poll.voters.push({
//             userId: userId,
//             votedOptionIndex: optionIndex
//         })

//         // Save the updated post
//         await post.save()

//         return res.status(200).json({ message: 'Vote recorded successfully', poll })
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             return res.status(500).json({ message: error.message })
//         } else {
//             return res.status(500).json({ message: 'An unknown error occurred' })
//         }
//     }
// }
