import Joi from 'joi'

export const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.object({
        text: Joi.string(),
        images: Joi.array().items(Joi.string().uri()),
        videos: Joi.array().items(Joi.string().uri()),
        documents: Joi.array().items(Joi.string().uri()),
        voice: Joi.string(),
        poll: Joi.object({
            question: Joi.string().required(),
            options: Joi.array().items(Joi.string()).min(2).required()
        })
    })
})

export const commentSchema = Joi.object({
    userId: Joi.string().required(),
    comment: Joi.string().required(),
    type: Joi.string().optional(), // Add validation for 'type'
    opinion: Joi.string().optional() // Add validation for 'opinion'
})
