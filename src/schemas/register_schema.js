const Joi = require('joi');

const register = Joi.object().keys({
  email: Joi.string().email().required().lowercase().trim(),
  first_name: Joi.string().required().max(100),
  last_name: Joi.string().required().max(100),
  student_id: Joi.string().required().length(10),
  shirt_size: Joi.string().required().max(4),
  paid: Joi.bool().required(),
  recieved_shirt: Joi.bool().required(),
  amount: Joi.number().required()
})

module.exports = register

