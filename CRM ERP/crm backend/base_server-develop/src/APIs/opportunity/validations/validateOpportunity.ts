import { Request, Response, NextFunction } from 'express'
import { opportunitySchema } from './opportunityValidation'

const validateOpportunity = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = opportunitySchema.validate(req.body)

    if (error) {
        res.status(400).json({ error: `hello ----00--000 ${error.details[0].message}` })
        return
    }

    next()
}

export default validateOpportunity
