/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createGoal, getAllGoals, getGoalById, updateGoal, deleteGoal } from '../controller/goalsettingcontroller'

//import authmiddleware from '../../../middlewares/authenticate'
const Goalrouter = Router()

Goalrouter.post('/goals', createGoal)
Goalrouter.get('/goals', getAllGoals)
Goalrouter.get('/goals/:id', getGoalById)
Goalrouter.put('/goals/:id', updateGoal)
Goalrouter.delete('/goals/:id', deleteGoal)

export default Goalrouter
