import { Router } from 'express'
import teamController from './controller'

const router = Router()

router.post('/create', teamController.createTeam)
router.get('/gets', teamController.createTeam)
//router.post('/:id/add', teamController.addMember)

export default router
