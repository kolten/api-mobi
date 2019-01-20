const Joi = require('joi');

const articleSchema = Joi.object().keys({
  title: Joi.string().trim().required(),
  body: Joi.string().optional().trim(),
  img_url: Joi.string().optional().uri(),
  github_url: Joi.string().optional().uri(),
  tags: Joi.array().optional().max(10),
  src_url: Joi.string().uri().trim().required(),
})

module.exports = articleSchema;