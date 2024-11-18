
/* eslint-disable @typescript-eslint/no-misused-promises */


import { Router } from 'express'
import { createJobPost, getJobPosts } from '../controller/recruitmentcontroller';
//import { authMiddleware } from '../../../middlewares/authmiddleware'
// import authmiddleware from '../../../middlewares/authenticate'

export const recruitmentRoutes = Router()



recruitmentRoutes.post('/addCandidate',  createJobPost)

recruitmentRoutes.get('/getCandidate',  getJobPosts)

