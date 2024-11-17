// src/features/posts/repositories/postRepository.ts

import Post, { IPost, IComment } from '../models/postModel'

export const createPost = async (data: Partial<IPost>) => {
    const post = new Post(data)
    return await post.save()
}

export const getAllPosts = async (page: number = 1, limit: number = 10) => {
    return await Post.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
}

export const getPostById = async (id: string) => {
    return await Post.findById(id)
}

export const updatePost = async (id: string, data: Partial<IPost>) => {
    return await Post.findByIdAndUpdate(id, data, { new: true })
}

export const deletePost = async (id: string) => {
    return await Post.findByIdAndDelete(id)
}
export const likePost = async (id: string, userId: string) => {
    // Find the post by ID
    const post = await Post.findById(id)
    if (!post) {
        console.error('Post not found:', id) // Log error if post is not found
        return null // Post not found
    }

    // Check if the user has already liked the post
    const hasLiked = post.likedBy.includes(userId)
    console.log(`User ${userId} hasLiked: ${hasLiked}`) // Debugging statement

    if (hasLiked) {
        // User has already liked the post, so remove the like
        post.likedBy = post.likedBy.filter((user) => user.toString() !== userId) // Remove user from likedBy
        console.log(`User ${userId} unliked the post.`) // Debugging statement
    } else {
        // User has not liked the post, so add the like
        post.likedBy.push(userId) // Add user to likedBy
        console.log(`User ${userId} liked the post.`) // Debugging statement
    }

    // Update likes count based on the length of likedBy array
    post.likes = post.likedBy.length

    // Save the updated post and return the updated post
    const updatedPost = await post.save()
    console.log('Updated post:', updatedPost) // Debugging statement
    return updatedPost
}
export const commentOnPost = async (id: string, comment: { userId: string; comment: string; type?: string; opinion?: string }) => {
    return await Post.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true })
}

export const editComment = async (postId: string, commentId: string, userId: string, newComment: string) => {
    const post = await Post.findById(postId)
    if (!post) return null

    // Use array's find method instead of Mongoose's id()
    const comment = post.comments.find((c) => c.id?.toString() === commentId)
    if (!comment || comment.userId.toString() !== userId) {
        throw new Error('Comment not found or user not authorized')
    }

    comment.comment = newComment // Update comment text
    return await post.save() // Save updated post
}
export const deleteComment = async (postId: string, commentId: string, userId: string) => {
    const post = await Post.findById(postId)
    if (!post) return null

    const comment = post.comments.find((c) => c.id?.toString() === commentId)
    if (!comment || comment.userId.toString() !== userId) {
        throw new Error('Comment not found or user not authorized')
    }

    // Manually remove the comment from the array
    post.comments = post.comments.filter((c) => c.id?.toString() !== commentId)
    return await post.save() // Save updated post
}

export const replyToComment = async (postId: string, commentId: string, reply: IComment) => {
    const post = await Post.findById(postId)
    if (!post) return null

    const comment = post.comments.find((c) => c.id?.toString() === commentId)
    if (!comment) return null

    // Initialize replies if it doesn't exist
    comment.replies = comment.replies || []
    comment.replies.push(reply)

    return await post.save()
}
export const reactToComment = async (postId: string, commentId: string, userId: string, reactionType: string) => {
    const post = await Post.findById(postId)
    if (!post) return null

    const comment = post.comments.find((c) => c.id?.toString() === commentId) // Find the comment manually
    if (!comment) return null

    // Initialize reactions array if not present
    comment.reactions = comment.reactions || []

    // Check if the user has already reacted
    const existingReactionIndex = comment.reactions.findIndex((reaction) => reaction.userId.toString() === userId)

    if (existingReactionIndex !== -1) {
        // User has already reacted, update the reaction type
        comment.reactions[existingReactionIndex].reactionType = reactionType
    } else {
        // Add new reaction
        comment.reactions.push({
            userId,
            reactionType
        })
    }
    return await post.save() // Save the updated post
}
