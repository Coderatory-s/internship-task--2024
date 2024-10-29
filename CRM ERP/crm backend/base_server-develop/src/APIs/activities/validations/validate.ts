// /src/middlewares/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

const validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false }) // Validate request body against the schema

        if (error) {
            return res.status(400).json({
                errors: error.details.map((err) => ({
                    message: err.message,
                    path: err.path
                }))
            })
        }

        return next() // Explicitly return next()
    }
}

export default validate
