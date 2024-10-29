// /src/features/activities/index.ts
import { Router } from 'express'
import { logActivity, getActivityById, getAllActivities, updateActivity, deleteActivity } from './controllers/activityController'
import { activitySchema } from './validations/activityValidation'
import validate from './validations/validate'

const router = Router()

// Create Activity
router.post('/', validate(activitySchema), logActivity)

// Get All Activities
router.get('/', getAllActivities)

// Get Activity by ID
router.get('/:id', getActivityById)

// Update Activity
router.patch('/:id', validate(activitySchema), updateActivity)

// Delete Activity
router.delete('/:id', deleteActivity)

export default router
