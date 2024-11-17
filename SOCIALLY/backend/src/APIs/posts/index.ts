// src/features/posts/index.ts

import express from 'express'
import * as postController from './controllers/postController'
import { authenticateToken } from '../user/middlewares/authMiddleware'

const router = express.Router()

router.post('/', authenticateToken, postController.createPost)
router.get('/', postController.getAllPosts)
router.get('/:id', postController.getPostById)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)
router.post('/:id/like', authenticateToken, postController.likePost)
router.post('/:id/comment', postController.commentOnPost)
router.put('/:id/comment/:commentId', postController.editComment) // Edit comment
router.delete('/:id/comment/:commentId', postController.deleteComment) // Delete comment
router.post('/:id/comment/:commentId/reply', postController.replyToComment) // Reply to comment
router.post('/:id/comment/:commentId/react', postController.reactToComment) // React to comment

export default router
