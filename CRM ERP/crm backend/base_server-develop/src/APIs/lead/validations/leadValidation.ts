// import Joi from 'joi';

// export const leadSchema = Joi.object({
//   name: Joi.string().required(),
//   phone: Joi.string().required(),
//   email: Joi.string().email().required(),
//   leadSource: Joi.string().required(),
//   status: Joi.string().valid('New', 'In Progress', 'Closed').required()
// });

import Joi from 'joi';

export const leadSchema = Joi.object({
  name: Joi.string().min(2).max(72).trim().required(),
  phone: Joi.string().min(4).max(20).required(),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address.',
      'any.required': 'Email is required.',
      'string.base': 'Email must be a string.',
    }),
  leadSource: Joi.string().required(),
  status: Joi.string().valid('New', 'In Progress', 'Closed').required(),
});

// You can include a check for uniqueness in the service layer, as previously discussed.
