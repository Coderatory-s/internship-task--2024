import { Router } from 'express'
import {
    sendFriendRequestController,
    acceptFriendRequestController,
    rejectFriendRequestController,
    getFriendsListController
} from './controllers/friendController'
import { validateSendRequest, validateRequestAction } from './validations/friendValidation'
import { authenticateToken } from '../user/middlewares/authMiddleware'

const router = Router()

router.post('/request', validateSendRequest, sendFriendRequestController)
router.post('/accept', validateRequestAction, acceptFriendRequestController)
router.post('/reject', validateRequestAction, rejectFriendRequestController)
router.get('/list', authenticateToken, getFriendsListController)

export default router
