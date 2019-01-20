const registerSchema = require('./register_schema');
const loginSchema = require('./login_request_schema');
const resetSchema = require('./reset_request_schema');
const articleSchema = require('./article_request_schema');

module.exports = {
  registerSchema,
  loginSchema,
  resetSchema,
  articleSchema
}
