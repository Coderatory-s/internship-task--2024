// /src/features/activities/validations/activityValidation.ts
import Joi from 'joi'

export const activitySchema = Joi.object({
    leadId: Joi.string().required(),
    activityType: Joi.string().valid('Call', 'Email', 'Meeting').required(),
    description: Joi.string().required(),
    dateTime: Joi.date().iso().default(Date.now),
    assignedSalesRep: Joi.string().required()
})
