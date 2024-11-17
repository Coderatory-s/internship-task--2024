// src/features/posts/services/postService.ts

import * as postRepo from '../repositories/postRepository'
import { IPost, IComment } from '../models/postModel'

// Create a new post
export const createPost = async (data: Partial<IPost>) => {
    return await postRepo.createPost(data)
}

// Get all posts with pagination
export const getAllPosts = async (page: number = 1, limit: number = 10) => {
    return await postRepo.getAllPosts(page, limit)
}

// Get a single post by its ID
export const getPostById = async (id: string) => {
    return await postRepo.getPostById(id)
}

// Update a post by its ID
export const updatePost = async (id: string, data: Partial<IPost>) => {
    return await postRepo.updatePost(id, data)
}

// Delete a post by its ID
export const deletePost = async (id: string) => {
    return await postRepo.deletePost(id)
}

// Like or unlike a post
export const likePost = async (id: string, userId: string) => {
    return await postRepo.likePost(id, userId)
}
// export const toggleLike = async (postId: string, userId: string) => {
//     const post = await Post.findById(postId)

//     if (!post) {
//         throw new Error('Post not found')
//     }

//     // Check if the user has already liked the post
//     const likedIndex = post.likes.indexOf(userId)

//     if (likedIndex === -1) {
//         // If user has not liked, add their ID to the likes array
//         post.likes.push(userId)
//         post.likeCount += 1
//     } else {
//         // If user has liked, remove their ID from the likes array
//         post.likes.splice(likedIndex, 1)
//         post.likeCount -= 1
//     }

//     // Save the updated post
//     await post.save()

//     return post
// }
// Comment on a post
export const commentOnPost = async (id: string, comment: { userId: string; comment: string; type?: string; opinion?: string }) => {
    return await postRepo.commentOnPost(id, comment)
}

// Edit a comment on a post
export const editComment = async (postId: string, commentId: string, userId: string, newComment: string) => {
    return await postRepo.editComment(postId, commentId, userId, newComment)
}

// Delete a comment on a post
export const deleteComment = async (postId: string, commentId: string, userId: string) => {
    return await postRepo.deleteComment(postId, commentId, userId)
}

// Reply to a comment on a post
export const replyToComment = async (postId: string, commentId: string, reply: IComment) => {
    return await postRepo.replyToComment(postId, commentId, reply)
}

// React to a comment on a post
export const reactToComment = async (postId: string, commentId: string, userId: string, reactionType: string) => {
    return await postRepo.reactToComment(postId, commentId, userId, reactionType)
}
