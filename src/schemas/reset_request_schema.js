const Joi = require('joi');

const reset = Joi.object().keys({
  token: Joi.string().required(),
  password: Joi.string().required().min(6).lowercase().trim()
})

module.exports = reset;