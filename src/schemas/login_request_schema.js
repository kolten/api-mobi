const Joi = require('joi');

const login = Joi.object().keys({
  email: Joi.string().required().email().trim(),
  password: Joi.string().required().trim()
})

module.exports = login;