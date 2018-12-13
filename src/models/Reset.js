const BaseModel = require('./model');

class Resets extends BaseModel {
  static get tableName() {
    return 'password_resets'
  }
}

module.exports = Resets