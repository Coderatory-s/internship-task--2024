// routes/chatRoutes.ts
import express from 'express'
import * as chatController from './controller/chatController'
import { authenticateToken } from '../user/middlewares/authMiddleware'

const router = express.Router()
//  1:1 chat
router.post('/create-chat', authenticateToken, chatController.createChat)
router.post('/send-message', authenticateToken, chatController.sendMessage)
router.get('/get-chats', authenticateToken, chatController.getChats)
router.get('/get-messages/:chatId', authenticateToken, chatController.getMessages)
router.delete('/delete-chat/:chatId', authenticateToken, chatController.deleteChat)

//  group chat
router.post('/create-group', authenticateToken, chatController.createGroup)
router.post('/add-user-to-group', authenticateToken, chatController.addUserToGroup)
router.post('/remove-user-from-group', authenticateToken, chatController.removeUserFromGroup)
router.post('/leave-group', authenticateToken, chatController.leaveGroup)
router.delete('/delete-group', authenticateToken, chatController.deleteGroup)

export default router
