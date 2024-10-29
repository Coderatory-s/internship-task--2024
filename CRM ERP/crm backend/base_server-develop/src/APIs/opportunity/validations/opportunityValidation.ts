// import Joi from 'joi'

// export const opportunitySchema = Joi.object({
//     leadId: Joi.string().required(),
//     projectName: Joi.string().required(),
//     expectedCloseDate: Joi.date().required(),
//     projectValue: Joi.number().positive().required(),
//     stage: Joi.string().valid('Bid', 'Negotiation', 'Closed', 'Lost').required()
// })
// opportunityValidation.ts
import Joi from 'joi'

export const opportunitySchema = Joi.object({
    opportunityName: Joi.string().required(),
    linkedCustomerOrLead: Joi.string().required(), // Reference to Lead or Customer
    expectedCloseDate: Joi.date().required(),
    projectValue: Joi.number().positive().required(),
    stage: Joi.string().valid('Bid', 'Negotiation', 'Closed').required(),
    assignedSalesRep: Joi.string().required(),
    revenueForecast: Joi.number().positive().required(),
    probabilityOfClosing: Joi.number().min(0).max(100).required()
})
