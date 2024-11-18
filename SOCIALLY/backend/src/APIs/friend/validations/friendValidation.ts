import Joi from 'joi'

export const sendFriendRequestValidation = (req: any, res: any, next: any) => {
    const schema = Joi.object({
        senderId: Joi.string().required(),
        receiverId: Joi.string().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    next()
}

export const requestActionValidation = (req: any, res: any, next: any) => {
    const schema = Joi.object({
        requestId: Joi.string().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    next()
}
