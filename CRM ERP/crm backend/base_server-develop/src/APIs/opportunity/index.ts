import { Router } from 'express'
import { createOpportunity, getOpportunities } from './controllers/opportunityController'
import validateOpportunity from './validations/validateOpportunity'
import { updateOpportunityStage } from './controllers/pipelineController'

const router = Router()

// POST /opportunities
router.post('/', validateOpportunity, createOpportunity)
router.get('/', getOpportunities)

// Route to update opportunity stage
router.put('/:id', updateOpportunityStage)
export default router
