import { Router } from 'express'
import {
    sendFriendRequestController,
    acceptFriendRequestController,
    rejectFriendRequestController,
    getPendingRequestsController,
    cancelFriendRequestController,
    getFriendsByUserIdController
} from './controllers/friendController'
import { sendFriendRequestValidation, requestActionValidation } from './validations/friendValidation'
import { authenticateToken } from '../user/middlewares/authMiddleware'
const router = Router()

router.post('/request', sendFriendRequestValidation, sendFriendRequestController)
router.post('/accept', authenticateToken, requestActionValidation, acceptFriendRequestController)
router.post('/reject', requestActionValidation, rejectFriendRequestController)
router.get('/pending', authenticateToken, getPendingRequestsController)
router.get('/list/:id', authenticateToken, getFriendsByUserIdController)

router.post('/cancel-request', authenticateToken, cancelFriendRequestController)

export default router
