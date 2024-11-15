import { Router } from 'express'
import userController from './hrController'

const router = Router()

router.delete('/delete', userController.deleteUser)

export default router
